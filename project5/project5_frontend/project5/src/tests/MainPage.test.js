import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../components/MainPage';

test('renders notifications button', async() => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  const notificationsButton = await screen.getByTestId('notifications');
  expect(notificationsButton).toBeInTheDocument();
  fireEvent.click(notificationsButton);
});

test('renders logout button', async () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  const logoutButton = await screen.getByTestId('logout-button');
  expect(logoutButton).toBeInTheDocument();
  fireEvent.click(logoutButton);
});

test('renders timer settings button', async () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  const timerButton = await screen.getByTestId('timer-button');
  expect(timerButton).toBeInTheDocument();
  fireEvent.click(timerButton);
});
