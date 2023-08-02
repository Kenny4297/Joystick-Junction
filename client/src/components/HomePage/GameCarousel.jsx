import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function chunkArray(array, chunk_size){
    let results = [];
    for(let i = 0; i < array.length; i += chunk_size){
        results.push(array.slice(i, i + chunk_size));
    }
    console.log("Number of chunks: " + results.length);
    results.forEach((chunk, index) => {
        console.log(`Chunk ${index}: ${chunk.length} items`);
    });
    return results;
}

function GameCarousel({ games, heading, handleGameClick }) {
    const [gamesInChunks, setGamesInChunks] = useState([]);

    useEffect(() => {
        console.log("Number of games: " + games.length);
        setGamesInChunks(chunkArray([...games], 4));
    }, [games]);

    return (
        <section>
            <h2 id="featured-games-header" className="featured-games-card-heading">
                {heading}
            </h2>
            <div aria-labelledby="featured-games-header" className="featured-games-card">
                <Carousel interval={null} indicators={false}>
                    {gamesInChunks.map((chunk, chunkIndex) => (
                        <Carousel.Item key={`chunk-${chunkIndex}`} className="featured-games-carousel">
                            <div className="carousel-item-content" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {chunk.map((game, gameIndex) => {
                                    const overallIndex = chunkIndex * 4 + gameIndex;
                                    return (
                                        <div key={overallIndex} onClick={() => handleGameClick(game)} aria-labelledby={`featured-game-${overallIndex}-title`} aria-describedby={`featured-game-${overallIndex}-description`} className="carousel-individual-item" style={{ flex: 1, margin: '10px' }}>
                                            <img src={game.thumbnail} alt={game.title} className="featured-games-carousel-image" style={{ width: '100%' }}/>
                                            <Carousel.Caption className="featured-games-carousel-caption">
                                                <h3 id={`featured-game-${overallIndex}-title`}>{game.title}</h3>
                                                <p id={`featured-game-${overallIndex}-description`}>{game.short_description.length > 250 ? `${game.short_description.substring(0, 250)}...` : game.short_description}</p>
                                            </Carousel.Caption>
                                        </div>
                                    );
                                })}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </section>
    );
}

export default GameCarousel;
