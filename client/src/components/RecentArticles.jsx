import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loremIpsum } from 'lorem-ipsum';

const RecentArticles = () => {
    const [games, setGames] = useState([]);

    const articleTitles = [
        'Having trouble beating the final boss?',
        'How to pass level 4: A guide',
        'Mastering the art of strategy',
        'Becoming an unbeatable gamer',
        'Exploring the open world',
        'Surviving the hardest levels',
        'Unlocking secret game features',
        'Finding all hidden treasures',
        'How to conquer multiplayer mode',
        'The best weapon upgrades',
        'Creating unbeatable game strategies',
        'The secret to high scores',
        'Powering through challenging quests',
        'Essential tips for beginners',
        'Advanced tactics for experienced gamers',
        'Ultimate guide to side quests',
        'The hidden lore of the game world',
        'Improving your reaction times',
        'Becoming a pro at puzzle solving',
        'Mastering the hardest boss fights',
    ];

    const articleTitlesIndex = articleTitles.sort(() => Math.random() - 0.5);

    useEffect(() => {
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
            headers: {
                'X-RapidAPI-Key': '5353e51751msha2b28d9e3384746p1a9b44jsne8dbb6955924',
                'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        const fetchGames = async () => {
            try {
                const response = await axios.request(options);
                const games = response.data;
                const selectedGames = games.sort(() => .5 - Math.random()).slice(0,3);
                setGames(selectedGames);
            } catch (error) {
                console.error(error);
            }
        };

        fetchGames();
    }, []);

    const GameCard = ({ game, index }) => {
        const gameDescription = loremIpsum({
            count: 1,
            format: 'plain',
            units: 'paragraphs',
            paragraphLowerBound: 3,
            paragraphUpperBound: 5,
            sentenceLowerBound: 5,
            sentenceUpperBound: 15,
            random: Math.random,
        }).slice(0, 200) + '...';

        return (
            <div style={{ margin: '20px', padding: '20px', border: '1px solid gray', width: '300px' }}>
                <h3>{game.title}</h3>
                <img src={game.thumbnail} alt={game.title} style={{ width: '100%' }} />
                <h4>{articleTitlesIndex[index]}</h4>
                <p>{gameDescription}</p>
            </div>
        );
    };

    return (
        <>
            <h2>Recent Articles</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {games.map((game, index) => (
                    <GameCard key={game.id} game={game} index={index} />
                ))}
            </div>
        </>
    );
};

export default RecentArticles;
