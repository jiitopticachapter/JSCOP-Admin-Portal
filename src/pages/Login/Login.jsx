import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../Context/UserContextProvider";
import Spinner from "react-bootstrap/Spinner";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader, setLoader] = useState(false);

    const navigate = useNavigate();
    const { setUser } = UserState();

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        setLoader(true);
        event.preventDefault();
        console.log(email, password);
        try {
            const response = await axios.post(
                "http://localhost:4000/admin/login",
                {
                    email: email,
                    password: password,
                }
            );
            if (response.request.status === 200) {
                console.log(response.data);
                localStorage.setItem("userInfo", JSON.stringify(response.data));

                setUser(response.data);
                navigate("/");
            } else {
                alert("Invalid Credentials");
            }
            setLoader(false);
        } catch (err) {
            toast.error("Login Failed");
            console.log(err);
            setLoader(false);
        }
    };

    return (
        <div className="loginlogin-page">
            {loader && (
                <div className="d-flex w-100 justify-content-center mb-5">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
            <div className="loginform">
                <form className="loginlogin-form">
                    <input
                        onChange={handleChangeEmail}
                        type="text"
                        placeholder="email"
                        value={email}
                    />
                    <input
                        onChange={handleChangePassword}
                        type="password"
                        placeholder="password"
                        value={password}
                    />
                    <button onClick={handleLogin}>login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
