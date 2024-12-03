import React from 'react';
import { render, screen } from '@testing-library/react';
import ChatBotUI from '../pages/chabotUI';

test('renders ChatBotUI component', () => {
  render(<ChatBotUI />);
  const linkElement = screen.getByText(/send/i);
  expect(linkElement).toBeInTheDocument();
});
