import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import IncidentList from '../components/IncidentList';

test('renders list header', () => {
  render(
    <MemoryRouter>
      <IncidentList />
    </MemoryRouter>
  );
  expect(screen.getByText(/incidents/i)).toBeInTheDocument();
});
