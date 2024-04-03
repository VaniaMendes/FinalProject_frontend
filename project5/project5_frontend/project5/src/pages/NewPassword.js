import React from 'react';
import MainPage from '../components/MainPage';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import {useState, useEffect} from 'react';
import {changePassword} from '../endpoints/users';
import { NotificationManager } from 'react-notifications';



function NewPassword(){

    const location = useLocation(); // Use o hook useLocation para obter a URL atual
    const queryParams = queryString.parse(location.search);
    const [email, setEmail] = useState(null);
    const navigate = useNavigate();

    const[password1, setPassword1] = useState(null);
    const[password2, setPassword2] = useState(null);
  

    useEffect(() => {
        const email1 = queryParams.email; 
        setEmail(email1); 
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verifica se as passwords são iguais
    if (password1 !== password2) {
        NotificationManager.error("Passwords don't match", "", 1000);
        return;
    }
        const result = await changePassword(email, password1, password2);
        if(result===true){
            NotificationManager.success("Password changed successfully", "", 1000);
            navigate("/login");
            
        }else{
            NotificationManager.error(result, "", 1000);
        }
    };


    return(
        <div>
            <MainPage />
            <form onSubmit={handleSubmit}>
                <label>New Password</label>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                />
                <label>Confirm New Password</label>
                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
        </div>


    )
}

export default NewPassword;

