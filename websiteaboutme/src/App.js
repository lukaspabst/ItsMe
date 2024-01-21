import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import PageWrapper from "./components/PageWrapper";
import Footer from "./components/Footer/Footer";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

function App() {
  return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<PageWrapper />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Footer/>
        </Router>
  );
}

export default App;
serviceWorkerRegistration.register();