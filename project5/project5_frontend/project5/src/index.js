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



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<div > <NotificationContainer className="notification-container" /></div>
    <Router>
      <Routes>
      <Route index element={<Login/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/principalPage" element = {<PrincipalPage/>}/>
      <Route path="/productOwner" element = {<ProductOwner/>}/>
      <Route path = "/editProfile" element = {<EditProfile/>}/>
      <Route path = "/MyTasks" element = {<PrincipalPage/>}/>
   
      </Routes>
  </Router>

  </React.StrictMode>
);


reportWebVitals();
