import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('affiche le titre de la TodoList', () => {
  render(<App />);
  const titre = screen.getByText(/Mes tâches/i);
  expect(titre).toBeInTheDocument();
});
