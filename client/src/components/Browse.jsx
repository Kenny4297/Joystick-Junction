import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GameContext } from '../contexts/GameContext';

const Browse = () => {
    const [games, setGames] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [mainCategoryCheckboxes, setMainCategoryCheckboxes] = useState([]);
    const [typesCategoryCheckboxes, setTypesCategoryCheckboxes] = useState([]);
    const [multiplayerCategoryCheckboxes, setMultiplayerCategoryCheckboxes] = useState([]);
    const [POVCategoryCheckboxes, setPOVCategoryCheckboxes] = useState([]);
    const [randomCategoryCheckboxes, setRandomCategoryCheckboxes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const { setGameData } = useContext(GameContext);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [isSearchMade, setIsSearchMade] = useState(false);
    const [isSearchingByCategories, setIsSearchingByCategories] = useState(false);
    const noGamesFound = isButtonClicked && games.length === 0;
    const [noGamesFoundMessage, setNoGamesFoundMessage] = useState('');
    const [hasSearched, setHasSearched] = useState(false);



    const [searchInput, setSearchInput] = useState('');

    const resetSearch = () => {
        setSearchInput('');
        setGames([]);
        setNoGamesFoundMessage('');
        setIsButtonClicked(false);
        setHasSearched(false);
        setIsSearchingByCategories(false); // Reset the flag for category search
        setSelectedCategories([]); // Clear any selected categories
    };
    
    
       

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

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchInput && !isSearchingByCategories) {
                setIsLoading(true);
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
                    const filteredGames = games.filter(game => game.title.toLowerCase().includes(searchInput.toLowerCase()));
                    
                    setGames(filteredGames);
                    setIsButtonClicked(true);
                    setIsLoading(false);
                    setIsSearchMade(true);
                    setHasSearched(true);
                } catch (error) {
                    console.error(error);
                    setIsLoading(false);
                }
            }
        }, 500);
    
        return () => clearTimeout(timeoutId);
    }, [searchInput]);
    
    
    const fetchGamesByName = (event) => {
        event.preventDefault();
        setIsLoading(true);
        setSearchInput(searchInput);
        setIsFirstVisit(false);
        setHasSearched(true);
        setIsSearchingByCategories(false);
    };

    const fetchGamesByCategories = async (event) => {
        event.preventDefault();
        if (selectedCategories.length === 0) {
            setNoGamesFoundMessage('Please select at least one category.');
            return;
        }
    
        setIsFirstVisit(false); 
        setHasSearched(true);
        setIsButtonClicked(true);
        setIsSearchingByCategories(true);
    
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
    
            if (data.length === 0) {
                return;
            }
    
            setGameData(data);
            setGames(data);
            setIsButtonClicked(true);
            setHasSearched(true);
            console.log(data)
        } catch (error) {
            console.error('Failed to fetch games:', error);
        }
    };
    
    

    const handleCheckboxChange = (event) => {
        setErrorMessage('');
        setSelectedCategories((prevSelectedCategories) => {
            if (event.target.checked) {
                return [...prevSelectedCategories, event.target.value];
            } else {
                return prevSelectedCategories.filter(category => category !== event.target.value);
            }
        });
    };
    

    const generateCheckboxes = (categoryArray) => {
        return categoryArray.map((genre, index) => (
            <li key={index}>
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
            </li>
        ));
    };

    const handleGameClick = (game) => {
        setGameData(game);
    }

    return (
        <>
        <div>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems:'center', marginTop:'4rem'}}>
                <h2>Search for a game by its title.</h2>
                <form onSubmit={fetchGamesByName}>
                    <input
                        type="text"
                        value={searchInput}
                        onChange={event => setSearchInput(event.target.value)}
                        style={{textAlign: 'center', marginBottom:'2rem', marginTop:'1rem'}}
                    />
                </form>
                {hasSearched && <button className="reset-search-button" onClick={resetSearch}>Reset Search</button>}
            </div>
            {noGamesFoundMessage && (
                <p>{noGamesFoundMessage}</p>
            )}
    
            {!searchInput.length && (
                <>
                    <h3 style={{textAlign:'center'}}>Or</h3>
                    <div style={{textAlign:'center'}}>
                        <h2 style={{textAlign:'center', marginTop:'3rem'}}>Tailor Your Exploration!</h2>
                        <p style={{textAlign:'center', color:'var(--blue)'}}>Select any combination of categories you want in your ideal game!</p>
                        <form onSubmit={fetchGamesByCategories}>
                            {!isButtonClicked && <button type="submit" disabled={selectedCategories.length === 0} className='search-button' style={{marginBottom:'1rem'}} >Search</button>}
                        </form>
                        {isButtonClicked && selectedCategories.length > 0 && (
                            <>
                            <h3>Selected Categories:</h3>
                            <ul style={{listStyleType:'none', color:'var(--blue)'}}>
                                {selectedCategories.map((category, index) => (
                                    <li key={index}>{category}</li>
                                ))}
                            </ul>
                            </>
                        )}
                    </div>
                </>
            )}
        <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))',
    justifyContent: 'center',
    gap: '1rem'
}}>
    {games.length > 0 ? (
        games.map(game => {
            const gameDescription = game.short_description.length > 100 
                ? game.short_description.slice(0, 100) + '...' 
                : game.short_description;
            return (
                <Link key={game.id} to={`/game/${game.id}`} style={{ textDecoration: 'none', }} onClick={() => handleGameClick(game)}>
                    <div style={{
                        position: 'relative',
                        margin: '0 auto',
                        border: '0.125rem solid grey',
                        boxShadow: '0.3125rem 0.3125rem 0.625rem rgba(0,0,0,0.15)',
                        backgroundColor: 'steelblue',
                        padding: '1rem',
                        maxWidth:'30rem',
                        maxHeight:'30rem',
                        height:'25rem',
                        width:'20rem'
                    }}>
                        <h2>{game.title}</h2>
                        <img src={game.thumbnail} alt={game.title} style={{width:'100%'}} />
                        <p style={{color: 'black'}}>{gameDescription}</p>
                    </div>
                </Link>
            );
        })
    ) : (
        isSearchingByCategories && (
            <p>No games found for the selected categories.</p>
        )
    )}
</div>
        {!isButtonClicked && !isLoading && !games.length && (
            <div style={{display: 'flex', marginRight: '20px', width:'100%', flexWrap: 'wrap'}}>
            <form onSubmit={fetchGamesByCategories} style={{width:'100%', display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', border:'2px solid var(--blue)', width:'fit-content', alignItems:'flex-start', padding:'1rem'}}>
                
                    <div style={{flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                        <h4>Main Categories</h4>
                        <ul style={{listStyleType:'none'}}>{mainCategoryCheckboxes}</ul>
                    </div>
                
                    <div style={{flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                        <h4>Game Types</h4>
                        <ul style={{columns: 2, columnGap:'2rem', listStyleType:'none'}}>{typesCategoryCheckboxes}</ul>
                    </div>
                
                    <div style={{flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                        <h4>Multiplayer</h4>
                        <ul style={{listStyleType:'none'}}>{multiplayerCategoryCheckboxes}</ul>
                    </div>
                
                    <div style={{flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                        <h4>POV</h4>
                        <ul style={{listStyleType:'none'}}>{POVCategoryCheckboxes}</ul>
                    </div>
                
                    <div style={{flex: '1 0 auto', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                        <h4>Random</h4>
                        <ul style={{listStyleType:'none'}}>{randomCategoryCheckboxes}</ul>
                    </div>
                
                </div>
            </form>
        </div>
        )}
    </div>
    </>
);

    
    
    
    
    
    
};

export default Browse;
