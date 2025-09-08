import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_CONFIG } from '@/constants';
import { ApiResponse, ApiError } from '@/types';

/**
 * API Client for handling HTTP requests with authentication and error handling
 */
class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.instance.interceptors.request.use(
      async config => {
        // Add authentication token if available
        const token = await this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId();
        config.headers['X-Timestamp'] = Date.now().toString();

        return config;
      },
      error => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      response => {
        return response;
      },
      async error => {
        // Handle token refresh
        if (error.response?.status === 401) {
          const refreshed = await this.handleTokenRefresh();
          if (refreshed) {
            // Retry the original request
            return this.instance.request(error.config);
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private async getAuthToken(): Promise<string | null> {
    // TODO: Implement token retrieval from secure storage
    return null;
  }

  private async handleTokenRefresh(): Promise<boolean> {
    // TODO: Implement token refresh logic
    return false;
  }

  private generateRequestId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error status
      return {
        code: error.response.status.toString(),
        message: error.response.data?.message || error.message,
        details: error.response.data,
        status: error.response.status,
      };
    } else if (error.request) {
      // Network error
      return {
        code: 'NETWORK_ERROR',
        message:
          'Network connection error. Please check your internet connection.',
        status: 0,
      };
    } else {
      // Other error
      return {
        code: 'UNKNOWN_ERROR',
        message: error.message || 'An unexpected error occurred.',
      };
    }
  }

  // HTTP Methods
  async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.get(
      url,
      config
    );
    return response.data;
  }

  async post<T = unknown>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.post(
      url,
      data,
      config
    );
    return response.data;
  }

  async put<T = unknown>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.put(
      url,
      data,
      config
    );
    return response.data;
  }

  async patch<T = unknown>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.patch(
      url,
      data,
      config
    );
    return response.data;
  }

  async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response: AxiosResponse<ApiResponse<T>> = await this.instance.delete(
      url,
      config
    );
    return response.data;
  }

  // Utility methods
  setAuthToken(token: string): void {
    this.instance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  clearAuthToken(): void {
    delete this.instance.defaults.headers.common.Authorization;
  }

  getBaseURL(): string {
    return this.instance.defaults.baseURL || '';
  }
}

// Export singleton instance
export const apiClient = new ApiClient();
export default apiClient;
