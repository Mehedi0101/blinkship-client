import BasicStats from "../components/home/BasicStats";
import Features from "../components/home/Features";
import Banner from "../components/home/banner";

const Home = () => {
    document.title = "BlinkShip";

    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <BasicStats></BasicStats>
        </div>
    );
};

export default Home;