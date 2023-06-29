import React, { useContext, useEffect } from 'react';
import { GameContext } from '../../contexts/GameContext';
import { useParams } from 'react-router-dom';

const GameCategoriesPage = () => {
    const { gameData, fetchGameById } = useContext(GameContext);
    const { gameId, categoryPage } = useParams();

    useEffect(() => {
        fetchGameById(gameId);
    }, [gameId, fetchGameById]);

    return (
        <div>
            <h2>{categoryPage.charAt(0).toUpperCase() + categoryPage.slice(1)}</h2>
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
    );
}

export default GameCategoriesPage;
