// src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app header', () => {
  render(<App />);
  const heading = screen.getByText(/pokémon coding challenge/i);
  expect(heading).toBeInTheDocument();
});
test('renders the Pokémon list component placeholder text', async () => {
  render(<App />);

  // Check for fallback message when no Pokémon are selected
  const previewText = await screen.findByText(/no pokémon selected/i);
  expect(previewText).toBeInTheDocument();
});