import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import axios from "axios";


const HomePage = () => {
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        console.log(user);
    }, [user]);

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
            console.log("Error fetching posts")
        });
    }, []);

    return (
        <>
            <h1>Home Page</h1>

            {!user ? (
                <p>The user is not logged in.</p>
            ) : (
                <>
                    <p>The user is logged in.</p>
                    <Link to="/test">Go to Test Component</Link>
                </>
            )}

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
        </>
    )
}

export default HomePage