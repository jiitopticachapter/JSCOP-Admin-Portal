import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Email from "./pages/Email/Email";

import Whatsapp from "./pages/Whatsapp/Whatsapp";
import Navbar from "./components/Navbar/Navbar";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { UserState } from "./Context/UserContextProvider";
import ScanQR from "./pages/ScanQR/ScanQR";

const App = () => {
    const { user } = UserState();

    return (
        <>
            <ToastContainer />
            <Navbar />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/whatsapp" element={<Whatsapp />} />
                <Route path="/email" element={<Email />} />
                <Route path="/login" element={<Login />} />
                <Route path="/scanqr" element={<ScanQR />} />
            </Routes>
        </>
    );
};

export default App;
