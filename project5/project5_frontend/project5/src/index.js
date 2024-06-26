import React from 'react';

import ReactDOM from 'react-dom/client';
import './format/Format.css';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Register from './pages/Register';
import PrincipalPage from './pages/PrincipalPage';
import EditProfile from './pages/EditProfile';
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import EmailConfirmation from './pages/Emailconfirmation';
import PasswordRecovery from './pages/PasswordRecovery';
import NewPassword from './pages/NewPassword';
import UserProfile from './pages/UserProfile';
import Dashboard from './pages/Dashboard';
import Authentication from './pages/AuthenticationRequired';
import ActiveUsers from './pages/ActiveUsers';
import CategoriesPage from './pages/Categories';
import DeletedTasks from './pages/DeletedTasks';
import InativeUsersPage from './pages/InativeUsers';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<div > <NotificationContainer className="notification-container" /></div>
    <Router>
      <Routes>
      <Route path= "/login" index element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/principalPage" element = {<PrincipalPage/>}/>

      <Route path = "/myProfile" element = {<EditProfile/>}/>
      <Route path = "/MyTasks" element = {<PrincipalPage/>}/>
      <Route path="/confirmationAccount" element = {<EmailConfirmation/>}/>
      <Route path="/passwordRecovery" element = {<PasswordRecovery/>}/>
      <Route path = "/newPassword" element = {<NewPassword/>}/>
      <Route path = "/dashboard" element = {<Dashboard/>}/>

      <Route path="/profile/:username" element={<UserProfile />} />
      <Route path = "/authentication" element={<Authentication />} />
      <Route path="/activeUsers" element={<ActiveUsers />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/deletedTasks" element={<DeletedTasks />} />
      <Route path ="/inactiveUsers" element={<InativeUsersPage />} />
    

      </Routes>
  </Router>

  </React.StrictMode>
);


reportWebVitals();
