import BasicStats from "../components/home/BasicStats";
import Features from "../components/home/Features";
import TopDeliveryMen from "../components/home/TopDeliveryMen";
import Banner from "../components/home/banner";

const Home = () => {
    document.title = "BlinkShip";

    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <BasicStats></BasicStats>
            <TopDeliveryMen></TopDeliveryMen>
        </div>
    );
};

export default Home;