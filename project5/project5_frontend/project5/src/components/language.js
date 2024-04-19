import React from 'react';
import {userStore} from '../stores/UserStore';
import Flag from 'react-world-flags';


function Language() {
      //Obtem a linguagem de exibição da página
  const locale = userStore((state) => state.locale);
  const updateLocale = userStore((state) => state.updateLocale);

      //Função para escolher a linguagem de apresentação do chat
  const handleSelect = (event) => {
    console.log(event);
    
    updateLocale(event);
  };

  const languageToFlag = {
    en: "gb",
    pt: "pt",
    fr: "fr"
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
                           <Flag className = "flag" code={languageToFlag[language]}/>
                        </a>
                        {index < 2 ? "   " : "  "}
                      </span>
                    ))}
                  </div>
        </div>
    )
}

export default Language;