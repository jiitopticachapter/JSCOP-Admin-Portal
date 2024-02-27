import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Email from "./pages/Email/Email";

import Whatsapp from "./pages/Whatsapp/Whatsapp";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            loggedIn ? <Dashboard /> : <Login setLoggedIn={setLoggedIn} />
          }
        />
        <Route
          path="/whatsapp"
          element={
            loggedIn ? <Whatsapp /> : <Login setLoggedIn={setLoggedIn} />
          }
        />
        <Route
          path="/email"
          element={loggedIn ? <Email /> : <Login setLoggedIn={setLoggedIn} />}
        />
      </Routes>
    </>
  );
};

export default App;
