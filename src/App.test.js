import { render, screen } from '@testing-library/react';
import App from './App';

test('renders weather dashboard header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Weather/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders search bar', () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText(/Search for a city/i);
  expect(searchInput).toBeInTheDocument();
});

test('renders location button', () => {
  render(<App />);
  const locationButton = screen.getByText(/Use My Location/i);
  expect(locationButton).toBeInTheDocument();
});