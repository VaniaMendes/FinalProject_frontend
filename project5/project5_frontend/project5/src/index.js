import React from 'react';
import ReactDOM from 'react-dom/client';
import './format/Format.css';
import Login from './pages/Login';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import Register from './pages/Register';
import PrincipalPage from './pages/PrincipalPage';
import ProductOwner from './pages/ProductOwner';
import EditProfile from './pages/EditProfile';
import { NotificationContainer } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import EmailConfirmation from './pages/Emailconfirmation';
import NecessaryConfirmation from './pages/Confirmation';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<div > <NotificationContainer className="notification-container" /></div>
    <Router>
      <Routes>
      <Route path= "/login" index element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/principalPage" element = {<PrincipalPage/>}/>
      <Route path="/productOwner" element = {<ProductOwner/>}/>
      <Route path = "/myProfile" element = {<EditProfile/>}/>
      <Route path = "/MyTasks" element = {<PrincipalPage/>}/>
      <Route path="/confirmationAccount" element = {<EmailConfirmation/>}/>
      <Route path="/pleaseConfirmEmail" element = {<NecessaryConfirmation/>}/>

         
      </Routes>
  </Router>

  </React.StrictMode>
);


reportWebVitals();
