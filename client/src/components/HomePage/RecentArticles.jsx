import React, { useEffect, useState } from "react";
import axios from "axios";
import { loremIpsum } from "lorem-ipsum";

const RecentArticles = () => {
    const [games, setGames] = useState([]);
    const [clickedGame, setClickedGame] = useState(null);
    const [gameDescriptions, setGameDescriptions] = useState([]);
    const [articleTitlesIndex, setArticleTitlesIndex] = useState([]);
    const apiKey = process.env.REACT_APP_RAPID_GAMES_API_KEY;

    useEffect(() => {
        const articleTitles = ["Having trouble beating the final boss?", "How to pass level 4: A guide", "Mastering the art of strategy", "Becoming an unbeatable gamer", "Exploring the open world", "Surviving the hardest levels", "Unlocking secret game features", "Finding all hidden treasures", "How to conquer multiplayer mode", "The best weapon upgrades", "Creating unbeatable game strategies", "The secret to high scores", "Powering through challenging quests", "Essential tips for beginners", "Advanced tactics for experienced gamers", "Ultimate guide to side quests", "The hidden lore of the game world", "Improving your reaction times", "Becoming a pro at puzzle solving", "Mastering the hardest boss fights"];

        const sortedArticleTitles = articleTitles.sort(() => Math.random() - 0.5);
        setArticleTitlesIndex(sortedArticleTitles);

        const descriptions = new Array(3).fill(0).map(
            () =>
                loremIpsum({
                    count: 1,
                    format: "plain",
                    units: "paragraphs",
                    paragraphLowerBound: 3,
                    paragraphUpperBound: 5,
                    sentenceLowerBound: 5,
                    sentenceUpperBound: 15,
                    random: Math.random,
                }).slice(0, 200) + "..."
        );
        setGameDescriptions(descriptions);
    }, []);

    useEffect(() => {
        const options = {
            method: "GET",
            url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
        };

        const fetchGames = async () => {
            try {
                const response = await axios.request(options);
                const games = response.data;
                const selectedGames = games.sort(() => 0.5 - Math.random()).slice(0, 3);
                setGames(selectedGames);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
    }, [apiKey]);

    return (
        <section style={{ marginTop: "3rem" }} aria-labelledby="recent-articles-heading">
            <h2 id="recent-articles-heading" style={{ color: "var(--grey)" }}>
                Recent Articles
            </h2>
            <div className="articles-card-container" role="list">
                {games.length > 0 ? (
                    games.map((game, index) => {
                        return (
                            <div className="articles-card" key={game.id} onClick={() => setClickedGame(clickedGame === game.id ? null : game.id)} role="listitem" aria-labelledby={`game-title-${index}`} aria-describedby={`game-description-${index}`}>
                                <h3 id={`game-title-${index}`} className="articles-card-heading">
                                    {game.title}
                                </h3>
                                <img src={game.thumbnail} alt={game.title} className="articles-card-image" />
                                <h4 className="articles-card-subheading">{articleTitlesIndex[index]}</h4>
                                <p className="articles-card-description">{gameDescriptions[index]}</p>
                                {clickedGame === game.id && <p className="articles-card-additional-text">In a fully developed application, clicking this panel would lead you to the full article. This function is currently for demonstrative purposes only.</p>}
                            </div>
                        );
                    })
                ) : (
                    <p id="no-games-message"></p>
                )}
            </div>
        </section>
    );
};

export default RecentArticles;
