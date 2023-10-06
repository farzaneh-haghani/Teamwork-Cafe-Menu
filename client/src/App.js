import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminMenu from "./pages/AdminMenu";
import Home from "./pages/Home";
import Form from "./pages/Form";
import AppContext from "./components/Context";
import { useEffect, useState } from "react";


function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState(0);
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    fetch(`http://ec2-18-130-253-218.eu-west-2.compute.amazonaws.com/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong.");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setAdminData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <AppContext.Provider value={{ data, setData, id, setId, adminData, setAdminData }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminMenu />} />
          <Route path="/admin/form" element={<Form />} />

        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
