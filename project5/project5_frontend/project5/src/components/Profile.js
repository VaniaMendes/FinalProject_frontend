import React from "react";
import { getUserByToken } from "../endpoints/users";
import { useEffect, useState } from "react";
import userStore from '../stores/UserStore';
function ProfilePage(){

    //Obtem o token da store
   const tokenObject = userStore((state) => state.token);
   const tokenUser = tokenObject.token;

   //Estado para guardar os atributos do user
   const [user, setUser] = useState({});

   
useEffect(() =>
    {
        const result = getUserByToken(tokenUser);
        setUser(result);
    
    }, [tokenUser]);


    return(

        <div>
        <h1>User Profile: {user.username}</h1>
        <div>
          <img src={user.photo} alt="User" />
          <p>Name: {user.firstName} {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Total Tasks: {taskStats.totalTasks}</p>
          <p>Tasks Todo: {taskStats.tasksTodo}</p>
          <p>Tasks Doing: {taskStats.tasksDoing}</p>
          <p>Tasks Done: {taskStats.tasksDone}</p>
        </div>
        {/* Add edit profile functionality here */}
      </div>

    )
}

export default ProfilePage;