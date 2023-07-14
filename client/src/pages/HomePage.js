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
        <div style={{display:'flex', justifyContent:'space-between'}}>
            <div style={{marginLeft:'3rem', marginBottom:'4rem'}}>
                <h1>Joystick Junction</h1>
                <p>Discover, Collaborate, Dominate</p>
            </div>

            <div style={{marginRight:'5rem', border:'2px solid red', bottom:'10rem'}}>
                <Nav.Link style={{top: '2rem', position:'relative', fontSize:'2.5rem'}} href="/browse">Find your favorite game!</Nav.Link>
            </div>
        </div>
        <FeaturedGamesCarousel />

        <RecentArticles />
        

        {!user ? (
            <p>The user is not logged in.</p>
        ) : (
            <>
                <p>The user is logged in.</p>
                <Link to="/test">Go to Test Component</Link>
            </>
        )}

        <Link className="header-links" to="/signUp">SignUp</Link>

        <p>Testing displaying all posts</p>

        <div style={{display:'flex', flexDirection:'column'}}>
            <Link to="/browseBySearch">Browse by search test</Link>
            <Link to="/browseByCheckboxes">Browse by checkboxes test</Link>
            <Link to="/discover">Discover Component test</Link>
        </div>


        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <h2>{post.post_title}</h2>
                    <h3>{post.user_id}</h3>
                    <p>{post.post_content}</p>
                </div>
            ))}
        </div>

        {/* <Footer /> */}
        </>
    )
}

export default HomePage