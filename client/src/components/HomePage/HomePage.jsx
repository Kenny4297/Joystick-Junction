import FeaturedGamesCarousel from "./FeaturedGamesCarousel";
import RecentArticles from "./RecentArticles";
import Hero from './Hero'

const HomePage = () => {

    return (
        <section>
            <Hero />

            <FeaturedGamesCarousel />

            <RecentArticles />
        </section>
    );
};

export default HomePage;
