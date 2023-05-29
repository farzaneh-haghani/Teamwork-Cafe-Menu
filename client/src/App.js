import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminMenu from "./components/AdminMenu";
import Home from "./components/Home";
import Edit from "./components/Edit";
import AppContext from "./components/Context";
import { useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);

  return (
    <AppContext.Provider value={{ data, setData, id, setId }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminMenu />} />
          <Route path="/editForm" element={<Edit data={data} />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
