import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        username: null,
        email: null,
    });

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await axios.post('/api/users/verify');

    //             let { id, username, email } = response.data;

    //             setUser((prevUser) => ({
    //                 ...prevUser,
    //                 id,
    //                 username,
    //                 email,
    //             }));
    //         } catch (error) {
    //             console.error(error);
    //             console.log("Unable to fetch user data!")
    //         }
    //     };

    //     fetchUser();
    // }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
};
