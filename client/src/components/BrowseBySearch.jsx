import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const BrowseBySearch = () => {
    const searchBarForGameRef = useRef(null);
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchGamesByName = async (event) => {
        event.preventDefault();
    
        const gameName = searchBarForGameRef.current.value;
    
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
            headers: {
                'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };
    
        try {
            const response = await axios.request(options);
            const games = response.data;
            // Filter the games by title
            const filteredGames = games.filter(game => game.title.toLowerCase().includes(gameName.toLowerCase()));
            console.log(filteredGames);
            setGames(filteredGames); // Update the games state with the filtered games
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={fetchGamesByName}>
                <div>
                    <input
                        ref={searchBarForGameRef}
                        type="text"
                        id="search-bar-for-game"
                        placeholder="Search for a game by name..."
                    />
                </div>
                <button type="submit">Search by Name</button>
            </form>
            
            {errorMessage && <p>{errorMessage}</p>}
            <div>
                {games.length > 0 ? (
                    games.map(game => (
                        <div key={game.id}>
                            <h2>{game.title}</h2>
                            <img src={game.thumbnail} alt={game.title} />
                            <p>{game.short_description}</p>
                        </div>
                    ))
                ) : (
                    <p>No games found for the selected categories or name.</p>
                )}
            </div>
        </div>
    );    
}

export default BrowseBySearch;
