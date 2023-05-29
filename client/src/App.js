import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminMenu from "./components/AdminMenu";
import Home from "./components/Home";
import Edit from "./components/Edit";
import AppContext from "./components/Context";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5050/home`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setMenuData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AppContext.Provider
      value={{ data, setData, id, setId, menuData, setMenuData }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminMenu />} />
          <Route path="/editForm" element={<Edit />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
