import useGetParcelData from "../../hooks/useGetParcelData";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyParcels = () => {
    const { parcelData, refetch } = useGetParcelData();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleUpdateParcel = id => {
        navigate(`/dashboard/update-parcel/${id}`);
    }

    const handleDeleteBooking = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, remove it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(() => {
                        toast.error('Something went wrong');
                    })
            }
        });
    }

    return (
        <div>
            <h2 className={`md:text-4xl text-3xl font-bold text-center mb-10 text-black`}>My Parcels</h2>
            <p className="text-[#151515] text-2xl font-bold mt-20 cinzel">Total Parcels: {parcelData.length}</p>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Type</th>
                            <th>Requested Date</th>
                            <th>Approximate Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Man ID</th>
                            <th>Status</th>
                            <th>Update</th>
                            <th>Cancel</th>
                            <th>Review</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcelData?.map((parcel, idx) => <tr key={parcel._id}>
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    {parcel?.parcelType}
                                </td>
                                <td>
                                    {parcel?.requestedDate}
                                </td>
                                <td>
                                    {parcel?.approximateDate}
                                </td>
                                <td>
                                    {parcel?.bookingDate}
                                </td>
                                <td>
                                    {parcel?.deliveryManId}
                                </td>
                                <td className={`${parcel?.status === 'pending' ? 'text-yellow-600' : ""} ${parcel?.status === 'on the way' ? 'text-fuchsia-600' : ""} ${parcel?.status === 'delivered' ? 'text-green-600' : ""} ${parcel?.status === 'cancelled' ? 'text-red-600' : ""}`}>
                                    {parcel?.status}
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateParcel(parcel?._id)} className="p-2 bg-primary text-white rounded disabled:bg-slate-500" disabled={parcel?.status !== 'pending' ? true : false}><FaPenToSquare /></button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteBooking(parcel?._id)} className="p-2 bg-red-600 text-white rounded disabled:bg-slate-500" disabled={parcel?.status !== 'pending' ? true : false}><FaTrashAlt /></button>
                                </td>
                                <td>
                                    <button className="p-2 bg-fuchsia-600 text-white rounded disabled:bg-slate-500" disabled={parcel?.status !== 'delivered' ? true : false}>Review</button>
                                </td>
                                <td>
                                    <button className="p-2 bg-green-600 text-white rounded disabled:bg-slate-500" disabled={parcel?.status !== 'delivered' ? true : false}>Pay</button>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyParcels;