import React from 'react';
import { render, act } from '@testing-library/react';
import SearchFields from '../components/SearchFields';
import { getAllCategories } from '../endpoints/categories';
import { getActiveUsers } from '../endpoints/users';
import { userStore } from '../stores/UserStore';

// Mock das funções e módulos utilizados no componente

// Mock da função getAllCategories
jest.mock('../endpoints/categories', () => ({
  getAllCategories: jest.fn(),
}));

// Mock da função getActiveUsers
jest.mock('../endpoints/users', () => ({
  getActiveUsers: jest.fn(),
}));

// Mock da função userStore
jest.mock('../stores/UserStore', () => ({
  userStore: jest.fn(),
}));


// Mock do retorno da função userStore
userStore.mockReturnValue({ token: 'testToken' });

describe('SearchFields', () => {
  test('renders the component and calls data fetching functions', async () => {
    getAllCategories.mockResolvedValue([]);
    getActiveUsers.mockResolvedValue([]);

    // Retorna o token fictício para userStore
    userStore.mockReturnValue({ token: 'testToken' });


  // Renderiza o componente e aguarda o término da renderização
    await act(async () => {
      render(<SearchFields />);
    });

    // Verifica se as funções de pesquisa de dados foram chamadas com o token correto
    expect(getAllCategories).toHaveBeenCalledWith('testToken');
    expect(getActiveUsers).toHaveBeenCalledWith('testToken');
  });
});