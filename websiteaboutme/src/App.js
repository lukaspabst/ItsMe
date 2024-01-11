import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import About from "./components/About/About";
import LandingPage from "./components/Landing/LandingPage";
import AboutPage from "./components/About/About";

function App() {
  return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<LandingPage />} />
            </Routes>
        </Router>
  );
}

export default App;
