import React, { useState, useEffect } from "react";

const GameCarousel = () => {
    const [games, setGames] = useState([]);
    const options = {
        method: "GET",
        headers: {
            "X-RapidAPI-Key":
                "5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
    };
    const apiurl =
        "https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date";

    useEffect(() => {
        const fetchGames = async () => {
            const response = await fetch(apiurl, options);
            const data = await response.json();
            setGames(data.slice(0, 3));
        };

        fetchGames();
    }, []); 

    return (
        <div>
            {games.map((game, index) => (
                <div id={`carousel-item-${index + 1}`} key={game.id}>
                    <div className="row">
                        <div className="col-9 mr-0 pr-0">
                            <img
                                className="d-block image"
                                src={game.thumbnail}
                                alt="game"
                            />
                        </div>
                        <div className="mx-0 my-0 words col-3">
                            <h1>{game.title}</h1>
                            <h2>{game.short_description}</h2>
                            <p>developer: {game.developer}</p>
                            <p>genre: {game.genre}</p>
                            <p>platform: {game.platform}</p>
                            <a className="game-site" href={game.game_url}>
                                Game Website
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default GameCarousel;
