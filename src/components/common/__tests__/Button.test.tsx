import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Text, TouchableOpacity } from 'react-native';

// Simple Button component for testing
interface ButtonProps {
  title: string;
  onPress: () => void;
  testID?: string;
}

const Button: React.FC<ButtonProps> = ({ title, onPress, testID }) => (
  <TouchableOpacity onPress={onPress} testID={testID}>
    <Text>{title}</Text>
  </TouchableOpacity>
);

describe('Button Component', () => {
  it('renders correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <Button title='Test Button' onPress={mockOnPress} />
    );

    expect(getByText('Test Button')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Button title='Test Button' onPress={mockOnPress} testID='test-button' />
    );

    fireEvent.press(getByTestId('test-button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('displays the correct title', () => {
    const mockOnPress = jest.fn();
    const buttonTitle = 'Custom Button Title';
    const { getByText } = render(
      <Button title={buttonTitle} onPress={mockOnPress} />
    );

    expect(getByText(buttonTitle)).toBeTruthy();
  });
});
