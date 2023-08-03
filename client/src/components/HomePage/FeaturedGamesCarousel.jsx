import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../../contexts/GameContext";
import { UserContext } from "../../contexts/UserContext";
import GameCarousel from "./GameCarousel";

function FeaturedGamesCarousel() {
    const [featuredGames, setFeaturedGames] = useState([]);
    const [hotGames, setHotGames] = useState([]);
    const [lovedGames, setLovedGames] = useState([]);
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
    const apiKey = process.env.REACT_APP_RAPID_GAMES_API_KEY;

    const { setGameData } = useContext(GameContext);

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
                const shuffledGames = games.sort(() => 0.5 - Math.random());
                setFeaturedGames(shuffledGames.slice(0, 16));
                setHotGames(shuffledGames.slice(16, 32));
                setLovedGames(shuffledGames.slice(32, 48));
            } catch (error) {
                console.error("There was an error retrieving the games:", error);
            }
        };

        fetchGames();
    }, [apiKey]);

    const handleGameClick = (game) => {
        if (user !== null && user.id !== null) {
            setGameData(game);
            navigate(`/game/${game.id}`);
        } else {
            navigate("/login", { state: { from: `/game/${game.id}` } });
        }
    };

    return (
        <section className="featured-games-card-container">
            <GameCarousel games={featuredGames} heading="Featured Games" handleGameClick={handleGameClick} />
            <GameCarousel games={hotGames} heading="Trending" handleGameClick={handleGameClick} />
            <GameCarousel games={lovedGames} heading="Highest Rated" handleGameClick={handleGameClick} />
        </section>
    );
}

export default FeaturedGamesCarousel;
