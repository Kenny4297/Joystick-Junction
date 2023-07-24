import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function GameCarousel({ games, heading, handleGameClick }) {
    return (
        <section style={{border:'2px solid blue'}}>
            <h2 id="featured-games-header" className="featured-games-card-heading">{heading}</h2>
                <div aria-labelledby="featured-games-header" className="featured-games-card">
                    <Carousel interval={null} indicators={false}>
                        {games.map((game, index) => (
                            <Carousel.Item
                                key={index}
                                onClick={() => handleGameClick(game)}
                                className="featured-games-carousel"
                                aria-labelledby={`featured-game-${index}-title`} aria-describedby={`featured-game-${index}-description`}
                            >
                                <div>
                                    <img
                                        src={game.thumbnail}
                                        alt={game.title}
                                        className="featured-games-carousel-image"
                                    />
                                    <div style={{ flexGrow: 1 }}></div>
                                    <Carousel.Caption className="featured-games-carousel-caption">
                                        <h3 id={`featured-game-${index}-title`}>{game.title}</h3>
                                        <p id={`featured-game-${index}-description`}>
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
        </section>
    );
}

export default GameCarousel;
