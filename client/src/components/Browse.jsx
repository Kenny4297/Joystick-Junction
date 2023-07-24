import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { UserContext } from "../contexts/UserContext";

const Browse = () => {
    const [games, setGames] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [mainCategoryCheckboxes, setMainCategoryCheckboxes] = useState([]);
    const [typesCategoryCheckboxes, setTypesCategoryCheckboxes] = useState([]);
    const [multiplayerCategoryCheckboxes, setMultiplayerCategoryCheckboxes] = useState([]);
    const [POVCategoryCheckboxes, setPOVCategoryCheckboxes] = useState([]);
    const [randomCategoryCheckboxes, setRandomCategoryCheckboxes] = useState([]);
    const [, setErrorMessage] = useState("");
    const { setGameData } = useContext(GameContext);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [, setIsFirstVisit] = useState(true);
    const [, setIsSearchMade] = useState(false);
    const [isSearchingByCategories, setIsSearchingByCategories] = useState(false);
    const [noGamesFoundMessage, setNoGamesFoundMessage] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [user] = useContext(UserContext);
    const navigate = useNavigate();

    const [searchInput, setSearchInput] = useState("");

    const resetSearch = () => {
        setSearchInput("");
        setGames([]);
        setNoGamesFoundMessage("");
        setIsButtonClicked(false);
        setHasSearched(false);
        setIsSearchingByCategories(false);
        setSelectedCategories([]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (searchInput && !isSearchingByCategories) {
                setIsLoading(true);
                const options = {
                    method: "GET",
                    url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
                    headers: {
                        "X-RapidAPI-Key": "5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924",
                        "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
                    },
                };
                try {
                    const response = await axios.request(options);
                    const games = response.data;
                    const filteredGames = games.filter((game) => game.title.toLowerCase().includes(searchInput.toLowerCase()));

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
            setNoGamesFoundMessage("Please select at least one category.");
            return;
        }

        setIsFirstVisit(false);
        setHasSearched(true);
        setIsButtonClicked(true);
        setIsSearchingByCategories(true);

        const checkboxesAsString = selectedCategories.join(".");

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
        } catch (error) {
            console.error("Failed to fetch games:", error);
        }
    };

    const handleCheckboxChange = (event) => {
        setErrorMessage("");
        setSelectedCategories((prevSelectedCategories) => {
            if (event.target.checked) {
                return [...prevSelectedCategories, event.target.value];
            } else {
                return prevSelectedCategories.filter((category) => category !== event.target.value);
            }
        });
    };

    const generateCheckboxes = (categoryArray) => {
        return categoryArray.map((genre, index) => (
            <li key={index}>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={genre} id={genre} onChange={handleCheckboxChange} />
                    <label className="form-check-label" style={{ color: "white" }} htmlFor={genre}>
                        {genre}
                    </label>
                </div>
            </li>
        ));
    };

    const handleGameClick = (game) => {
        console.log(user);
        if (user !== null && user.id !== null) {
            setGameData(game);
            navigate(`/game/${game.id}`);
        } else {
            navigate("/signup", { state: { from: `/game/${game.id}` } });
        }
    };

    return (
        <section className="browse-heading" aria-labelledby="browse-heading">
            <h1 id="browse-heading">Browse</h1>
            <div className="browse-container" aria-labelledby="game-search-heading">
                <h2 id="game-search-heading">Search for a game by its title</h2>
                <form onSubmit={fetchGamesByName} aria-label="Game search">
                    <input type="text" className="browse-search-bar" value={searchInput} onChange={(event) => setSearchInput(event.target.value)} aria-label="Search input" />
                </form>
                {hasSearched && (
                    <button className="reset-search-button" onClick={resetSearch}>
                        Reset Search
                    </button>
                )}
            </div>
            {noGamesFoundMessage && <p>{noGamesFoundMessage}</p>}

            {!searchInput.length && (
                <section className="tailor-your-exploration-container" aria-labelledby="tailor-exploration-heading">
                    <h3>Or...</h3>
                    <section className="tailor-your-exploration-section" aria-labelledby="tailor-exploration-heading">
                        <h2>Tailor Your Exploration!</h2>
                        <p>Select any combination of categories you want in your ideal game!</p>
                        <form onSubmit={fetchGamesByCategories} aria-label="Category search">
                            {!isButtonClicked && (
                                <button type="submit" disabled={selectedCategories.length === 0} className="search-button" style={{ marginBottom: "1rem" }}>
                                    Search
                                </button>
                            )}
                        </form>
                        {isButtonClicked && selectedCategories.length > 0 && (
                            <>
                                <h3>Selected Categories:</h3>
                                <ul>
                                    {selectedCategories.map((category, index) => (
                                        <li className="selected-categories" key={index}>
                                            {category}
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </section>
                </section>
            )}
            <div className="display-games-section" role="list">
                {games.length > 0
                    ? games.map((game) => {
                          const gameDescription = game.short_description.length > 100 ? game.short_description.slice(0, 100) + "..." : game.short_description;
                          return (
                              <div key={game.id} className="individual-game-link" onClick={() => handleGameClick(game)} role="listitem" aria-labelledby={`game-title-${game.id}`} aria-describedby={`game-description-${game.id}`}>
                                  <h2 id={`game-title-${game.id}`}>{game.title}</h2>
                                  <img src={game.thumbnail} alt={game.title} style={{ width: "100%" }} />
                                  <p id={`game-description-${game.id}`}>{gameDescription}</p>
                              </div>
                          );
                      })
                    : isSearchingByCategories && <p className="no-games-checkbox-message">No games found for the selected categories. Try again!</p>}
            </div>
            {!isButtonClicked && !isLoading && !games.length && (
                <div className="checkbox-section" aria-label="Categories filter">
                    <form onSubmit={fetchGamesByCategories}>
                        <div className="individual-checkboxes-container">
                            <div className="individual-checkboxes">
                                <h4>Main Categories</h4>
                                <ul>{mainCategoryCheckboxes}</ul>
                            </div>

                            <div className="individual-checkboxes">
                                <h4>Game Types</h4>
                                <ul>{typesCategoryCheckboxes}</ul>
                            </div>

                            <div className="individual-checkboxes">
                                <h4>Multiplayer</h4>
                                <ul>{multiplayerCategoryCheckboxes}</ul>
                            </div>

                            <div className="individual-checkboxes">
                                <h4>POV</h4>
                                <ul>{POVCategoryCheckboxes}</ul>
                            </div>

                            <div className="individual-checkboxes">
                                <h4>Random</h4>
                                <ul>{randomCategoryCheckboxes}</ul>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </section>
    );
};

export default Browse;
