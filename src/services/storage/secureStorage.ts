import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '@/constants';

/**
 * Secure Storage Service for handling sensitive data
 * Uses Expo SecureStore which leverages Keychain (iOS) and Keystore (Android)
 */
class SecureStorageService {
  private readonly keyPrefix = 'dalti_provider_';

  /**
   * Store a value securely
   */
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(this.getKey(key), value, {
        keychainService: 'dalti-provider',
        requireAuthentication: false, // Set to true for biometric protection
      });
    } catch (error) {
      console.error('SecureStorage setItem error:', error);
      throw new Error(`Failed to store ${key} securely`);
    }
  }

  /**
   * Retrieve a value securely
   */
  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(this.getKey(key), {
        keychainService: 'dalti-provider',
        requireAuthentication: false,
      });
    } catch (error) {
      console.error('SecureStorage getItem error:', error);
      return null;
    }
  }

  /**
   * Remove a value securely
   */
  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(this.getKey(key), {
        keychainService: 'dalti-provider',
      });
    } catch (error) {
      console.error('SecureStorage removeItem error:', error);
      throw new Error(`Failed to remove ${key} from secure storage`);
    }
  }

  /**
   * Store JSON object securely
   */
  async setObject<T>(key: string, value: T): Promise<void> {
    try {
      const jsonString = JSON.stringify(value);
      await this.setItem(key, jsonString);
    } catch (error) {
      console.error('SecureStorage setObject error:', error);
      throw new Error(`Failed to store object ${key} securely`);
    }
  }

  /**
   * Retrieve JSON object securely
   */
  async getObject<T>(key: string): Promise<T | null> {
    try {
      const jsonString = await this.getItem(key);
      if (!jsonString) return null;
      return JSON.parse(jsonString) as T;
    } catch (error) {
      console.error('SecureStorage getObject error:', error);
      return null;
    }
  }

  /**
   * Clear all secure storage data
   */
  async clear(): Promise<void> {
    try {
      const keys = Object.values(STORAGE_KEYS);
      await Promise.all(keys.map(key => this.removeItem(key)));
    } catch (error) {
      console.error('SecureStorage clear error:', error);
      throw new Error('Failed to clear secure storage');
    }
  }

  /**
   * Check if a key exists
   */
  async hasItem(key: string): Promise<boolean> {
    try {
      const value = await this.getItem(key);
      return value !== null;
    } catch (error) {
      console.error('SecureStorage hasItem error:', error);
      return false;
    }
  }

  /**
   * Get all keys (for debugging purposes only)
   */
  async getAllKeys(): Promise<string[]> {
    try {
      // Note: SecureStore doesn't provide a way to list all keys
      // This is a limitation of the secure storage implementation
      // We return the known keys from our constants
      return Object.values(STORAGE_KEYS);
    } catch (error) {
      console.error('SecureStorage getAllKeys error:', error);
      return [];
    }
  }

  /**
   * Get prefixed key
   */
  private getKey(key: string): string {
    return `${this.keyPrefix}${key}`;
  }

  // Convenience methods for common operations
  async setAccessToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  async getAccessToken(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  async setRefreshToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
  }

  async getRefreshToken(): Promise<string | null> {
    return this.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  async clearTokens(): Promise<void> {
    await Promise.all([
      this.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
      this.removeItem(STORAGE_KEYS.REFRESH_TOKEN),
    ]);
  }

  async setUserData<T>(userData: T): Promise<void> {
    await this.setObject(STORAGE_KEYS.USER_DATA, userData);
  }

  async getUserData<T>(): Promise<T | null> {
    return this.getObject<T>(STORAGE_KEYS.USER_DATA);
  }

  async setProviderData<T>(providerData: T): Promise<void> {
    await this.setObject(STORAGE_KEYS.PROVIDER_DATA, providerData);
  }

  async getProviderData<T>(): Promise<T | null> {
    return this.getObject<T>(STORAGE_KEYS.PROVIDER_DATA);
  }
}

// Export singleton instance
export const secureStorage = new SecureStorageService();
export default secureStorage;
