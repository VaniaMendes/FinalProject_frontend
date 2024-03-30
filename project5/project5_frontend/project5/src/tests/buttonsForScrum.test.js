import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ButtonsForScrum from "./buttonsForScrum";

describe("ButtonsForScrum", () => {
  it("should call handleViewInformations when the button is clicked", () => {
    // Arrange
    const username = "testUser"; //Nome fictício de um utilizador
    const setShowModalEditUser = jest.fn(); // Mock da função setShowModalEditUser
    const { getByTitle } = render( // Função render do testing-library para renderizar o componente
      <ButtonsForScrum username={username} setShowModalEditUser={setShowModalEditUser} />
    );

    // Act
    fireEvent.click(getByTitle("View Profile")); // Simula o clique no botão com título "View Profile"

    // Assert
    expect(setShowModalEditUser).toHaveBeenCalledWith(true); // Verifica se a função setShowModalEditUser foi chamada com o argumento true
  });
});
