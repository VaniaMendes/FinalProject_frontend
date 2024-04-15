import React from "react";
import {useNavigate} from "react-router-dom"

function Authentication(){

    const navigate = useNavigate();

    return(
        <div>
            <h1>Authentication Required</h1>
            <div>
                <p>You need to authenticate to acess this page</p>
                <button onClick={() => navigate('/login')}>Login</button>
            </div>
        </div>
    )
}

export default Authentication;