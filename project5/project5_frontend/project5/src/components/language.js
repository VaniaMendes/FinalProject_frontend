import React from 'react';
import {userStore} from '../stores/UserStore';


function Language() {
      //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);
  const updateLocale = userStore((state) => state.updateLocale);

      //Função para escolher a linguagem de apresentação do chat
  const handleSelect = (event) => {
    console.log(event);
    
    updateLocale(event);
  };

    return (
        <div>
             <div className="location">
                    {["en", "pt", "fr"].map((language, index) => (
                      <span key={language}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleSelect(language);
                          }}
                        >
                          {language}
                        </a>
                        {index < 2 ? " | " : ""}
                      </span>
                    ))}
                  </div>
        </div>
    )
}

export default Language;