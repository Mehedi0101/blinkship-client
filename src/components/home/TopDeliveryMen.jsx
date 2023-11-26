import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const TopDeliveryMen = () => {
    const [topDeliverymen, setTopDeliverymen] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        axiosPublic.get('/topDeliverymen')
            .then(res => setTopDeliverymen(res.data))
            .catch(() => setTopDeliverymen([]))
    }, [axiosPublic])
    console.log(topDeliverymen);

    return (
        <div className="md:px-10 px-5 mt-28 select-none max-w-screen-2xl mx-auto">
            <h2 className={`md:text-4xl text-3xl font-bold text-center mb-10 text-black`}>Top Deliverymen</h2>
            <div className="flex gap-10 md:flex-row flex-col justify-center items-center">
                <div className="card max-w-full w-96 bg-base-100">
                    <figure className="px-10 pt-10">
                        <img src={topDeliverymen?.[0]?.image} alt="" className="h-40 w-40 object-cover" />
                    </figure>
                    <div className="flex flex-col gap-2 items-center text-center mt-5">
                        <h2 className="card-title">{topDeliverymen?.[0]?.name}</h2>
                        <p className="text-sm pb-0"><span className="font-semibold">Total Parcel Delivered: </span><span className="text-lg font-bold text-primary">{topDeliverymen?.[0]?.parcelCount}</span></p>
                        <div className="mt-0"><Rating
                            style={{ maxWidth: 100 }}
                            value={topDeliverymen?.[0]?.review}
                            readOnly
                        /></div>
                    </div>
                </div>
                <div className="card max-w-full w-96 bg-base-100">
                    <figure className="px-10 pt-10">
                        <img src={topDeliverymen?.[1]?.image} alt="" className="h-40 w-40 object-cover" />
                    </figure>
                    <div className="flex flex-col gap-2 items-center text-center mt-5">
                        <h2 className="card-title">{topDeliverymen?.[1]?.name}</h2>
                        <p className="text-sm pb-0"><span className="font-semibold">Total Parcel Delivered: </span><span className="text-lg font-bold text-primary">{topDeliverymen?.[1]?.parcelCount}</span></p>
                        <div className="mt-0"><Rating
                            style={{ maxWidth: 100 }}
                            value={topDeliverymen?.[1]?.review}
                            readOnly
                        /></div>
                    </div>
                </div>
                <div className="card max-w-full w-96 bg-base-100">
                    <figure className="px-10 pt-10">
                        <img src={topDeliverymen?.[2]?.image} alt="" className="h-40 w-40 object-cover" />
                    </figure>
                    <div className="flex flex-col gap-2 items-center text-center mt-5">
                        <h2 className="card-title">{topDeliverymen?.[2]?.name}</h2>
                        <p className="text-sm pb-0"><span className="font-semibold">Total Parcel Delivered: </span><span className="text-lg font-bold text-primary">{topDeliverymen?.[2]?.parcelCount}</span></p>
                        <div className="mt-0"><Rating
                            style={{ maxWidth: 100 }}
                            value={topDeliverymen?.[2]?.review}
                            readOnly
                        /></div>
                    </div>
                </div>
            </div>
            <div className="flex gap-10 md:flex-row flex-col justify-center mt-10">
                <div className="card max-w-full w-96 bg-base-100">
                    <figure className="px-10 pt-10">
                        <img src={topDeliverymen?.[3]?.image} alt="" className="h-40 w-40 object-cover" />
                    </figure>
                    <div className="flex flex-col gap-2 items-center text-center mt-5">
                        <h2 className="card-title">{topDeliverymen?.[3]?.name}</h2>
                        <p className="text-sm pb-0"><span className="font-semibold">Total Parcel Delivered: </span><span className="text-lg font-bold text-primary">{topDeliverymen?.[3]?.parcelCount}</span></p>
                        <div className="mt-0"><Rating
                            style={{ maxWidth: 100 }}
                            value={topDeliverymen?.[3]?.review}
                            readOnly
                        /></div>
                    </div>
                </div>
                <div className="card max-w-full w-96 bg-base-100">
                    <figure className="px-10 pt-10">
                        <img src={topDeliverymen?.[4]?.image} alt="" className="h-40 w-40 object-cover" />
                    </figure>
                    <div className="flex flex-col gap-2 items-center text-center mt-5">
                        <h2 className="card-title">{topDeliverymen?.[4]?.name}</h2>
                        <p className="text-sm pb-0"><span className="font-semibold">Total Parcel Delivered: </span><span className="text-lg font-bold text-primary">{topDeliverymen?.[4]?.parcelCount}</span></p>
                        <div className="mt-0"><Rating
                            style={{ maxWidth: 100 }}
                            value={topDeliverymen?.[4]?.review}
                            readOnly
                        /></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopDeliveryMen;