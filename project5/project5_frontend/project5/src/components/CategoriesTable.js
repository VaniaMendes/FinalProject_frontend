import React from "react";
import "../format/tables.css";
import CategoryBoard from "./CategoryBoard";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import { deleteCategory } from "../endpoints/categories";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { userStore } from "../stores/UserStore";
import { getAllCategories } from "../endpoints/categories";
import { BiSolidCategoryAlt } from "react-icons/bi";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";

import {
  showModal,
  updateCategoriesTable,
  modeEditOn,
} from "../stores/boardStore";

function Categories() {
  //State para armazenar a lista de ctaegorias
  const [categories, setCategories] = useState(null);

   //Obtem a linguagem de exibição da página
   const locale = userStore((state) => state.locale);

  //Obtém o token do user que efetuou o login
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  // Obtém e configura os estados do modal
  const showModalNewCategory = showModal((state) => state.showModalNewCategory);
  const setShowModalNewCategory = showModal(
    (state) => state.setShowModalNewCategory
  );
  const { showCategoriesTable } = updateCategoriesTable();

  //Obtem o estado de edição de uma categoria
  const { setModeEdit } = modeEditOn();

  //Função para ir buscar e atualizar as categorias
  const fetchData = async () => {
    const categories = await getAllCategories(tokenUser);
    setCategories(categories);
  };


  // Efeito para carregar as categorias quando o componente
  // arrancar ou houver uma atualização no estado de exibição das categorias

  useEffect(() => {
    fetchData();
  }, [tokenUser, showCategoriesTable]);


  //Função para abrir o modal de edição da ctaegoria
  const openEditModal = (categoryId) => {
    //Guarda o ID da categoria a editar no store
    userStore.getState().setCategoryId(categoryId);
    //Exibe o modal da categoria
    setShowModalNewCategory(true);
  };

  //Função para apagar uma categoria
  const handleDelete = async (categoryId, tokenUser) => {
    const result = await deleteCategory(categoryId, tokenUser);

    if (result === true) {
      NotificationManager.success("Category deleted successfully", "", 1000);
      //Atualiza a lista de categorias
      fetchData();
    } else {
      NotificationManager.error(result, "", 1200);
    }
  };

  return (
    <div>
       <IntlProvider locale={locale} messages={languages[locale]}>
      <div className="table_container">
        <table id="users_table">
          <thead>
            <tr>
              <th className="titleUser">
                <BiSolidCategoryAlt className="task_icon" />
              </th>
              <th className="titleUser3"> <FormattedMessage id="categories">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
              <th>
                <button
                  id="btn_user"
                  onClick={() => setShowModalNewCategory(true)}
                >
                  <FormattedMessage id="newCategory">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
                </button>
              </th>
              <th className="titleUser"></th>
            </tr>
            <tr className="header">
              <th> <FormattedMessage id="author">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
              <th><FormattedMessage id="title">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
              <th><FormattedMessage id="description">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
              <th><FormattedMessage id="categoryEdition">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></th>
            </tr>
          </thead>
          <tbody className="body">
            {categories &&
              categories.map((category, index) => (
                <tr key={index}>
                  <td>{category.author.username}</td>
                  <td>{category.title}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      className="edit_button"
                      onClick={() => (
                        openEditModal(category.idCategory), setModeEdit(true)
                      )}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete_button"
                      title="Delete"
                      onClick={() =>
                        handleDelete(category.idCategory, tokenUser)
                      }
                    >
                      <MdDeleteForever />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showModalNewCategory && <CategoryBoard />}
      </IntlProvider>
    </div>
  );
}

export default Categories;
