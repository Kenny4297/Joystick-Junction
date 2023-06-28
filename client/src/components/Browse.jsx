import React, { useEffect, useRef, useState } from 'react';

export default function GameSearch() {
    // const searchBarRef = useRef(null);
    const searchBarForGameRef = useRef(null);
    const APIResponseTestSectionRef = useRef(null);
    const [mainCategoryCheckboxes, setMainCategoryCheckboxes] = useState([]);
    const [typesCategoryCheckboxes, setTypesCategoryCheckboxes] = useState([]);
    const [multiplayerCategoryCheckboxes, setMultiplayerCategoryCheckboxes] = useState([]);
    const [POVCategoryCheckboxes, setPOVCategoryCheckboxes] = useState([]);
    const [randomCategoryCheckboxes, setRandomCategoryCheckboxes] = useState([]);
    const [games, setGames] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');


    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const getGameByNameDebounce = debounce(async () => {
        const userInputChoiceValue = searchBarForGameRef.current.value;
        const url = `https://free-to-play-games-database.p.rapidapi.com/api/games`;
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
            setGames(data);
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    }, 1000);

    const fetchWithCheckBoxAndSearchBar = async (event) => {
        event.preventDefault();
    
        let userInputChoiceValue = searchBarForGameRef.current.value;
        // If the user doesn't input anything, default to 'all'
        if (!userInputChoiceValue) {
            userInputChoiceValue = 'all';
        }
    
        if (!selectedCategories.length) {
            setErrorMessage('Please select at least one checkbox option, or search for a title by name in the second search bar');
            return;
        } else {
            setErrorMessage(''); 
        }
    
        const checkboxesAsString = selectedCategories.join('.');
        
        let url = `https://free-to-play-games-database.p.rapidapi.com/api/filter?tag=${checkboxesAsString}&platform=${userInputChoiceValue}`;
        const options = {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": "5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
        };
    
        try {
            const response = await fetch(url, options);
            let data = await response.json();
            setGames(data);
        } catch (error) {
            console.error('Failed to fetch games:', error);
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

    useEffect(() => {
        const mainCategoryArray = ["flight", "racing", "sailing", "sports"];
        const typesCategoryArray = ["action", "action-rpg", "battle-royale", "card", "fantasy", "fighting", "martial-arts", "open-world", "sandbox", "sci-fi", "shooter", "space", "strategy", "survival", "turn-based", "zombie"];
        const multiplayerCategoryArray = ["mmo", "mmofps", "mmorts", "mmotps", "moba", "pvp", "social"];
        const POVArray = ["2d", "3d", "first-person", "side-scroller", "third-person", "top-down"];
        const randomCategoryArray = ["anime", "horror", "military", "permadeath", "pixel", "pve", "superhero", "tank", "tower-defense", "voxel"];
        
        setMainCategoryCheckboxes(generateCheckboxes(mainCategoryArray));
        setTypesCategoryCheckboxes(generateCheckboxes(typesCategoryArray));
        setMultiplayerCategoryCheckboxes(generateCheckboxes(multiplayerCategoryArray));
        setPOVCategoryCheckboxes(generateCheckboxes(POVArray));
        setRandomCategoryCheckboxes(generateCheckboxes(randomCategoryArray));
    }, []);

    return (
        <div>
            <form onSubmit={fetchWithCheckBoxAndSearchBar}>
                <div>
                    <input
                        ref={searchBarForGameRef}
                        type="text"
                        id="search-bar-for-game"
                        placeholder="Search for a game..."
                        onChange={getGameByNameDebounce}
                    />
                </div>
                <div>
                    <ul>{mainCategoryCheckboxes}</ul>
                    <ul>{typesCategoryCheckboxes}</ul>
                    <ul>{multiplayerCategoryCheckboxes}</ul>
                    <ul>{POVCategoryCheckboxes}</ul>
                    <ul>{randomCategoryCheckboxes}</ul>
                </div>
                <button type="submit">Search</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
            <div ref={APIResponseTestSectionRef}>
                {games.length > 0 ? (
                    games.map(game => (
                        <div key={game.id}>
                            <h2>{game.title}</h2>
                            <img src={game.thumbnail} alt={game.title} />
                            <p>{game.short_description}</p>
                        </div>
                    ))
                ) : (
                    <p>No games found for the selected categories.</p>
                )}
            </div>
        </div>
    );    
}