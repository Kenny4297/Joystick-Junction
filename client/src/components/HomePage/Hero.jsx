import React from 'react';
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className="hero-container">
            <div className="hero-content-container">
                <div className="homepage-introduction-section">
                    <h1 id="homepage-introduction-heading">Joystick Junction</h1>
                    <p id="homepage-introduction-tagline">Discover, Collaborate, Dominate</p>
                    <p className="homepage-introduction-description" id="homepage-introduction-description">
                        Joystick Junction is your one-stop hub for all things gaming. Whether you're a casual player or a hardcore gamer, there's something here for everyone!
                    </p>
                </div>

                <div className="call-to-action-button-container">
                    <Link to="/browse" className="call-to-action-button" as="button" aria-labelledby="homepage-introduction-heading" aria-describedby="homepage-introduction-tagline homepage-introduction-description">
                        Find your favorite game!
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Hero;