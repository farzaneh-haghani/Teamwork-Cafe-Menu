import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminMenu from "./components/AdminMenu";
import Home from "./components/Home";
import Edit from "./components/Edit";
import Add from "./components/Add";
import AppContext from "./components/Context";
import { useEffect, useState } from "react";


function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/`)
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
    <AppContext.Provider value={{ data, setData, id, setId }}>
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
