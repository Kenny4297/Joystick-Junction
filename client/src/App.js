import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cookie from "js-cookie"
import { Header } from "./components"
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";
import { UserContext } from "./contexts/UserContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
import TestComponent from "./components/testComponent";

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log("use Effect firing")
        const verifyUser = async () => {
            console.log("Verify user async function firing")
            const authCookie = cookie.get("auth-token");
            if (authCookie) {
                try {
                    const query = await fetch("http://localhost:3001/api/users/verify", {
                        method: "post",
                        body: JSON.stringify({}),
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": authCookie,
                        },
                    });
                    const result = await query.json();
                    if (result) {
                        setUser(result);
                    }
                } catch (error) {
                    console.error("Error during fetch:", error);
                }
            }
        };
        verifyUser();
    }, []);
    

    return (
        <BrowserRouter>
            <UserContext.Provider value={[user, setUser]}>
                    <Header user={user} />
                    <div className="pt-3 px-4">
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/test" element={<TestComponent />} />
                        </Routes>
                    </div>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
