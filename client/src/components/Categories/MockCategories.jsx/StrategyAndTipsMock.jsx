import { useState, useEffect } from 'react';
import Max from '../../Assets/Images/Max.jpeg'
import Gary from '../../Assets/Images/Gary.jpg'
import Clay from '../../Assets/Images/Clay.jpeg'

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


const StrategyAndTipsMock = () => {

    const [randomPosts, setRandomPosts] = useState([]);

    const [isLiked, setIsLiked] = useState(new Array(mockPosts.length).fill(false));


    useEffect(() => {
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
        setRandomPosts(twoRandomPosts);
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
    
                // If the button is currently in the "Unlike" state (which means that newIsLiked is true), we should decrement. 
                // Otherwise, we increment the number of likes.
                return { ...post, likes: newIsLiked ? post.likes + 1 : post.likes - 1 };
            } else if (type === 'comment') {
                const updatedPost = { ...post };
                updatedPost.comments = updatedPost.comments.map((comment, j) => {
                    if (j !== commentIndex) return comment;
    
                    //You'll need to extend isLiked to track comments as well.
                    return { ...comment, likes: comment.likes + 1 };
                });
    
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
                                            <button className="post-comment-like-button" style={{width:'4rem'}} onClick={() => handleLike('comment', index, idx)} >Like</button>
                                            <p style={{ marginLeft: '1rem', position:'relative', top:'.8rem', right:'1rem' }}>{comment.likes} likes</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )
            })}
        </>
    );
    
};

export default StrategyAndTipsMock;
