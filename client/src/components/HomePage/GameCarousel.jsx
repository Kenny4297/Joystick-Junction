import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function chunkArray(array, chunk_size) {
    let results = [];
    for (let i = 0; i < array.length; i += chunk_size) {
        results.push(array.slice(i, i + chunk_size));
    }
    return results;
}

function GameCarousel({ games, heading, handleGameClick }) {
    const [gamesInChunks, setGamesInChunks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);  

    useEffect(() => {
        if(games.length > 0) {
            setGamesInChunks(chunkArray([...games], 4));
            setIsLoading(false);  
        }
    }, [games]);

    useEffect(() => {
        const handleResize = () => {
            const chunkSize = window.innerWidth <= 900 ? 1 : 4;
            setGamesInChunks(chunkArray([...games], chunkSize));
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [games]);

    if (isLoading) {
        return (
            <p style={{color: 'white', textAlign:'center', marginTop:'5rem'}}>Loading...</p>
        );
    } else {
        return (
            <section className="carousel-container">
                <h2 id="featured-games-header" className="featured-games-card-heading">
                    {heading}
                </h2>
                <div aria-labelledby="featured-games-header" className="featured-games-card">
                    <Carousel interval={null} indicators={false}>
                        {gamesInChunks.map((chunk, chunkIndex) => (
                            <Carousel.Item key={`chunk-${chunkIndex}`}>
                                <div className="carousel-item-content">
                                    {chunk.map((game, gameIndex) => {
                                        const overallIndex = chunkIndex * 4 + gameIndex;
                                        return (
                                            <div key={overallIndex} onClick={() => handleGameClick(game)} aria-labelledby={`featured-game-${overallIndex}-title`} aria-describedby={`featured-game-${overallIndex}-description`} className="carousel-individual-item">
                                                <img src={game.thumbnail} alt={game.title} className="featured-games-carousel-image" />
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
}

export default GameCarousel;
