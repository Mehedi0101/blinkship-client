import Features from "../components/home/Features";
import Banner from "../components/home/banner";

const Home = () => {
    document.title = "BlinkShip";

    return (
        <div>
            <Banner></Banner>
            <Features></Features>
        </div>
    );
};

export default Home;