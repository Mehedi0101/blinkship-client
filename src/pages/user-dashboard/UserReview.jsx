import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useGetUserData from "../../hooks/useGetUserData";
import moment from "moment";
import Swal from "sweetalert2";

const UserReview = () => {
    document.title = "Review";
    const { id: parcelId } = useParams();
    const [parcelData, setParcelData] = useState({});
    const axiosSecure = useAxiosSecure();
    const { userData } = useGetUserData();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/parcels/id/${parcelId}`)
            .then(res => setParcelData(res.data))
            .catch(() => setParcelData({}))
    }, [axiosSecure, parcelId])

    const handleRateService = e => {
        e.preventDefault();

        const form = e.target;
        const reviewer = userData.name;
        const image = userData.image;
        const date = moment().format("YYYY-MM-DD");
        const rating = Number(form.rating.value);
        const feedback = form.feedback.value;
        const deliveryManId = parcelData.deliveryManId;

        const reviewData = { reviewer, image, date, rating, feedback, deliveryManId };

        axiosSecure.post('/reviews', reviewData)
            .then(res => {
                if (res.data.insertedId) {
                    axiosSecure.patch(`/parcels/rating/${parcelId}`, { rating: rating })
                        .then(res => {
                            if (res.data.modifiedCount > 0) {
                                axiosSecure.patch(`/users/review/${deliveryManId}`, { rating: rating })
                                    .then(res => {
                                        if (res.data.modifiedCount > 0) {
                                            Swal.fire({
                                                title: "Thank you for you time",
                                                text: "Rated Successfully",
                                                icon: "success"
                                            });
                                            navigate('/dashboard/my-parcels');
                                        }
                                    })
                                    .catch(() => { })
                            }
                        })
                        .catch(() => { })
                }
            })
            .catch(() => {

            })
    }



    return (
        <div className="min-h-screen md:px-10 px-5 max-w-screen-2xl mx-auto">
            <div className="flex flex-row justify-between">
                <div className="font-primary max-w-full mx-auto">
                    <form onSubmit={handleRateService} className="xl:p-14 lg:p-12 md:p-10 p-8 border rounded text-sm md:text-base max-w-[90%] mx-auto">
                        <h2 className="font-bold text-3xl md:text-4xl mb-10 font-secondary">Rate Our Service</h2>

                        <label className="font-semibold" htmlFor="sender">User:</label><br />
                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8 mt-2" type="text" defaultValue={userData?.name} name="sender" id="sender" required disabled />
                        <br />

                        <img className="w-20 h-20 rounded-full object-cover mb-8" src={userData?.image} alt="" />

                        <label className="font-semibold" htmlFor="rating">Rating:</label><br />
                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8 mt-2" type="number" min={1} max={5} name="rating" id="rating" placeholder="Rating (1-5)" required />
                        <br />

                        <label className="font-semibold" htmlFor="feedback">Feedback:</label><br />
                        <div className={`border-2 font-medium py-1 max-w-full w-[400px] mb-8 mt-2`}>
                            <textarea className={`outline-none px-2 py-1 w-full resize-none placeholder:font-medium bg-transparent`} name="feedback" id="feedback" cols="30" rows="10" placeholder="Feedback about our service" required></textarea>
                        </div>

                        <label className="font-semibold" htmlFor="deliveryManId">Delivery Man ID:</label><br />
                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8 mt-2" type="text" defaultValue={parcelData?.deliveryManId} name="deliveryManId" id="deliveryManId" required disabled />
                        <br />

                        <button className='px-5 py-2 bg-primary rounded text-white active:scale-95 transition-transform w-full font-medium mb-3'>Rate Us</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserReview;