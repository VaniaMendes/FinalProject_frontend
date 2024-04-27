import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../stores/UserStore';

const withAuth = (Component) => {
  return (props) => {
    const { isAuthenticated } = userStore();
    const navigate = useNavigate();

    if (!isAuthenticated()) {
      return navigate("/login");
    }

    return <Component {...props} />;
  };
};

export default withAuth;