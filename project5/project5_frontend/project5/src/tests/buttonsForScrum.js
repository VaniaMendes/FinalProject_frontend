import React from "react";
import { FaBookOpenReader } from "react-icons/fa6";
import { userStore } from "../stores/UserStore";
import { showModal } from '../stores/boardStore';


function ButtonsForScrum({username, setShowModalEditUser}){

  
    //controla o evento de click
    const handleViewInformations = () => {
        //Guarda o username na store do user que quer consultar
        userStore.setState({ username: username });

        //Coloca o modal do edit User true para aparecer
        setShowModalEditUser(true);
        
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