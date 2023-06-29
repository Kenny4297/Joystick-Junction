import React, { useState, useEffect, useContext } from 'react';
import { GameContext } from '../contexts/GameContext';
import { Link } from 'react-router-dom'

const BrowseByCheckboxes = () => {
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [games, setGames] = useState([]);
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

    const fetchGamesByCategories = async (event) => {
        event.preventDefault();
        const checkboxesAsString = selectedCategories.join('.');
        console.log("Testing fetchGamesByCategories")

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
                        <label className="form-check-label" htmlFor={genre}>{genre}</label>
                    </div>
                </button>
            </li>
        ));
    };

    return (
        <>
            <form onSubmit={fetchGamesByCategories}>
                <div>
                    <ul>{mainCategoryCheckboxes}</ul>
                    <ul>{typesCategoryCheckboxes}</ul>
                    <ul>{multiplayerCategoryCheckboxes}</ul>
                    <ul>{POVCategoryCheckboxes}</ul>
                    <ul>{randomCategoryCheckboxes}</ul>
                </div>
                <button type="submit">Search by Categories</button>
            </form>

            {errorMessage && <p>{errorMessage}</p>}
            <div>
            {games.length > 0 ? (
                games.map(game => (
                    <Link to={`/game/${game.id}`} key={game.id} onClick={() => setGameData(game)}>
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
        </>
    );
};

export default BrowseByCheckboxes;
