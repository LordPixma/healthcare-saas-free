import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuditForm from '../components/AuditForm';

test('renders audit name input', () => {
  render(
    <MemoryRouter>
      <AuditForm />
    </MemoryRouter>
  );
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
});
