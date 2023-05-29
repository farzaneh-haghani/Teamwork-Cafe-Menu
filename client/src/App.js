import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AdminMenu from "./components/AdminMenu";
import Home from "./components/Home";
import Edit from "./components/Edit";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminMenu />} />
          <Route path="/editForm" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
