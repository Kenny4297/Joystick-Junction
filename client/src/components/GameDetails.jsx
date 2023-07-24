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
        <section className="games-details-section" aria-label="game-details-section">
            <div className="game-details-game-description" aria-label="game-description">
                <div className="game-details-game-title-and-image" aria-labelledby="game-title">
                    <h1 id="game-title">{gameData.title}</h1>
                    <img src={gameData.thumbnail} alt={gameData.title} />
                </div>

                <div className="game-details-game-details" aria-label="game-details">
                    <p>Developer: {gameData.developer}</p>
                    <p>Genre: {gameData.genre}</p>
                    <p>{gameData.platform}</p>
                    <p>Publisher: {gameData.publisher}</p>
                    <p>Release Date: {gameData.release_date}</p>
                    <p>{gameData.short_description}</p>
                    <a href={gameData.game_url} aria-label="play-now">
                        Play Now!
                    </a>
                </div>
            </div>

            <div className="game-details-categories-selection" aria-label="categories-selection">
                <Link className="button-link" to={`/games/${gameId}/Strategy-and-Tips`}  aria-label="strategy-and-tips">
                    Strategy and Tips
                </Link>
                <Link className="button-link" to={`/games/${gameId}/Reviews-and-Opinions`} aria-label="reviews-and-opinions">
                    Reviews and Opinions
                </Link>
                <Link className="button-link" to={`/games/${gameId}/Bugs-and-Glitches`} aria-label="bugs-and-glitches">
                    Bugs and Glitches
                </Link>
                <Link className="button-link" to={`/games/${gameId}/Updates-Patches-DLCs`} aria-label="updates-patches-dlcs">
                    Updates, Patches, DLC's
                </Link>
                <Link className="button-link" to={`/games/${gameId}/Meetups`} aria-label="meetups">
                    Meetups
                </Link>
            </div>
        </section>
    );
};

export default GameDetails;
