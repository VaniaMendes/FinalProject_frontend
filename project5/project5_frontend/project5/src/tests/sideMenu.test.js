import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // Importa MemoryRouter para criar um contexto de roteamento
import SideMenu from "../components/SideMenu";
import { logout } from "../endpoints/users";

// Mock da função de logout
jest.mock("../endpoints/users", () => ({
  logout: jest.fn().mockResolvedValue(true),
}));

describe("SideMenu", () => {
  it("calls logout function when logout button is clicked", async () => {
    // Renderiza o componente SideMenu dentro de um MemoryRouter
    const { getByText } = render(
      <MemoryRouter>
        <SideMenu />
      </MemoryRouter>
    );
    
    // Clica no botão de logout
    fireEvent.click(getByText("Logout"));
    
    // Aguarda até que a função de logout seja chamada
    await waitFor(() => {
      expect(logout).toHaveBeenCalled(); // Verifica se a função de logout foi chamada
    });
  });
});
