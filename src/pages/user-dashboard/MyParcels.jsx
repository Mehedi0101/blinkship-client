import useGetParcelData from "../../hooks/useGetParcelData";
import { FaPenToSquare } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MyParcels = () => {
    const { parcelData } = useGetParcelData();
    const navigate = useNavigate();

    const handleUpdateParcel = id => {
        navigate(`/dashboard/update-parcel/${id}`);
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
                                <td>
                                    {parcel?.status}
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateParcel(parcel?._id)} className="p-2 bg-primary text-white rounded disabled:bg-slate-500" disabled={parcel?.status !== 'pending' ? true : false}><FaPenToSquare /></button>
                                </td>
                                <td>
                                    <button className="p-2 bg-red-600 text-white rounded disabled:bg-slate-500" disabled={parcel?.status !== 'pending' ? true : false}><FaTrashAlt /></button>
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