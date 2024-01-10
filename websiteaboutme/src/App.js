import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import About from "./components/About/About";

function App() {
  return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<About />} />
            </Routes>
        </Router>
  );
}

export default App;
