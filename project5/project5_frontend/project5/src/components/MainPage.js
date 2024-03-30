import React from 'react';

function HomePage() {
  return (
    
    <div id="login_body">
      <div id="body_color"></div>
      <div id="aside_color"></div>
      <header>
        <h1 id="page-logo">
          <img src={"/scrum_image.png"} id="scrum_img" alt="App logo" />&nbsp;AgileUp
        </h1>
      </header>
      
      <div className="footer">
        <div>Powered by:</div>
        <ul>
          <li>Vânia Mendes</li>
        </ul>
        <br />
        <p>© Acertar o Rumo 2024</p>
      </div>
    </div>
  );
}

export default HomePage;
