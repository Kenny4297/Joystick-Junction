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
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
            <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly" }}>
                <div style={{ display: "flex", flexDirection: "column", paddingTop: "3rem" }}>
                    <h1 style={{ color: "var(--white)", textAlign: "center" }}>{gameData.title}</h1>
                    <img src={gameData.thumbnail} alt={gameData.title} />
                </div>

                <div
                    style={{
                        textAlign: "center",
                        padding: "2rem",
                        width: "30%",
                        border: "0.125rem solid #93989F",
                        minWidth: "20rem",
                        maxWidth: "20rem",
                        boxShadow: "0.5rem 0.5rem 1rem rgba(0,0,0,0.3)",
                        backgroundColor: "#404040",
                        position: "relative",
                        height: "auto",
                    }}
                >
                    <p style={{ color: "#F8F9FA" }}>Developer: {gameData.developer}</p>
                    <p style={{ color: "#F8F9FA" }}>Genre: {gameData.genre}</p>
                    <p style={{ color: "#F8F9FA" }}>{gameData.platform}</p>
                    <p style={{ color: "#F8F9FA" }}>Publisher: {gameData.publisher}</p>
                    <p style={{ color: "#F8F9FA" }}>Release Date: {gameData.release_date}</p>
                    <p style={{ color: "#F8F9FA" }}>{gameData.short_description}</p>
                    <a style={{ color: "#17A2B8" }} href={gameData.game_url}>
                        Play Now!
                    </a>
                </div>
            </div>

            <div style={{ display: "flex", width: "100%", justifyContent: "space-evenly", paddingBottom: "5rem", paddingTop: "2rem" }}>
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
        </div>
    );
};

export default GameDetails;
