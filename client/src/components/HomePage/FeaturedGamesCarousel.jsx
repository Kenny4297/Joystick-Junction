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

    const { setGameData } = useContext(GameContext);

    useEffect(() => {
        const options = {
            method: "GET",
            url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
            headers: {
                "X-RapidAPI-Key": "5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
        };

        const fetchGames = async () => {
            try {
                const response = await axios.request(options);
                const games = response.data;
                const shuffledGames = games.sort(() => 0.5 - Math.random());
                setFeaturedGames(shuffledGames.slice(0, 16));
                setHotGames(shuffledGames.slice(5, 10));
                setLovedGames(shuffledGames.slice(10, 15));
            } catch (error) {
                console.error("There was an error retrieving the games:", error);
            }
        };

        fetchGames();
    }, []);

    const handleGameClick = (game) => {
        if (user !== null && user.id !== null) {
            setGameData(game);
            navigate(`/game/${game.id}`);
        } else {
            navigate("/signup", { state: { from: `/game/${game.id}` } });
        }
    };

    return (
        <section className="featured-games-card-container">
            <GameCarousel games={featuredGames} heading="Featured Games" handleGameClick={handleGameClick} />
            <GameCarousel games={hotGames} heading="What's Hot" handleGameClick={handleGameClick} />
            <GameCarousel games={lovedGames} heading="Gotta Love It" handleGameClick={handleGameClick} />
        </section>
    );
}

export default FeaturedGamesCarousel;
