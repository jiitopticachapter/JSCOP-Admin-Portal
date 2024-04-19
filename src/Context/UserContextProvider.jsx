import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const handleUrlChange = () => {
            // Your logic to run when there is a change in the URL
            console.log("URL has changed:", window.location.href);
        };
        window.addEventListener("popstate", handleUrlChange);
        const userInfoString = localStorage.getItem("userInfo");
        if (userInfoString) {
            try {
                const userInfo = JSON.parse(userInfoString);
                setUser(userInfo);
            } catch (error) {
                console.error("Error parsing userInfo:", error);
            }
        } else {
            navigate("/login");
        }
        return () => {
            window.removeEventListener("popstate", handleUrlChange);
        };
    }, [window.location.href]);

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const UserState = () => {
    return useContext(UserContext);
};

export default UserProvider;
