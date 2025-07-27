import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RiskForm from '../components/RiskForm';

test('renders description input', () => {
  render(
    <MemoryRouter>
      <RiskForm />
    </MemoryRouter>
  );
  expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
});
