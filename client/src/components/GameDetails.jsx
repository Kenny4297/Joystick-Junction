import React, { useContext, useEffect } from "react";
import { GameContext } from "../contexts/GameContext";
import { useParams, Link } from "react-router-dom";

const GameDetails = () => {
    const { gameData, fetchGameById } = useContext(GameContext);
    const { gameId } = useParams();

    useEffect(() => {
        fetchGameById(gameId);
    }, [gameId, fetchGameById]);

    return (
        <section className="games-details-section">
            <div className="game-details-game-description">
                <div className="game-details-game-title-and-image">
                    <h1>{gameData.title}</h1>
                    <img src={gameData.thumbnail} alt={gameData.title} />
                </div>

                <div className="game-details-game-details">
                    <p>Developer: {gameData.developer}</p>
                    <p>Genre: {gameData.genre}</p>
                    <p>{gameData.platform}</p>
                    <p>Publisher: {gameData.publisher}</p>
                    <p>Release Date: {gameData.release_date}</p>
                    <p>{gameData.short_description}</p>
                    <a href={gameData.game_url}>
                        Play Now!
                    </a>
                </div>
            </div>

            <div className="game-details-categories-selection">
                <Link className="button-link" to={`/games/${gameId}/Strategy-and-Tips`}>
                    Strategy and Tips
                </Link>
                <Link className="button-link" to={`/games/${gameId}/Reviews-and-Opinions`}>
                    Reviews and Opinions
                </Link>
                <Link className="button-link" to={`/games/${gameId}/Bugs-and-Glitches`}>
                    Bugs and Glitches
                </Link>
                <Link className="button-link" to={`/games/${gameId}/Updates-Patches-DLCs`}>
                    Updates, Patches, DLC's
                </Link>
                <Link className="button-link" to={`/games/${gameId}/Meetups`}>
                    Meetups
                </Link>
            </div>
        </section>
    );
};

export default GameDetails;
