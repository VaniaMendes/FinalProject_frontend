import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../components/MainPage';

// Teste para verificar se o botão de notificações está presente 
test('renders notifications button', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  const notificationsButton = screen.getByTestId('notifications-button');
  expect(notificationsButton).toBeInTheDocument();
  fireEvent.click(notificationsButton);

});

// Teste para verificar se o botão de logout está presente e tem acção
test('renders logout button', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  const logoutButton = screen.getByTestId('logout-button');
  expect(logoutButton).toBeInTheDocument();
  fireEvent.click(logoutButton);
});


// Teste para verificar se o botão de definir timeout  está presente e tem acção
test('renders session timeout button', () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  const timeoutButton = screen.getByTestId('timeout-button');
  expect(timeoutButton).toBeInTheDocument();
  fireEvent.click(timeoutButton);

});
