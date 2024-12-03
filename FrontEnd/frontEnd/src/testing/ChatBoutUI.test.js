// ChatBotUI.test.js
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import ChatBotUI from '../pages/chabotUI';

describe('ChatBotUI Component Tests', () => {
  test('renders chat input and send button', () => {
    render(<ChatBotUI />);
    const input = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByText('Send');
    
    expect(input).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  test('sends a user message when clicking the send button', () => {
    render(<ChatBotUI />);
    const input = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);
    
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type a message...').value).toBe('');
  });

  test('AI responds after a short delay', async () => {
    jest.useFakeTimers();
    render(<ChatBotUI />);
    const input = screen.getByPlaceholderText('Type a message...');
    const sendButton = screen.getByText('Send');
    
    fireEvent.change(input, { target: { value: 'Hello' } });
    fireEvent.click(sendButton);

    // Fast-forward until all timers have been executed
    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(screen.getByText('This is an AI response')).toBeInTheDocument();
    jest.useRealTimers();
  });
});
