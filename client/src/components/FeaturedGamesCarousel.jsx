import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

function FeaturedGamesCarousel() {
  const [featuredGames, setFeaturedGames] = useState([]);
  const [hotGames, setHotGames] = useState([]);
  const [lovedGames, setLovedGames] = useState([]);

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
        const shuffledGames = games.sort(() => 0.5 - Math.random()); 
        setFeaturedGames(shuffledGames.slice(0, 5));
        setHotGames(shuffledGames.slice(5, 10));
        setLovedGames(shuffledGames.slice(10, 15));
      } catch (error) {
        console.error('There was an error retrieving the games:', error);
      }
    };

    fetchGames();
  }, []);
  return (
    <div style={{display:'flex', justifyContent:'space-between'}}>
        <div>
            <h2>Featured Games</h2>
            <div style={{position:'relative', height: '33rem', border:'2px solid red', minWidth:'20rem', maxWidth:'20rem'}}>
              <Carousel interval={null}>
                  {featuredGames.map((game, index) => (
                      <Carousel.Item key={index}>
                          <img
                              className="d-block"
                              src={game.thumbnail}
                              alt={game.title}
                              style={{width:'20rem', objectFit:'cover'}}
                          />
                          <div style={{marginTop:'15rem'}}>
                            <Carousel.Caption>
                                <h3>{game.title}</h3>
                                <p>{game.short_description}</p>
                            </Carousel.Caption>
                          </div>
                      </Carousel.Item>
                  ))}
              </Carousel>
            </div>
        </div>
        <div>
            <h2>What's Hot</h2>
            <div style={{position:'relative', height: '33rem', border:'2px solid red', minWidth:'20rem', maxWidth:'20rem'}}>
              <Carousel interval={null}>
                  {hotGames.map((game, index) => (
                      <Carousel.Item key={index}>
                          <img
                              className="d-block"
                              src={game.thumbnail}
                              alt={game.title}
                              style={{maxWidth:'100%', objectFit:'cover'}}
                          />
                          <div style={{marginTop:'15rem'}}>
                            <Carousel.Caption>
                                <h3>{game.title}</h3>
                                <p>{game.short_description}</p>
                            </Carousel.Caption>
                          </div>
                      </Carousel.Item>
                  ))}
              </Carousel>
            </div>
        </div>
        <div>
    <h2>Gotta Love It</h2>
    <div style={{position:'relative', height: '33rem', border:'2px solid red', minWidth:'20rem', maxWidth:'20rem'}}>
      <Carousel interval={null}>
          {lovedGames.map((game, index) => (
              <Carousel.Item key={index} style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                  <img
                      className="d-block"
                      src={game.thumbnail}
                      alt={game.title}
                      style={{width:'100%', objectFit:'cover'}}
                  />
                  <div style={{height: '5rem'}}></div>
                  <Carousel.Caption style={{border:'2px solid green', position: 'unset'}}>
                      <h3>{game.title}</h3>
                      <p>{game.short_description}</p>
                  </Carousel.Caption>
              </Carousel.Item>
          ))}
      </Carousel>
    </div>
</div>

    </div>
);



}

export default FeaturedGamesCarousel;
