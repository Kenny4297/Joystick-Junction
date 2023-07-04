import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [gameData, setGameData] = useState({});
    const [lastFetchedGameId, setLastFetchedGameId] = useState(null); 

    const fetchGameById = useCallback(async (id) => {
        if (id !== lastFetchedGameId) { 
            console.log("Game context firing!")
            const options = {
                method: 'GET',
                url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
                params: { id: id },
                headers: {
                    'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
                    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
                }
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
    }, [lastFetchedGameId]);

    return (
        <GameContext.Provider value={{ gameData, setGameData, fetchGameById }}>
            {children}
        </GameContext.Provider>
    );
};
