import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ApexLab full-stack Test', () => {
  render(<App />);
  const linkElement = screen.getByText(/ApexLab full-stack Test/i);
  expect(linkElement).toBeInTheDocument();
});
