import { useNavigate } from "react-router-dom";
import useGetAllParcels from "../../hooks/useGetAllParcels";
import { MdManageAccounts } from "react-icons/md";

const AllParcels = () => {
    const { parcels } = useGetAllParcels();
    const navigate = useNavigate();

    const handleManageParcel = id => {
        navigate(`/dashboard/manage-parcel/${id}`);
    }

    return (
        <div>
            <h2 className={`md:text-4xl text-3xl font-bold text-center mb-10 text-black`}>My Parcels</h2>
            <p className="text-[#151515] text-2xl font-bold mt-20 cinzel">Total Parcels: {parcels.length}</p>

            <div className="overflow-x-auto mt-10">
                <table className="table">
                    {/* head */}
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>#</th>
                            <th>User</th>
                            <th>Contact no.</th>
                            <th>Booking Date</th>
                            <th>Requested Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels?.map((parcel, idx) => <tr key={parcel._id}>
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    {parcel?.sender}
                                </td>
                                <td>
                                    {parcel?.senderPhone}
                                </td>
                                <td>
                                    {parcel?.bookingDate}
                                </td>
                                <td>
                                    {parcel?.requestedDate}
                                </td>
                                <td>
                                    {parcel?.price}
                                </td>
                                <td className={`${parcel?.status === 'pending' ? 'text-yellow-600' : ""} ${parcel?.status === 'on the way' ? 'text-fuchsia-600' : ""} ${parcel?.status === 'delivered' ? 'text-green-600' : ""} ${parcel?.status === 'cancelled' ? 'text-red-600' : ""}`}>
                                    {parcel?.status}
                                </td>
                                <td>
                                    <button onClick={() => handleManageParcel(parcel?._id)} className="p-2 bg-primary text-white rounded disabled:bg-slate-500" disabled={parcel?.status === 'delivered' ? true : false}><MdManageAccounts className="text-lg" /></button>
                                </td>
                            </tr>)
                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default AllParcels;