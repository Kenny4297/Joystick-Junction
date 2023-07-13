import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';

const Browse = () => {
    const searchBarForGameRef = useRef(null);
    const [games, setGames] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [mainCategoryCheckboxes, setMainCategoryCheckboxes] = useState([]);
    const [typesCategoryCheckboxes, setTypesCategoryCheckboxes] = useState([]);
    const [multiplayerCategoryCheckboxes, setMultiplayerCategoryCheckboxes] = useState([]);
    const [POVCategoryCheckboxes, setPOVCategoryCheckboxes] = useState([]);
    const [randomCategoryCheckboxes, setRandomCategoryCheckboxes] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const { setGameData } = useContext(GameContext);

    useEffect(() => {
        const mainCategoryArray = ["flight", "racing", "sailing", "sports"];
        const typesCategoryArray = ["action", "action-rpg", "battle-royale", "card", "fantasy", "fighting", "martial-arts",
            "open-world", "sandbox", "sci-fi", "shooter", "space", "strategy", "survival", "turn-based", "zombie"];
        const multiplayerCategoryArray = ["mmo", "mmofps", "mmorts", "mmotps", "moba", "pvp", "social"];
        const POVArray = ["2d", "3d", "first-person", "side-scroller", "third-person", "top-down"];
        const randomCategoryArray = ["anime", "horror", "military", "permadeath", "pixel", "pve", "superhero", "tank", "tower-defense", "voxel"];

        setMainCategoryCheckboxes(generateCheckboxes(mainCategoryArray));
        setTypesCategoryCheckboxes(generateCheckboxes(typesCategoryArray));
        setMultiplayerCategoryCheckboxes(generateCheckboxes(multiplayerCategoryArray));
        setPOVCategoryCheckboxes(generateCheckboxes(POVArray));
        setRandomCategoryCheckboxes(generateCheckboxes(randomCategoryArray));
    }, []);

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
            const filteredGames = games.filter(game => game.title.toLowerCase().includes(gameName.toLowerCase()));
            setGames(filteredGames);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchGamesByCategories = async (event) => {
        event.preventDefault();
        const checkboxesAsString = selectedCategories.join('.');

        const url = `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${checkboxesAsString}`;
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setGameData(data);
            setGames(data);
        } catch (error) {
            console.error('Failed to fetch games:', error);
            setErrorMessage('Failed to fetch games: ' + error.message);
        }
    };

    const handleCheckboxChange = (event) => {
        if (event.target.checked) {
            setSelectedCategories([...selectedCategories, event.target.value]);
        } else {
            setSelectedCategories(selectedCategories.filter(category => category !== event.target.value));
        }
    };

    const generateCheckboxes = (categoryArray) => {
        return categoryArray.map((genre, index) => (
            <li key={index}>
                <button className="dropdown-item">
                    <div className="form-check">
                        <input 
                            className="form-check-input" 
                            type="checkbox" 
                            value={genre} 
                            id={genre}
                            onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" style={{color:'white'}} htmlFor={genre}>{genre}</label>
                    </div>
                </button>
            </li>
        ));
    };

    const handleGameClick = (game) => {
        setGameData(game);
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
    };
    
    const sectionTitleStyle = {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '10px'
    };

    return (
        <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'column', marginRight: '20px'}}>
            <form onSubmit={fetchGamesByCategories}>
                <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                    <div><ul>{mainCategoryCheckboxes}</ul></div>
                    <div><ul>{typesCategoryCheckboxes}</ul></div>
                    <div><ul>{multiplayerCategoryCheckboxes}</ul></div>
                    <div><ul>{POVCategoryCheckboxes}</ul></div>
                    <div><ul>{randomCategoryCheckboxes}</ul></div>
                </div>
                <button type="submit">Search by Categories</button>
            </form>
        </div>
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <form onSubmit={fetchGamesByName}>
                <input
                    ref={searchBarForGameRef}
                    type="text"
                    id="search-bar-for-game"
                    placeholder="Search for a game by name..."
                />
                <button type="submit">Search</button>
            </form>
        </div>
        {errorMessage && <p>{errorMessage}</p>}
        <div>
            {games.length > 0 ? (
                games.map(game => (
                    <Link key={game.id} to={`/game/${game.id}`} onClick={() => handleGameClick(game)}>
                        <div>
                            <h2>{game.title}</h2>
                            <img src={game.thumbnail} alt={game.title} />
                            <p>{game.short_description}</p>
                        </div>
                    </Link>
                ))
            ) : (
                <p>No games found for the selected categories or name.</p>
            )}
        </div>
    </div>
    );
};

export default Browse;
