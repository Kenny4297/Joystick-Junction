import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { GameContext } from "../contexts/GameContext";
import { rightArrow } from './Assets/Images/rightArrow.png'

//! Combine and add CSS. D.R.Y!

function FeaturedGamesCarousel() {
    const [featuredGames, setFeaturedGames] = useState([]);
    const [hotGames, setHotGames] = useState([]);
    const [lovedGames, setLovedGames] = useState([]);
    const navigate = useNavigate();

    const { setGameData } = useContext(GameContext);

    useEffect(() => {
        const options = {
            method: "GET",
            url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
            headers: {
                "X-RapidAPI-Key":
                    "5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924",
                "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
            },
        };

        const fetchGames = async () => {
            try {
                const response = await axios.request(options);
                const games = response.data;
                const shuffledGames = games.sort(() => 0.5 - Math.random());
                setFeaturedGames(shuffledGames.slice(0, 5));
                setHotGames(shuffledGames.slice(5, 10));
                setLovedGames(shuffledGames.slice(10, 15));
            } catch (error) {
                console.error(
                    "There was an error retrieving the games:",
                    error
                );
            }
        };

        fetchGames();
    }, []);

    const handleGameClick = (game) => {
        setGameData(game);
        navigate(`/game/${game.id}`);
    };

    return (
        <div className="featured-games-card-container">
            <div>
                <h2 className="featured-games-card-heading">Featured Games</h2>
                <div className="featured-games-card">
                    <Carousel interval={null} indicators={false}>
                        {featuredGames.map((game, index) => (
                            <Carousel.Item
                                key={index}
                                onClick={() => handleGameClick(game)}
                                className="featured-games-carousel"
                            >
                                <div>
                                    <img
                                        src={game.thumbnail}
                                        alt={game.title}
                                        className="featured-games-carousel-image"
                                    />
                                    <div style={{ flexGrow: 1 }}></div>
                                    <Carousel.Caption
                                        className="featured-games-carousel-caption"
                                    >
                                        <h3>{game.title}</h3>
                                        <p>
                                            {
                                            game.short_description.length > 250 
                                                ? `${game.short_description.substring(0, 250)}...` 
                                                : game.short_description
                                            }
                                        </p>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
            
            <div>
                <h2 className="featured-games-card-heading">What's Hot</h2>
                <div className="featured-games-card">
                    <Carousel interval={null} indicators={false}>
                        {hotGames.map((game, index) => (
                            <Carousel.Item
                                key={index}
                                onClick={() => handleGameClick(game)}
                                className="featured-games-carousel"
                            >
                                <div>
                                    <img
                                        src={game.thumbnail}
                                        alt={game.title}
                                        className="featured-games-carousel-image"
                                    />
                                    <div style={{ flexGrow: 1 }}></div>
                                    <Carousel.Caption className="featured-games-carousel-caption">
                                        <h3>{game.title}</h3>
                                        <p>
                                            {
                                            game.short_description.length > 250 
                                                ? `${game.short_description.substring(0, 250)}...` 
                                                : game.short_description
                                            }
                                        </p>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
    
            <div>
                <h2 className="featured-games-card-heading">Gotta Love It</h2>
                <div className="featured-games-card">
                    <Carousel interval={null} indicators={false}>
                        {lovedGames.map((game, index) => (
                            <Carousel.Item
                                key={index}
                                onClick={() => handleGameClick(game)}
                                className="featured-games-carousel"
                            >
                                <div>
                                    <img
                                        src={game.thumbnail}
                                        alt={game.title}
                                        className="featured-games-carousel-image"
                                    />
                                    <div style={{ flexGrow: 1 }}></div>
                                    <Carousel.Caption className="featured-games-carousel-caption">
                                        <h3>{game.title}</h3>
                                        <p>
                                            {
                                            game.short_description.length > 250 
                                                ? `${game.short_description.substring(0, 250)}...` 
                                                : game.short_description
                                            }
                                        </p>
                                    </Carousel.Caption>
                                </div>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
    
}

export default FeaturedGamesCarousel;
