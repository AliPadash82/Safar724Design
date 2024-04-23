import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/css/index.css";
import MainPage from "./pages/MainPage"
import ServicePage from "./pages/ServicePage"



function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/services/" element={<ServicePage />} />
      </Routes> 
    </Router>
    </>
  );
}

export default App;
