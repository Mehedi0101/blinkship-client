import speed from "../../assets/features/speed.png";
import tracking from "../../assets/features/tracking.png";
import secure from "../../assets/features/secure.png";

const Features = () => {
    return (
        <div className="md:px-10 px-5 mt-28 select-none max-w-screen-2xl mx-auto">
            <h2 className={`md:text-4xl text-3xl font-bold text-center mb-10 text-black`}>Our Features</h2>
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10 justify-between`}>
                <div className="py-5 rounded-lg flex flex-col justify-between">
                    <img className="w-28 mx-auto" src={speed} alt="" />
                    <h3 className="text-center text-2xl mt-5 font-semibold">Express Speed</h3>
                    <p className={`text-center mt-3`}>BlinkShip&apos;s Express Speed service promises swift and efficient deliveries. With a focus on speed and reliability, we ensure your parcels reach their destination promptly, offering a seamless and expedited shipping experience for your convenience.</p>
                </div>

                <div className="py-5 rounded-lg flex flex-col justify-between">
                    <img className="w-28 mx-auto" src={tracking} alt="" />
                    <h3 className="text-center text-2xl mt-5 font-semibold">Real-Time Tracking</h3>
                    <p className={`text-center mt-3`}>BlinkShip introduces real-time tracking for an enhanced shipping experience. Our cutting-edge technology keeps you informed with live updates on your parcel&apos;s journey. Gain transparency, control, and peace of mind as you track every step of your delivery in real time.</p>
                </div>

                <div className="py-5 rounded-lg flex flex-col justify-between">
                    <img className="w-28 mx-auto" src={secure} alt="" />
                    <h3 className="text-center text-2xl mt-5 font-semibold">Secure Handling</h3>
                    <p className={`text-center mt-3`}>Trust BlinkShip&apos;s Secure Handling for the utmost protection of your parcels. Our stringent security measures guarantee the safe and intact delivery of your shipments. With a focus on reliability, we prioritize the secure handling of your valuable items throughout the shipping process.</p>
                </div>
            </div>
        </div>
    );
};

export default Features;