import React from 'react';
import {userStore} from '../stores/UserStore';
import { useEffect, useState } from 'react';
import {getTask} from '../endpoints/tasks';
import {ViewTaskDetails} from '../stores/boardStore';
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";


function TaskDetails(){

     //Vai buscar o valor do token ao store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

     //Obtem a linguagem de exibição da página
     const locale = userStore((state) => state.locale);

//Vai buscar o valor da task for edit que é guardado quando clico para ver os detalhes
    const taskIdForEdit = userStore((state) => state.taskIdForEdit);

  
    //Controla o modo de exibição do modal de detalhes da tarefa
    const {showTaskDetails, setShowTaskDetails} = ViewTaskDetails();

    //Estados para os detalhes da tarefa a serema presentados
    const[title, setTitle] = useState("");
    const[description, setDescription] = useState("");
    const[endDate, setEndDate] = useState("");
    const[initialDate, setInitialDate] = useState("");
    const[categoryTitle, setCategoryTitle] = useState("");


    //Efeito para ir buscar os detalhes da tarefa
    useEffect(() => {
        const fetchData = async () => {
            const result = await getTask(tokenUser, taskIdForEdit);
             
            setTitle(result.title);
            setCategoryTitle(result.category.title);
            setDescription(result.description);
            setEndDate(result.endDate);
            setInitialDate(result.initialDate);
  
          }
         
        fetchData();
      }, [taskIdForEdit, tokenUser]);

      //Função para fechar o modal
      const handleClose = () => {
        setShowTaskDetails(false);
      };

    return(
        <div>
<IntlProvider locale={locale} messages={languages[locale]}>
{showTaskDetails && (
        <div className="new-task-container">       
            <h2 id="task_creationTitle"> <FormattedMessage id="taskDetails">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></h2>

          <div>
            <label htmlFor="opcoes" className="descriptioLabelTask" >
            <FormattedMessage id="title">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
            </label>
            <input
            
              type="text"
              rows="1"
              cols="20"
              placeholder={title}
              id="title" 
              disabled
            />
            <label htmlFor="opcoes" className="descriptioLabelTask">
            <FormattedMessage id="category">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
          </label>
          <input 
            type="text"
            rows="1"
            placeholder={categoryTitle}
            id="title" 
            
            disabled
    />
            <label htmlFor="opcoes" className="descriptioLabelTask">
            <FormattedMessage id="description">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage>
            </label>
            <textarea
              cols="20"
              rows="5"
              placeholder={description}
              id="description-task"
              disabled
              style={{height:'100px'}}
            ></textarea>
            </div>

            <div id="date_section" className="descriptioLabelTask">
              <div>
                <p><FormattedMessage id="initialDate">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></p>
                <input
                  type="date"
                  id="initial_date"
                value={initialDate}
                disabled
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
                  disabled
                />
              </div>
             
            </div>
            <div className="buttons" id="butoon_div">
                <button className='button' onClick={handleClose}><FormattedMessage id="close">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></button>
              </div>
            </div>
)}
</IntlProvider>
            </div>
    )
}

export default TaskDetails;