import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./assets/css/index.css";
import MainPage from "./pages/MainPage"
import Bus from "./pages/Bus"



function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/bus/" element={<Bus />} />
      </Routes> 
    </Router>
    </>
  );
}

export default App;
