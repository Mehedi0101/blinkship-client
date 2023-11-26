import { useEffect, useState } from "react";
import useGetUserData from "../../hooks/useGetUserData";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import moment from "moment/moment";
import { useNavigate } from "react-router-dom";

const BookParcel = () => {
    const { userData } = useGetUserData();
    const [weight, setWeight] = useState("");
    const [servicePrice, setServicePrice] = useState(0);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleWeight = e => {
        e.preventDefault();
        setWeight(e.target.value);
    }

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

    const handleBookService = e => {
        e.preventDefault();

        const toastId = toast.loading('Booking Service...');
        const form = e.target;

        const sender = form.sender.value;
        const email = form.email.value;
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
        const status = 'pending';
        const approximateDate = 'N/A';
        const bookingDate = moment().format("YYYY-MM-DD");
        const deliveryManId = 'N/A';

        const parcelInfo = { sender, email, senderPhone, parcelType, weight, receiver, receiverPhone, deliveryAddress, requestedDate, longitude, latitude, price, status, approximateDate, bookingDate, deliveryManId, rating: 'N/A' }

        axiosPublic.post('/parcels', parcelInfo)
            .then(res => {
                if (res.data.insertedId) {
                    toast.success('Service Booked Successfully', { id: toastId });
                    setServicePrice(0);
                    navigate('/dashboard/my-parcels');
                }
            })
            .catch(() => {
                toast.error('Service Booking failed', { id: toastId });
            })
    }

    return (
        <div className="min-h-screen md:px-10 px-5 max-w-screen-2xl mx-auto">
            <div className="flex flex-row justify-between">
                <div className="font-primary max-w-full mx-auto">
                    <form onSubmit={handleBookService} className="xl:p-14 lg:p-12 md:p-10 p-8 border rounded text-sm md:text-base max-w-[90%] mx-auto">
                        <h2 className="font-bold text-3xl md:text-4xl mb-10 font-secondary">Book a Parcel</h2>
                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" defaultValue={userData?.name} name="sender" id="sender" required disabled />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="email" defaultValue={userData?.email} name="email" id="email" placeholder="Email" required disabled />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="senderPhone" id="senderPhone" placeholder="Phone Number" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="parcelType" id="parcelType" placeholder="Parcel Type" required />
                        <br />

                        <input onChange={handleWeight} className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="number" min={1} max={10} name="weight" id="weight" placeholder="Weight (kg)" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="receiver" id="receiver" placeholder="Receiver Name" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="receiverPhone" id="receiverPhone" placeholder="Receiver's Phone Number" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="deliveryAddress" id="deliveryAddress" placeholder="Parcel Delivery Address" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="date" name="requestedDate" id="requestedDate" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="latitude" id="latitude" placeholder="Delivery Address Latitude" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="longitude" id="longitude" placeholder="Delivery Address Longitude" required />
                        <br />

                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="price" id="price" value={`${servicePrice} taka`} required disabled />
                        <br />

                        <button className='px-5 py-2 bg-primary rounded text-white active:scale-95 transition-transform w-full font-medium mb-3'>Book Service</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookParcel;