import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import FeaturedGamesCarousel from "./FeaturedGamesCarousel";
import RecentArticles from "./RecentArticles";

const HomePage = () => {
    const [user] = useContext(UserContext);

    useEffect(() => {
        if (user && user.id) {
            console.log(user);
            console.log(user.id);
        }
    }, [user]);

    return (
        <section>
            <div className="homepage-introduction-section">
                <h1>Joystick Junction</h1>
                <p>Discover, Collaborate, Dominate</p>
                <p>Joystick Junction is your one-stop hub for all things gaming. Whether you're a casual player or a hardcore gamer, there's something here for everyone!</p>
            </div>

            <div className="call-to-action-button-container">
                <Link to="/browse" className="call-to-action-button" as="button">
                    Find your favorite game!
                </Link>
            </div>

            <FeaturedGamesCarousel />

            <RecentArticles />
        </section>
    );
};

export default HomePage;
