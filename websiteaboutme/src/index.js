import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18nConfig';
import {GlobalProvider} from "./GlobalContext";


ReactDOM.createRoot(document.getElementById('root')).render(
    <I18nextProvider i18n={i18n}>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </I18nextProvider>
);

reportWebVitals();
