import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminMenu from "./components/AdminMenu";
import Home from "./components/Home";
import Edit from "./components/Edit";
import AppContext from "./components/Context";
import { useEffect, useState } from "react";


function App() {
  const [menuData, setMenuData] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/home`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AppContext.Provider value={{ menuData, setMenuData, id, setId }}>
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
