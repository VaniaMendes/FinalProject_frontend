import React from 'react';
import { render, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Authentication from '../pages/AuthenticationRequired';
import { MemoryRouter } from 'react-router-dom'; 


test('renders Authentication component', () => {
  render(
    <MemoryRouter>
      <Authentication />
    </MemoryRouter>
  );

  expect(screen.getByText('Authentication Required')).toBeInTheDocument();
  expect(screen.getByText('You need to authenticate to access this page')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
});

