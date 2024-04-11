import React from 'react';
import { NotificationManager } from "react-notifications";
import {createCategory} from '../endpoints/categories';
import {useState, useEffect} from 'react';
import {userStore} from '../stores/UserStore';
import {showModal, updateCategoriesTable, modeEditOn} from '../stores/boardStore';
import { editCategory, getCategoryById } from "../endpoints/categories";
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";

function Categories(){

   //Vai buscar o token à store
  const tokenUser = userStore(state => state.token.token);

  //Estados locais para guardar o titulo e a descrição
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');
 
  //Obtem o ID da categoria guardado no store para editar
  const categoryId = userStore((state) => state.getCategoryId());

  //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);


  // Obtém e configura o estado de modo de edição
  const { modeEdit, setModeEdit } = modeEditOn();


// Obtém e configura o estado de exibição da tabela de categorias
  const { setShowCategoriesTable, showCategoriesTable } = updateCategoriesTable();


// Efeito para buscar as informações da categoria para preencher os campos ao editar a categoria
  useEffect(() => {
    const fetchData = async () => {
      if(modeEdit){
      const categoryAll = await getCategoryById(categoryId, tokenUser);
      if(categoryAll){
      setTitle(categoryAll.title);
      setDescription(categoryAll.description);
      }
    }
    };
    fetchData();
  },[]);



    //Função  que fecha o modal e redefine os estados locais  
    const closeModal = () => {
    showModal.setState({ showModalNewCategory: false });
    setModeEdit(false);
    setDescription('');
    setTitle('');
  
  };

  // Função para lidar com a criação ou edição de uma categoria
    const handleCategory = async (title, description, tokenUser) => {

      //Se o modo edit for true e o categoryId existir vamos editar a categoria
      if(modeEdit && categoryId){
          if (title !== "") {
            const result = await editCategory(
              categoryId,
              tokenUser,
              title,
              description
            );
      
    
            if (result === 200) {
              NotificationManager.success("Category successfully edited", "",1000);
              
              setShowCategoriesTable(!showCategoriesTable);
              closeModal();
       
      
                   } else if (result === 422) {
              NotificationManager.warning("Title not available", "",1000);
            } else {
              NotificationManager.error("Failed to edit category","",1000);
            }
          } else {
            NotificationManager.warning("Please put a title", "",1000);
          }
        

      }else{

        // Se não estiver no modo de edição, cria uma nova categoria
        if(title !== ""){
        const result = await createCategory(title, description, tokenUser);
        if (result === 200) {
          NotificationManager.success("Category successfully created", "", 800);        
          closeModal();
          setShowCategoriesTable(!showCategoriesTable);
        }else if (result === 422){
            NotificationManager.warning("Title already exists", "", 800);
         
        } else {
          NotificationManager.error("Failed to create category", "", 800);
        }
    }else{
        NotificationManager.warning("Please fill the title", "", 800);
    }
  }

      };
     
    return(
  
      <IntlProvider locale={locale} messages={languages[locale]}>
        <div className="modal_container">            
        {showModal && (
        <div className="descricaoCategoria">
            <button className="modal_exit" id="cancel" onClick={closeModal}>&times;</button>
            <h2>{modeEdit ? 'Edit Category' : 'New Category'}</h2>
            <label htmlFor="title"><FormattedMessage id="categorytitle">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></label>
            <input type="text" placeholder= {modeEdit ? title : "Category Title"}  id="title" 
            value={title} onChange={(event) => setTitle(event.target.value)} required />
            <label htmlFor="description"><FormattedMessage id="description">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></label>
            <textarea cols="30" rows="5" placeholder={modeEdit ? description : "Category Description"} id="description" 
            value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                 
            <div className="buttons">
                <button className="btns_task" id="category_save" onClick={() => handleCategory(title, description, tokenUser)}>  {modeEdit 
                ? <FormattedMessage id="update">
                {(message) => <span>{message}</span>}
              </FormattedMessage> : 
              <FormattedMessage id="save">
              {(message) => <span>{message}</span>}
            </FormattedMessage>}</button>
                <button className="btns_task" id="category_delete" onClick={closeModal}><FormattedMessage id="cancel">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></button>
            </div>
        </div>
   
  
    )};
     </div>
    </IntlProvider>
    )
}

export default Categories;