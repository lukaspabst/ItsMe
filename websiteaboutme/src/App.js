import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Header from "./components/Header/Header";
import PageWrapper from "./components/PageWrapper";

function App() {
  return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<PageWrapper />} />
            </Routes>
        </Router>
  );
}

export default App;
