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

import SendMessageToUser from './components/SendMessageToUser';

import IndividualMessages from './components/individualMessages';

import Messages from './components/Messages'

import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const response = await axios.get("/api/users/verify");
                console.log(response.data)
                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setUser(null);
                } else {
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
                                <Route path="/profile/:userId" element={<Account />} />
                                <Route path="/signup" element={<SignupPage />} />
                                <Route path="/test" element={<TestComponent />} />
                                <Route path="/browseBySearch" element={<BrowseBySearch />} />
                                <Route path="/game/:gameId" element={<GameDetails />} />
                                <Route path="/browseByCheckboxes" element={<BrowseByCheckboxes />} />
                                <Route path="/discover" element={<Discover />} />  

                                <Route path="/games/:gameId/:categoryPage" element={<GameCategoriesPage />} />

                                <Route path="/users/:userId" element={<SendMessageToUser />} />

                                <Route path="/messages/:userId" element={<Messages />} />
                                <Route path="/individualMessages/:userId/:otherUserId" element={<IndividualMessages />} />



         
                            </Routes>
                        </div>
                </GameProvider>
            </UserContext.Provider>
        </BrowserRouter>
    );
}

export default App;
