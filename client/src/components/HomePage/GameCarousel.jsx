import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

function GameCarousel({ games, heading, handleGameClick }) {
    return (
        <section>
            <h2 className="featured-games-card-heading">{heading}</h2>
            <div className="featured-games-card">
                <Carousel interval={null} indicators={false}>
                    {games.map((game, index) => (
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
        </section>
    );
}

export default GameCarousel;
