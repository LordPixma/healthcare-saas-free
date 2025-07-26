import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import IncidentForm from '../components/IncidentForm';

test('renders form title input', () => {
  render(
    <MemoryRouter>
      <IncidentForm />
    </MemoryRouter>
  );
  expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
});
