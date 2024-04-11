import React from "react";
import { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import { getAllCategories } from "../endpoints/categories";
import {addTask, getTask, updateTask} from '../endpoints/tasks';
import { NotificationManager } from "react-notifications";
import '../format/tables.css'
import {showModalNewTask, updateTasksList, modeEditTask} from '../stores/boardStore';
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";


function NewTask() {

  //Componente utilizado para as funções de criar uma nova task e editar task

  //Vai buscar o valor do token ao store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

    //Obtem a linguagem de exibição da página
    const locale = userStore((state) => state.locale);

  //Controla a visibilidade do modal
  const {showNewTask,  setShowNewTask } = showModalNewTask();
  const {updateTasks, setUpdateTasks} = updateTasksList();

  //Controla o estado do modo de edit
  const {editTask, setEditTask} = modeEditTask();

//Vai buscar o id da task para atualizar
  const taskIdForEdit = userStore((state) => state.taskIdForEdit);



  //Estado para gaurdar os dados da task para editar
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [priority, setPriority] = useState("");
  const [categories, setCategories] = useState(null);
  const [priorityColor, setPriorityColor] = useState("");
 
  const [idCategory, setIdCategory] = useState("");

//Objeto para guardar os dados da tarefa
const task={
  title: title,
  description: description,
  initialDate: initialDate,
  endDate: endDate,
  category:{idCategory: idCategory},
  priority: priority
}

//Efeito para ir buscar a lista de categorias 
  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getAllCategories(tokenUser);
      setCategories(categoriesData);

      //Se o modo edição estiver ativo guardar os detalhes da tarefa
      if (editTask && taskIdForEdit) {
        const result = await getTask(tokenUser, taskIdForEdit);
      
        setTitle(result.title);
        setDescription(result.description);
        setEndDate(result.endDate);
        setInitialDate(result.initialDate);
        setPriority(result.priority);
        setIdCategory(result.category.idCategory);

      }

      
    };  
    fetchData();
  }, [tokenUser, taskIdForEdit]);




  //Função para lidar com o envio do formulário
  const handleSubmit = async ( tokenUser, taskIdForEdit, task, idCategory) => {
     

    //Se o modo de edição estiver ativo atualizar a tarefa
    if(editTask && taskIdForEdit){

      const result =  await updateTask(task, tokenUser, taskIdForEdit, idCategory)

    if(result === true){
      NotificationManager.success("Task updated successfully", "", 1000);
      setShowNewTask(false);

      
      }else{
        NotificationManager.warning(result, "", 1000);}
      
        //Se não estiver em modo de edição adicionar uma nova tarefa
    }else{

    const result = await addTask(tokenUser, idCategory, task);
    if(result===200){
      NotificationManager.success("Task added successfully", "", 800);
    
      setShowNewTask(false);
      setUpdateTasks(!updateTasks);

    }else{
    NotificationManager.warning("Title not available", "", 800);
   }
  }
  };


  //Função para fechar o modal
  const handleClose = async (event) => {
    event.preventDefault();
    setShowNewTask(false);
    setEditTask(false);
  };

  //Função para mudar a cor da prioridade
  const handlePriorityChange = (event) => {
    setPriorityColor(event.target.value);
    setPriority(event.target.value);
  };

  return (
    <div className = 'modal_container4'>
       <IntlProvider locale={locale} messages={languages[locale]}>
      {showNewTask && (
          <div className="new-task-container">
              
            <button className="modal_exit" id="cancel" onClick={handleClose}>
              &times;
            </button>
        
            <h2 id="task_creationTitle">{editTask?  <FormattedMessage id="taskEdition">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> : <FormattedMessage id="taskCreation">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> }</h2>

          

            <label htmlFor="opcoes" className="descriptioLabelTask">
            <FormattedMessage id="title">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
            </label>
            <FormattedMessage id="tasktitle">
      {(message) =>   
            <input
              type="text"
              placeholder={message}
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
      }</FormattedMessage>
            <div>
              <label htmlFor="opcoes" className="descriptioLabelTask">
              <FormattedMessage id="category">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
              </label>
              <select
                id="category_element"
                name="opcoes"
                value={idCategory }
                placeholder="Select a category"
                onChange={(event) => {
                  const selectedCategoryID = event.target.value;
                  setIdCategory(selectedCategoryID);
                  
                
                }}

              >
                 <option value="" >
                 <FormattedMessage id="selectCategory">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
    </option>
                {categories &&
                  categories.map((category, index) => (
                    <option key={index} value={category.idCategory}>
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <label htmlFor="opcoes" className="descriptioLabelTask">
            <FormattedMessage id="description">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
            </label>
            <FormattedMessage id="taskDescription">
      {(message) =>
            <textarea
              cols="30"
              rows="14"
              placeholder={message}
              id="description-task"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
      }</FormattedMessage>

            <div id="date_section" className="descriptioLabelTask">
              <div>
                <p><FormattedMessage id="initialDate">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></p>
                <input
                  type="date"
                  id="initial_date"
                  value={initialDate}
                  onChange={(event) => setInitialDate(event.target.value)}
                />
              </div>
              <div id="end_date" className="descriptioLabelTask">
                <p><FormattedMessage id="finalDate">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></p>
                <input
                  type="date"
                  id="end_dates"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
            </div>

            <div id="color_section" >
              <label id="label_color"><FormattedMessage id="priority">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></label>
              <div className="priority_div">
                <input
                  type="radio"
                  name="priority"
                  id="low_priority"
                  selected
                  value="100"
                  onChange={handlePriorityChange}
                  checked={priority === "100"}
                 />
                <label htmlFor="low_priority"><FormattedMessage id="low">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></label>
              </div>
              <div className="priority_div">
                <input
                  type="radio"
                  name="priority"
                  id="medium_priority"
                  value="200"
                  onChange={handlePriorityChange}
                  checked={priority === "200"}
                />
                <label htmlFor="medium_priority"><FormattedMessage id="medium">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></label>
              </div>
              <div className="priority_div">
                <input
                  type="radio"
                  name="priority"
                  id="high_priority"
                  value="300"
                  onChange={handlePriorityChange}
                  checked={priority === "300"}
                />
                <label htmlFor="high_priority"><FormattedMessage id="high">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></label>
              </div>
              <div
                id="priority_color"
                style={{
                  backgroundColor:
                    priorityColor === "100"
                      ? "green"
                      : priorityColor === "200"
                      ? "yellow"
                      : priorityColor === "300"
                      ? "red"
                      : "transparent",
                }}
              ></div>
            </div>

            <div className="buttons">
              <button
                className="btns_task"
                id="task_save"
                onClick={()=> handleSubmit(tokenUser, taskIdForEdit, task, idCategory)}
              >
                {editTask? <FormattedMessage id="update">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> : <FormattedMessage id="save">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage> }
              </button>
              <button
                className="btns_task"
                id="task_cancel"
                onClick={handleClose}
              >
                <FormattedMessage id="cancel">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
              </button>
            </div>

            <div id="error_creating_task"></div>
          </div>
      
      )}
      </IntlProvider>
     
    </div>
  );
}

export default NewTask;
