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
        console.log("User Context api firing!")
        const verifyUser = async () => {
            try {
            const response = await axios.get("/api/users/verify");
            if (response.data) {
                setUser(response.data);
            }
            } catch (error) {
            if (error.response && error.response.status === 401) {
                setUser({
                id: null,
                username: null,
                email: null,
                });
            } else {
                console.error("Unexpected error during fetch:", error);
            }
            }
        };
        verifyUser();
        }, []);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };






























//! Old way with flash

// import React, { useState, useEffect, createContext } from "react";
// import axios from "axios";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {

//     useEffect(() => {
//         const verifyUser = async () => {
//             try {
//                 const response = await axios.get("/api/users/verify");
//                 if (response.data) {
//                     setUser(response.data);
//                 }
//             } catch (error) {
//                 if (error.response && error.response.status === 401) {
//                     setUser(null);
//                 } else {
//                     console.error("Unexpected error during fetch:", error);
//                 }
//             }
//         };
//         verifyUser();
//     }, []);

//     const [user, setUser] = useState({
//         id: null,
//         username: null,
//         email: null,
//     });

//     return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
// };
