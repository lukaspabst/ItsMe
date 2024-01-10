import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';  // Import I18nextProvider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import i18n from './i18nConfig'; // Import the i18n instance

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
            <App />
        </I18nextProvider>
    </React.StrictMode>,
);

reportWebVitals();
