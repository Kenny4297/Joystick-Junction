import { useState, useEffect, useContext } from 'react';
import Max from '../../Assets/Images/Max.jpeg'
import Gary from '../../Assets/Images/Gary.jpg'
import Clay from '../../Assets/Images/Clay.jpeg'
import { UserContext } from '../../../contexts/UserContext';

const mockUsers = [
    { username: "Max", profileImage: Max },
    { username: "Gary", profileImage: Gary },
    { username: "Clay", profileImage: Clay },
  ];

  const mockPosts = [
    {
        user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
        post_title: "Help! I am stuck on level 4! (Solved)",
        post_content: "I can't seem to get past level 4! Any suggestions?",
        likes: 0,
        comments: [
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Flip the switch in the corner and that should open the secret passage!",
                likes: 0,
            },
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "I totally agree. This helped me get past that level too",
                likes: 0,
            },
        ],
    },
    {
        user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
        post_title: "How to defeat the boss in level 7? (Solved)",
        post_content: "I'm having a hard time defeating the boss in level 7. Any tips?",
        likes: 0,
        comments: [
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Try using the power shield and aim for its weak spot!",
                likes: 0,
            },
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Make sure to dodge its attacks and attack during cooldown periods.",
                likes: 0,
            },
        ],
    },
    {
        user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
        post_title: "Running out of health potions too fast! (Solved)",
        post_content: "Is there any way to preserve health potions?",
        likes: 0,
        comments: [
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Try to avoid unnecessary fights, and make use of your shield more often.",
                likes: 0,
            },
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Don't forget to use health regeneration artifacts if you have any.",
                likes: 0,
            },
        ],
    },
    {
        user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
        post_title: "Can't find the secret treasure in level 5? (Solved)",
        post_content: "I've heard there's a secret treasure in level 5. Where is it?",
        likes: 0,
        comments: [
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Check the northern part of the map, there should be a hidden cave.",
                likes: 0,
            },
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "You'll need the golden key to unlock the chest inside the cave.",
                likes: 0,
            },
        ],
    },
    {
        user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
        post_title: "How to improve crafting skills? (Solved)",
        post_content: "I want to craft higher level items. How can I improve my skills?",
        likes: 0,
        comments: [
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Craft as many items as you can. The more you practice, the faster you level up.",
                likes: 0,
            },
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Don't forget to read books and scrolls about crafting. They can boost your skills.",
                likes: 0,
            },
        ],
    },
    {
        user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
        post_title: "Where to find magic stones? (Solved)",
        post_content: "I need magic stones to upgrade my gear. Any known locations?",
        likes: 0,
        comments: [
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "You can mine them in the Magic Mountain. But be careful, it's full of dangerous creatures.",
                likes: 0,
            },
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Try trading with the old witch in the Enchanted Forest. She often has some.",
                likes: 0,
            },
        ],
    },
    {
        user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
        post_title: "Stuck in the puzzle in level 9!  (Solved)",
        post_content: "The puzzle in level 9 seems impossible. Can anyone help?",
        likes: 0,
        comments: [
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "The key is to start from the center and make your way outwards.",
                likes: 0,
            },
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Remember the pattern: up, down, left, right, then reverse it.",
                likes: 0,
            },
        ],
    },
    {
        user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
        post_title: "How to tame magical creatures? (Solved)",
        post_content: "I want to tame magical creatures. Is there a specific method for it?",
        likes: 0,
        comments: [
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Each creature has a favorite food. Find it and they will be more willing to be tamed.",
                likes: 0,
            },
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "Be patient, taming magical creatures takes time and you have to gain their trust.",
                likes: 0,
            },
        ],
    },
    {
        user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
        post_title: "Need help with the side quest 'The Lost Artifacts'",
        post_content: "I can't seem to complete 'The Lost Artifacts' side quest. Any advice?",
        likes: 0,
        comments: [
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "The last artifact is located in the Forgotten Dungeon. You'll need a torch to see in the dark.",
                likes: 0,
            },
            {
                user: {username: mockUsers[Math.floor(Math.random() * mockUsers.length)]},
                comment_content: "You have to defeat the stone golem to get the last artifact. Use fire spells, they're its weakness.",
                likes: 0,
            },
        ],
    },
];


const StrategyAndTipsMock = ({ gameId, categoryPage }) => {

    const [randomPosts, setRandomPosts] = useState([]);
    const [user, setUser] = useContext(UserContext);
    const [newComment, setNewComment] = useState([]);

    const [isLiked, setIsLiked] = useState(new Array(mockPosts.length).fill(false));
    const [isCommentLiked, setIsCommentLiked] = useState([]);

    useEffect(() => {
        if (user && user.id) {
            console.log(user);
            console.log(user.id);
            console.log(user.username);

        }
    }, [user])

    const handleAddComment = (postIndex, commentContent) => {
        // Add new comment to the selected post
        const newPosts = randomPosts.map((post, index) => {
            if (index !== postIndex) return post;
            return {
                ...post,
                comments: [...post.comments, { user: {username: user.username, profileImage: user.profileImage}, comment_content: commentContent, likes: 0 }],
            };
        });

        // Update state with new posts data
        setRandomPosts(newPosts);

        // Update local storage with new posts data
        localStorage.setItem(`${gameId}_${categoryPage}`, JSON.stringify(newPosts));
    };


    useEffect(() => {
        // create a unique key for this page
        const storageKey = `${gameId}_${categoryPage}`;
    
        // keys for storing and retrieving the like states
        const postLikedKey = `${gameId}_${categoryPage}_postLiked`;
        const commentLikedKey = `${gameId}_${categoryPage}_commentLiked`;
    
        // retrieve the data from local storage
        const storedData = localStorage.getItem(storageKey);
    
        if (storedData) {
            // if data exists, parse it and set it as your state
            setRandomPosts(JSON.parse(storedData));
        } else {
            // if no data exists, generate the random posts as you were before
            let randomizedPosts = mockPosts.map(post => {
                let postUserIndex = Math.floor(Math.random() * mockUsers.length);
                post.user = mockUsers[postUserIndex];
    
                let commentUsers = [...mockUsers];
                commentUsers.splice(postUserIndex, 1);
    
                let firstCommentUserIndex = Math.floor(Math.random() * commentUsers.length);
                post.comments[0].user = commentUsers[firstCommentUserIndex];
    
                commentUsers.splice(firstCommentUserIndex, 1);
                let secondCommentUserIndex = Math.floor(Math.random() * commentUsers.length);
                post.comments[1].user = commentUsers[secondCommentUserIndex];
    
                return post;
            });
    
            // Randomly select two posts
            let twoRandomPosts = [];
            while(twoRandomPosts.length < 2) {
                let randomIndex = Math.floor(Math.random() * randomizedPosts.length);
                if(!twoRandomPosts.includes(randomizedPosts[randomIndex])) {
                    twoRandomPosts.push(randomizedPosts[randomIndex]);
                }
            }
    
            // store the generated data in local storage
            localStorage.setItem(storageKey, JSON.stringify(twoRandomPosts));
    
            setRandomPosts(twoRandomPosts);
        }
    
        // Load isLiked state
        const storedIsLiked = localStorage.getItem(postLikedKey);
        setIsLiked(storedIsLiked ? JSON.parse(storedIsLiked) : []);
    
        // Load isCommentLiked state
        const storedIsCommentLiked = localStorage.getItem(commentLikedKey);
        setIsCommentLiked(storedIsCommentLiked ? JSON.parse(storedIsCommentLiked) : []);
    }, []);
    
    
    const [openIndex, setOpenIndex] = useState(null);

    const handleLike = (type, postIndex, commentIndex) => {
        setRandomPosts(prevPosts => prevPosts.map((post, i) => {
            if (i !== postIndex) return post;
    
            if (type === 'post') {
                const newIsLiked = !isLiked[postIndex];
    
                setIsLiked(prevLiked => {
                    const newLiked = [...prevLiked];
                    newLiked[postIndex] = newIsLiked;
                    return newLiked;
                });
    
                const updatedPost = { ...post, likes: newIsLiked ? post.likes + 1 : post.likes - 1 };
                
                // update localStorage after liking/unliking a post
                localStorage.setItem(`${gameId}_${categoryPage}`, JSON.stringify(prevPosts.map((p, idx) => idx === postIndex ? updatedPost : p)));
                localStorage.setItem(`${gameId}_${categoryPage}_postLiked`, JSON.stringify(isLiked.map((liked, idx) => idx === postIndex ? newIsLiked : liked)));
    
                return updatedPost;
            } else if (type === 'comment') {
                const newIsCommentLiked = !((isCommentLiked[postIndex] || [])[commentIndex] || false);
    
                setIsCommentLiked(prevLiked => {
                    const newLiked = JSON.parse(JSON.stringify(prevLiked));
                    if (!newLiked[postIndex]) newLiked[postIndex] = [];
                    newLiked[postIndex][commentIndex] = newIsCommentLiked;
                    return newLiked;
                });
    
                const updatedPost = { ...post };
                updatedPost.comments = updatedPost.comments.map((comment, j) => {
                    if (j !== commentIndex) return comment;
    
                    return { ...comment, likes: newIsCommentLiked ? comment.likes + 1 : comment.likes - 1 };
                });
    
                // update localStorage after liking/unliking a comment
                localStorage.setItem(`${gameId}_${categoryPage}`, JSON.stringify(prevPosts.map((p, idx) => idx === postIndex ? updatedPost : p)));
                localStorage.setItem(`${gameId}_${categoryPage}_commentLiked`, JSON.stringify(isCommentLiked.map((likedPost, idx) => idx === postIndex ? likedPost.map((liked, idx) => idx === commentIndex ? newIsCommentLiked : liked) : likedPost)));
    
                return updatedPost;
            }
    
            return post;
        }));
    };
    
    
    
    
    
    const handleToggle = index => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <>
            {Array.isArray(randomPosts) && randomPosts.map((post, index) => {
                return (
                    <div key={index} className="post" style={{
                        position: 'relative',
                        height: 'auto',
                        border: '0.125rem solid var(--grey)',
                        width:'100%',
                        boxShadow: '0.25rem 0.25rem 0.5rem rgba(0,0,0,0.15)',
                        backgroundColor: '#414141',
                        padding: '0.8rem',
                        margin: '1rem 0',
                        borderRadius: '0.2rem'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <img src={post.user.profileImage} alt={post.user.username} style={{width: '6rem', borderRadius: '50%'}} />
                            <div style={{ marginLeft: '1rem' }}>
                                <h2>{post.post_title}</h2>
                                <p>{post.post_content}</p>
                                <h5>{post.user.username}</h5>
                            </div>
                        </div>
    
                        <div style={{ 
                            display: 'flex',  
                            height:'3rem', 
                            border:'1px solid green',
                            width:'10rem',
                            marginBottom:'2rem'
                        }}>
                            <button className="post-comment-like-button" style={{width:'4rem'}} onClick={() => handleLike('post', index)}>{isLiked[index] ? 'Unlike' : 'Like'}</button>
                            <p style={{ marginLeft: '1rem', position:'relative', top:'.8rem', right:'1rem' }}>{post.likes} likes </p>


                        </div>
    
                        <div 
                            onClick={() => handleToggle(index)}
                            style={{
                                cursor: 'pointer',
                                backgroundColor: 'var(--metal)',
                                color: 'var(--white)',
                                padding: '1rem',
                                textAlign: 'center',
                                borderBottom: openIndex === index ? 'none' : '1px solid var(--grey)',
                                borderTopLeftRadius: '0.25rem',
                                borderTopRightRadius: '0.25rem',
                                width: 'max-content',
                                alignSelf: 'center'
                            }}
                        >
                            Comments {openIndex === index ? '▲' : '▼'}
                        </div>
    
                        {openIndex === index && (
                            <div style={{
                                padding: '1rem',
                                borderBottomLeftRadius: '0.25rem',
                                borderBottomRightRadius: '0.25rem'
                            }}>
                                {post.comments && post.comments.length > 0 && post.comments.map((comment, idx) => (
                                    <div key={idx} style={{
                                        position: 'relative',
                                        height: 'auto',
                                        border: '0.125rem solid var(--grey)',
                                        width:'100%',
                                        boxShadow: '0.25rem 0.25rem 0.5rem rgba(0,0,0,0.15)',
                                        backgroundColor: '#414141',
                                        padding: '0.8rem',
                                        margin: '1rem 0',
                                        borderRadius: '0.2rem'
                                    }}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={comment.user.profileImage} alt={comment.user.username} style={{width: '6rem', borderRadius: '50%'}}/>
                                            <div style={{ marginLeft: '1rem' }}>
                                                <p>{comment.comment_content}</p>
                                                <h5>{comment.user.username}</h5>
                                            </div>
                                        </div>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent:'center', 
                                            height:'3rem', 
                                            border:'1px solid green',
                                            width:'10rem'
                                        }}>
                                            <button 
                                                className="post-comment-like-button" 
                                                style={{width:'4rem'}} 
                                                onClick={() => handleLike('comment', index, idx)}
                                            >
                                                {((isCommentLiked[index] || [])[idx] || false) ? 'Unlike' : 'Like'}
                                            </button>
                                            <p style={{ marginLeft: '1rem', position:'relative', top:'.8rem', right:'1rem' }}>{comment.likes} likes</p>
                                        </div>
                                            
                                        </div>
                                ))}
                                <textarea 
                                    value={newComment[index] || ''} 
                                    onChange={(event) => {
                                        setNewComment(prevComments => {
                                            const newComments = [...prevComments];
                                            newComments[index] = event.target.value;
                                            return newComments;
                                        });
                                    }} 
                                    placeholder="Add a comment..."
                                />
                                <button onClick={() => {
                                    handleAddComment(index, newComment[index]);
                                    setNewComment(prevComments => {
                                        const newComments = [...prevComments];
                                        newComments[index] = '';
                                        return newComments;
                                    });
                                }}>Add Comment</button>
                            </div>
                        )}
                    </div>
                )
            })}
        </>
    );
    
};

export default StrategyAndTipsMock;
