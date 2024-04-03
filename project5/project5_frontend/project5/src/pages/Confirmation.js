import React from "react";
import MainPage from "../components/MainPage";
import { useNavigate } from "react-router-dom";

function NecessaryConfirmation() {

    
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/login");
  };


  return (
    <div>
      <MainPage />
      <div className="verify-container">
        <h2>Please verify your email box</h2>
        <p>Your account is not confirmed</p>
        <button className="btn_confirm" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}

export default NecessaryConfirmation;
