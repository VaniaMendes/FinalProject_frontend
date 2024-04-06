import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import { userStore } from "../stores/UserStore";
import { showModal } from '../stores/boardStore';
import {useNavigate} from 'react-router-dom';

function ButtonsForScrum({username}){

  const navigate = useNavigate();

    const { setShowModalEditUser } = showModal();
  
    //controla o evento de click
    const handleViewInformations = () => {
        //Guarda o username na store do user que quer consultar
        userStore.setState({ username: username });

        //Coloca o modal do edit User true para aparecer
        setShowModalEditUser(true);
        navigate('/profile/' + username);
        
      }

    return(
        <div>
                    <button
                      className="edit_button" title=' View Profile'
                      onClick={() => handleViewInformations()}
                    >
                      <FaBookOpenReader />
                    </button>
                    
                    </div>

    )

}

export default ButtonsForScrum;