import React, { createContext, useState, useCallback } from "react";
import axios from "axios";

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [gameData, setGameData] = useState({});
    const [lastFetchedGameId, setLastFetchedGameId] = useState(null);
    const apiKey = process.env.REACT_APP_RAPID_GAMES_API_KEY;

    const fetchGameById = useCallback(
        async (id) => {
            if (id !== lastFetchedGameId) {
                const options = {
                    method: "GET",
                    url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
                    params: { id: id },
                    headers: {
                        "X-RapidAPI-Key": apiKey,
                        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
                    },
                };

                try {
                    const response = await axios.request(options);
                    const game = response.data;
                    setGameData(game);
                    setLastFetchedGameId(id);
                } catch (error) {
                    console.error(error);
                }
            }
        },
        [lastFetchedGameId, apiKey]
    );

    return <GameContext.Provider value={{ gameData, setGameData, fetchGameById }}>{children}</GameContext.Provider>;
};
