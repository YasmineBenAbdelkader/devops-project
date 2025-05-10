import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

test('can add a new task', () => {
  render(<App />);
  const inputField = screen.getByPlaceholderText('Ajouter une nouvelle tâche...');
  fireEvent.change(inputField, { target: { value: 'Nouvelle tâche' } });

  const addButton = screen.getByText('Ajouter');
  fireEvent.click(addButton);
});


