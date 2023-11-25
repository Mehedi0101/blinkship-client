import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateParcel = () => {
    const axiosSecure = useAxiosSecure();
    const { id: parcelId } = useParams();
    const [previousValues, setPreviousValues] = useState({});
    const [weight, setWeight] = useState("");
    const [servicePrice, setServicePrice] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/parcels/id/${parcelId}`)
            .then(res => {
                setPreviousValues(res.data);
                setServicePrice(res.data.price);
            })
            .catch(() => {
                setPreviousValues({});
            })
    }, [axiosSecure, parcelId])

    useEffect(() => {
        if (weight <= 1 && weight > 0) {
            setServicePrice(50);
        }
        else if (weight <= 2 && weight > 1) {
            setServicePrice(100);
        }
        else if (weight > 2) {
            setServicePrice(150);
        }
    }, [weight])

    const handleWeight = e => {
        e.preventDefault();
        setWeight(e.target.value);
    }

    const handleUpdateBooking = e => {
        e.preventDefault();

        const toastId = toast.loading('Updating...');
        const form = e.target;

        const senderPhone = form.senderPhone.value;
        const parcelType = form.parcelType.value;
        const weight = form.weight.value;
        const receiver = form.receiver.value;
        const receiverPhone = form.receiverPhone.value;
        const deliveryAddress = form.deliveryAddress.value;
        const requestedDate = form.requestedDate.value;
        const longitude = form.longitude.value;
        const latitude = form.latitude.value;
        const price = servicePrice;

        const updatedInfo = { senderPhone, parcelType, weight, receiver, receiverPhone, deliveryAddress, requestedDate, longitude, latitude, price };

        axiosSecure.patch(`/parcels/update/${previousValues._id}`, updatedInfo)
            .then(res => {
                if (res.data.modifiedCount >= 0) {
                    toast.success('Booking updated successfully', { id: toastId });
                    navigate('/dashboard/my-parcels');
                }
            })
            .catch(() => {
                toast.error('Booking update failed', { id: toastId });
            })
    }


    return (
        <div className="min-h-screen md:px-10 px-5 max-w-screen-2xl mx-auto">
            <div className="flex flex-row justify-between">
                <div className="font-primary max-w-full mx-auto">
                    <form onSubmit={handleUpdateBooking} className="xl:p-14 lg:p-12 md:p-10 p-8 border rounded text-sm md:text-base max-w-[90%] mx-auto">
                        <h2 className="font-bold text-3xl md:text-4xl mb-10 font-secondary">Update</h2>
                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" defaultValue={previousValues?.sender} name="sender" id="sender" required disabled />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="email" defaultValue={previousValues?.email} name="email" id="email" placeholder="Email" required disabled />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" defaultValue={previousValues?.senderPhone} name="senderPhone" id="senderPhone" placeholder="Phone Number" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" defaultValue={previousValues?.parcelType} name="parcelType" id="parcelType" placeholder="Parcel Type" required />
                        <br />

                        <input onChange={handleWeight} className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="number" min={1} max={10} defaultValue={previousValues?.weight} name="weight" id="weight" placeholder="Weight (kg)" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" defaultValue={previousValues?.receiver} name="receiver" id="receiver" placeholder="Receiver Name" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" defaultValue={previousValues?.receiverPhone} name="receiverPhone" id="receiverPhone" placeholder="Receiver's Phone Number" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" defaultValue={previousValues?.deliveryAddress} name="deliveryAddress" id="deliveryAddress" placeholder="Parcel Delivery Address" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="date" defaultValue={previousValues?.requestedDate} name="requestedDate" id="requestedDate" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" defaultValue={previousValues?.latitude} name="latitude" id="latitude" placeholder="Delivery Address Latitude" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" defaultValue={previousValues?.longitude} name="longitude" id="longitude" placeholder="Delivery Address Longitude" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="price" id="price" value={`${servicePrice} taka`} required disabled />
                        <br />

                        <button className='px-5 py-2 bg-primary rounded text-white active:scale-95 transition-transform w-full font-medium mb-3'>Update Booking</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateParcel;