import React from "react";
import {useNavigate} from "react-router-dom"
import languages from "../translations";
import { IntlProvider, FormattedMessage } from "react-intl";
import {userStore} from '../stores/UserStore';

function Authentication(){

    const navigate = useNavigate();
       //Obtem a linguagem de exibição da página
   const locale = userStore((state) => state.locale);

    return(
        <IntlProvider locale={locale} messages={languages[locale]}>
        <div>
            <h1><FormattedMessage id="authenticationRequired">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></h1>
            <div>
                <p><FormattedMessage id="youNeedtoautenticatetoacessthispage">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></p>
                <button onClick={() => navigate('/login')}><FormattedMessage id="login">
                        {(message) => <span>{message}</span>}
                      </FormattedMessage></button>
            </div>
        </div>
        </IntlProvider>
    )
}

export default Authentication;