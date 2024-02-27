import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Email from "./pages/Email/Email";

import Whatsapp from "./pages/Whatsapp/Whatsapp";
import Navbar from "./components/Navbar/Navbar";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/whatsapp" element={<Whatsapp />} />
        <Route path="/email" element={<Email />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
