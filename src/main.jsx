import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Context/UserContextProvider.jsx";
import axios from "axios";

if (import.meta.env.DEV) {
    //for vite application
    console.log("Running in development mode");
    axios.defaults.baseURL = import.meta.env.VITE_LOCALHOST;
} else {
    console.log("Running in production mode");
    axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <UserProvider>
            <App />
        </UserProvider>
    </BrowserRouter>
);
