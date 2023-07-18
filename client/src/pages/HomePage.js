import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import FeaturedGamesCarousel from "../components/FeaturedGamesCarousel";
import RecentArticles from "../components/RecentArticles";
import axios from "axios";
import {
    Navbar,
    Nav
} from "react-bootstrap";
import Footer from '../components/Footer'

const HomePage = () => {
    const [user, setUser] = useContext(UserContext);



    useEffect(() => {
        if (user && user.id) {
        console.log(user);
        console.log(user.id)
        }
    }, [user])

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        console.log("Use effect for getting all posts firing")
        axios.get('/api/posts/')
        .then((response) => {
            setPosts(response.data);
            console.log("Response data for all posts", response.data)
        })
        .catch((error) => {
            console.error(`There was an error retrieving the posts: ${error}`);
            if (error.response && error.response.status === 404) {
                console.error(`No posts found`);
                setPosts([]);
            }
        });
    }, []);
    

    return (
        <>
        {/* <div style={{display:'flex', justifyContent:'center', gap: '3rem'}}>
            <div style={{marginBottom:'4rem'}}>
                <h1>Joystick Junction</h1>
                <p>Discover, Collaborate, Dominate</p>
            </div>

            <div>
                <p>Joystick Junction is your one-stop hub for all things gaming. Whether you're a casual player or a hardcore gamer, there's something here for everyone!</p>
            </div>

            <div className=".call-to-action-button-container">
                <button  className="call-to-action-button" as={Link} to="/browse">
                    Find your favorite game!
                </button>
            </div>
        </div> */}
            <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign: 'center',marginBottom:'4rem'}}>
                <h1 style={{fontSize:'3.5rem'}}>Joystick Junction</h1>
                <p style={{fontSize:'1.5rem', color: 'var(--grey)'}}>Discover, Collaborate, Dominate</p>
                <p style={{fontSize:'1.2rem',width:'30rem', color:'var(--blue)'}}>Joystick Junction is your one-stop hub for all things gaming. Whether you're a casual player or a hardcore gamer, there's something here for everyone!</p>
            </div>
        



        <div className="call-to-action-button-container">
            <Link to="/browse" className="call-to-action-button" as="button">
                Find your favorite game!
            </Link>
        </div>

        <FeaturedGamesCarousel />

        <RecentArticles />
        </>
    )
}

export default HomePage