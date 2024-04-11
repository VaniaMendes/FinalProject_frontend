import React from 'react';
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";
import { userStore } from '../stores/UserStore';

function HomePage() {

        //Obtem a linguagem de exibição da página
        const locale = userStore((state) => state.locale);

  return (
    <IntlProvider locale={locale} messages={languages[locale]}> 
    <div id="login_body">
      <div id="body_color">
         
      </div>
      <div id="aside_color"></div>
      <header>
        <h1 id="page-logo">
          <img src={"/scrum_image.png"} id="scrum_img" alt="App logo" />&nbsp;AgileUp
        </h1>
      </header>
      
      <div className="footer">
        <div><FormattedMessage id="poweredBy">
                {(message) => <span>{message}</span>}
              </FormattedMessage></div>
        <ul>
          <li>Vânia Mendes</li>
        </ul>
        <br />
        <p>© Acertar o Rumo 2024</p>
      </div>
    </div>
    </IntlProvider>
  );
}

export default HomePage;
