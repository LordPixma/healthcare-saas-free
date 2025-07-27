import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RiskList from '../components/RiskList';

test('renders risks header', () => {
  render(
    <MemoryRouter>
      <RiskList />
    </MemoryRouter>
  );
  expect(screen.getByText(/risks/i)).toBeInTheDocument();
});
