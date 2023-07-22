import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import { UserContext } from "./contexts/UserContext";
import { GameProvider } from "./contexts/GameContext";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/Header/LoginPage";
import SignupPage from "./components/Header/SignupPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/global.css";
import Account from "./components/Profile/Account";
import GameDetails from "./components/GameDetails";
import GameCategoriesPage from "./components/Categories/GameCategoriesPage";
import SendMessageToUser from "./components/DM/SendMessageToUser";
import IndividualMessages from "./components/DM/individualMessages";
import Messages from "./components/DM/Messages";
import Browse from "./components/Browse";
import RecentArticles from "./components/HomePage/RecentArticles";

import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get("/api/users/verify");
                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                } else {
                    console.error("Unexpected error during fetch:", error);
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
                    <div style={{ margin: "1rem 4rem 2rem 4rem" }}>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/profile/:userId" element={<Account />} />
                            <Route path="/signup" element={<SignupPage />} />
                            <Route path="/game/:gameId" element={<GameDetails />} />

                            <Route path="/games/:gameId/:categoryPage" element={<GameCategoriesPage />} />

                            <Route path="/users/:userId" element={<SendMessageToUser />} />

                            <Route path="/messages/:userId" element={<Messages />} />
                            <Route path="/individualMessages/:userId/:otherUserId" element={<IndividualMessages />} />

                            <Route path="/browse" element={<Browse />} />
                            <Route path="/recentArticles" element={<RecentArticles />} />
                        </Routes>
                    </div>
                    <Footer />
                </GameProvider>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
