import React, { useContext, useEffect } from 'react';
import { GameContext } from '../contexts/GameContext';
import { useParams, Link } from 'react-router-dom';

const GameDetails = () => {
    const { gameData, fetchGameById } = useContext(GameContext);
    const { gameId } = useParams();

    useEffect(() => {
        fetchGameById(gameId);
    }, [gameId, fetchGameById]);

    return (
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
            <div>
                <h1>{gameData.title}</h1>
                <img src={gameData.thumbnail} alt={gameData.title} />
                <p>Developer: {gameData.developer}</p>
                <p>Genre: {gameData.genre}</p>
                <p>Platform: {gameData.platform}</p>
                <p>Publisher: {gameData.publisher}</p>
                <p>Release Date: {gameData.release_date}</p>
                <p>Description: {gameData.short_description}</p>
                <a href={gameData.game_url}>Play Now</a>
            </div>

            <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <Link to={`/games/${gameId}/Strategy-and-Tips`}>Strategy and Tips</Link>

                <Link to={`/games/${gameId}/Reviews-and-Opinions`}>Reviews and Opinions</Link>

                <Link to={`/games/${gameId}/Bugs-and-Glitches`}>Bugs and Glitches</Link>

                <Link to={`/games/${gameId}/Updates-Patches-DLCs`}>Updates, Patches, DLC's</Link>

                <Link to={`/games/${gameId}/Meetups`}>Meetups</Link>
            </div>
        </div>
    );
}

export default GameDetails;
