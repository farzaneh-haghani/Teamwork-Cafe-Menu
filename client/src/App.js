import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminMenu from "./components/AdminMenu";
import Home from "./components/Home";
import Edit from "./components/Edit";
import Add from "./components/Add";
import AppContext from "./components/Context";
import { useState } from "react";
import "./App.css";

function App() {
  const [menuData, setMenuData] = useState([]);
  const [id, setId] = useState([]);

  return (
    <AppContext.Provider value={{ menuData, setMenuData, id, setId }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminMenu />} />
          <Route path="/editForm" element={<Edit />} />
          <Route path="/addForm" element={<Add />} />

        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
