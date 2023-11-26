import useGetDeliveryList from "../../hooks/useGetDeliveryList";
import useGetUserData from "../../hooks/useGetUserData";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const MyDeliveryList = () => {
    document.title = "My Delivery List";
    const { userData } = useGetUserData();
    const { deliveryList, refetch } = useGetDeliveryList(userData._id);
    const axiosSecure = useAxiosSecure();

    const handleCancel = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/parcels/deliveryman/update/${id}`, { status: 'cancelled' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Cancelled!",
                                text: "This delivery is cancelled",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(() => {
                        toast.error('Failed');
                    })
            }
        });
    }


    const handleDeliver = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/parcels/deliveryman/update/${id}`, { status: 'delivered' })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Delivered!",
                                text: "This parcel is successfully delivered",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch(() => {
                        toast.error('Failed');
                    })
            }
        });
    }

    return (
        <div>
            <h2 className={`md:text-4xl text-3xl font-bold text-center mb-10 text-black`}>My Delivery List</h2>
            <p className="text-[#151515] text-2xl font-bold mt-20 cinzel">Total Parcels: {deliveryList.length}</p>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>Sender</th>
                            <th>Receiver</th>
                            <th>Sender Contact no.</th>
                            <th>Requested Date</th>
                            <th>Approximate Date</th>
                            <th>Receiver Contact no.</th>
                            <th>Receiver Address</th>
                            <th>Cancel</th>
                            <th>Deliver</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deliveryList?.map((parcel, idx) => <tr key={parcel._id}>
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    {parcel?.sender}
                                </td>
                                <td>
                                    {parcel?.receiver}
                                </td>
                                <td>
                                    {parcel?.senderPhone}
                                </td>
                                <td>
                                    {parcel?.requestedDate}
                                </td>
                                <td>
                                    {parcel?.approximateDate}
                                </td>
                                <td>
                                    {parcel?.receiverPhone}
                                </td>
                                <td>
                                    {parcel?.deliveryAddress}
                                </td>
                                <td>
                                    <button onClick={() => handleCancel(parcel?._id)} className="p-2 bg-red-600 text-white rounded disabled:bg-slate-500"><MdCancel /></button>
                                </td>
                                <td>
                                    <button onClick={() => handleDeliver(parcel?._id)} className="p-2 bg-green-600 text-white rounded disabled:bg-slate-500"><FaCheckCircle /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyDeliveryList;