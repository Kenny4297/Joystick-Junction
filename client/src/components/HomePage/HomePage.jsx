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
        <>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center", marginBottom: "1rem" }}>
                <h1 style={{ fontSize: "3.5rem" }}>Joystick Junction</h1>
                <p style={{ fontSize: "1.5rem", color: "var(--grey)" }}>Discover, Collaborate, Dominate</p>
                <p style={{ fontSize: "1.2rem", width: "30rem", color: "var(--blue)" }}>Joystick Junction is your one-stop hub for all things gaming. Whether you're a casual player or a hardcore gamer, there's something here for everyone!</p>
            </div>

            <div className="call-to-action-button-container">
                <Link to="/browse" className="call-to-action-button" as="button">
                    Find your favorite game!
                </Link>
            </div>

            <FeaturedGamesCarousel />

            <RecentArticles />
        </>
    );
};

export default HomePage;
