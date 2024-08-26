import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form submit button', () => {
  render(<App />);
  const buttonElement = screen.getByText(/submit/i);
  expect(buttonElement).toBeInTheDocument();
});
