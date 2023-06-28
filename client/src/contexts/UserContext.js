import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        username: null,
        email: null,
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                // This route fetches the user data associated with the JWT in the request header
                const response = await axios.get('/api/user/verifyUser', {
                    headers: {
                        "auth-token": localStorage.getItem('auth-token')
                    }
                });

                // Extract necessary user data
                let { id, username, email } = response.data;

                // Update state with the extracted user data
                setUser((prevUser) => ({
                    ...prevUser,
                    id,
                    username,
                    email,
                }));
            } catch (error) {
                console.error(error);
                console.log("Unable to fetch user data!")
            }
        };

        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};
