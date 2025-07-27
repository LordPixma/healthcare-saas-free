import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuditList from '../components/AuditList';

test('renders audits header', () => {
  render(
    <MemoryRouter>
      <AuditList />
    </MemoryRouter>
  );
  expect(screen.getByText(/audits/i)).toBeInTheDocument();
});
