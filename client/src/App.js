import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import cookie from "js-cookie"
import { Header } from "./components"
import { HomePage, LoginPage, ProfilePage, SignupPage } from "./pages";
import { UserContext } from "./contexts/UserContext";
import { GameProvider } from "./contexts/GameContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css'
import TestComponent from "./components/testComponent";
import Account from './components/Profile/Account'

import BrowseBySearch from './components/BrowseBySearch'
import BrowseByCheckboxes from './components/BrowseByCheckboxes'
import Discover from './components/Discover'

import GameDetails from "./components/GameDetails";

import GameCategoriesPage from './components/Categories/GameCategoriesPage'

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        console.log("use Effect firing")
        const verifyUser = async () => {
            console.log("Verify user async function firing")
            const authCookie = cookie.get("auth-token");
            if (authCookie) {
                try {
                    const query = await fetch("/api/users/verify", {
                        method: "post",
                        body: JSON.stringify({}),
                        headers: {
                            "Content-Type": "application/json",
                            "auth-token": authCookie,
                        },
                    });
                    const result = await query.json();
                    if (result) {
                        console.log("user being set")
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
                <GameProvider>
                        <Header user={user} />
                        <div style={{margin:'1rem 2rem 2rem 2rem'}}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/account/:userId" element={<Account />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/test" element={<TestComponent />} />
                                <Route path="/browseBySearch" element={<BrowseBySearch />} />
                                <Route path="/game/:gameId" element={<GameDetails />} />
                                <Route path="/browseByCheckboxes" element={<BrowseByCheckboxes />} />
                                <Route path="/discover" element={<Discover />} />  

                                <Route path="/games/:gameId/:categoryPage" element={<GameCategoriesPage />} />



                                         
                            </Routes>
                        </div>
                </GameProvider>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
