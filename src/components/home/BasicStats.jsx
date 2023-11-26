import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { BsBoxSeam } from "react-icons/bs";
import { FaTruck } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import CountUp from 'react-countup';

const BasicStats = () => {
    const [parcelCount, setParcelCount] = useState(0);
    const [deliveryCount, setDeliveryCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/parcelCount')
            .then(res => setParcelCount(res.data.count))
            .catch(() => setParcelCount('N/A'))

        axiosPublic.get('/deliveryCount')
            .then(res => setDeliveryCount(res.data.count))
            .catch(() => setDeliveryCount('N/A'))

        axiosPublic.get('/userCount')
            .then(res => setUserCount(res.data.count))
            .catch(() => setUserCount('N/A'))
    }, [axiosPublic])

    return (
        <div className="md:px-10 px-5 mt-28 select-none max-w-screen-2xl mx-auto">
            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-10 justify-between`}>
                <div className="py-5 rounded-lg flex flex-col justify-between">
                    {/* <img className="w-28 mx-auto" src={speed} alt="" /> */}
                    <h2 className="text-4xl text-center font-bold text-primary"><CountUp duration={10} end={parcelCount} /></h2>
                    <div className="flex items-center justify-center gap-5 mt-5">
                        <BsBoxSeam className="text-primary text-4xl" />
                        <h3 className="text-center text-2xl font-semibold">Parcel Booked</h3>
                    </div>
                </div>

                <div className="py-5 rounded-lg flex flex-col justify-between">
                    {/* <img className="w-28 mx-auto" src={tracking} alt="" /> */}
                    <h2 className="text-4xl text-center font-bold text-primary"><CountUp duration={10} end={deliveryCount} /></h2>
                    <div className="flex items-center justify-center gap-5 mt-5">
                        <FaTruck className="text-primary text-4xl" />
                        <h3 className="text-center text-2xl font-semibold">Parcel Delivered</h3>
                    </div>
                </div>

                <div className="py-5 rounded-lg flex flex-col justify-between">
                    {/* <img className="w-28 mx-auto" src={secure} alt="" /> */}
                    <h2 className="text-4xl text-center font-bold text-primary"><CountUp duration={10} end={userCount} /></h2>
                    <div className="flex items-center justify-center gap-5 mt-5">
                        <FaUsers className="text-primary text-4xl" />
                        <h3 className="text-center text-2xl font-semibold">Users</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BasicStats;