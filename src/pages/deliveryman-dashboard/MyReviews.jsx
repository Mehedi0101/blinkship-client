import { useEffect, useState } from "react";
import useGetUserData from "../../hooks/useGetUserData";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'

const MyReviews = () => {
    const { userData } = useGetUserData();
    const axiosSecure = useAxiosSecure();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/reviews/deliveryman/${userData._id}`)
            .then(res => setReviews(res.data))
            .catch(() => setReviews([]))
    }, [axiosSecure, userData._id])

    return (
        <div>
            <h2 className={`md:text-4xl text-3xl font-bold text-center mb-10 text-black`}>My Reviews</h2>
            <p className="text-[#151515] text-2xl font-bold mt-20 cinzel">Total Reviews: {reviews.length}</p>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-10">
                {
                    reviews.map(review => <div className="flex flex-col justify-center items-center p-10 border border-slate-300 rounded-md shadow-md shadow-slate-400" key={review._id}>
                        <img className="w-14 h-14 object-cover rounded-full" src={review.image} alt="" />
                        <div className="text-lg font-semibold mt-2">{review.reviewer}</div>
                        <Rating className="mt-2"
                            style={{ maxWidth: 100 }}
                            value={review.rating}
                            readOnly
                        />
                        <div className="mt-2 font-medium">{review.feedback}</div>
                        <div className="mt-2 font-semibold">{review.date}</div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default MyReviews;