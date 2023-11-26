import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate, useParams } from "react-router-dom";
import useGetAllDeliveryMen from "../../hooks/useGetAllDeliveryMen";
import toast from "react-hot-toast";

const ManageParcel = () => {
    document.title = "Manage Parcel";
    const axiosSecure = useAxiosSecure();
    const { id: parcelId } = useParams();
    const [parcelData, setParcelData] = useState({});
    const { deliveryMen } = useGetAllDeliveryMen();
    const navigate = useNavigate();

    useEffect(() => {
        axiosSecure.get(`/parcels/id/${parcelId}`)
            .then(res => {
                setParcelData(res.data);
            })
            .catch(() => {
                setParcelData({});
            })
    }, [axiosSecure, parcelId])

    const handleManageParcel = e => {
        e.preventDefault();
        const toastId = toast.loading('Assigning delivery man...');

        const form = e.target;
        const deliveryManId = form.deliveryMan.value;
        const approximateDate = form.approximateDate.value;

        const updatedParcelData = { deliveryManId, approximateDate, status: 'on the way' };

        axiosSecure.patch(`/parcels/admin/update/${parcelId}`, updatedParcelData)
            .then(res => {
                if (res?.data?.modifiedCount >= 0) {
                    toast.success('Delivery man assigned', { id: toastId });
                    navigate('/dashboard/all-parcels');
                }
            })
            .catch(() => {

            })
    }

    return (
        <div className="min-h-screen md:px-10 px-5 max-w-screen-2xl mx-auto">
            <div className="flex flex-row justify-between">
                <div className="font-primary max-w-full mx-auto">
                    <form onSubmit={handleManageParcel} className="xl:p-14 lg:p-12 md:p-10 p-8 border rounded text-sm md:text-base max-w-[90%] mx-auto">
                        <h2 className="font-bold text-3xl md:text-4xl mb-10 font-secondary">Manage Parcel</h2>
                        <label className="font-semibold" htmlFor="parcelId">Parcel ID:</label><br />
                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8 mt-2" type="text" defaultValue={parcelData?._id} name="parcelId" id="parcelId" required disabled />
                        <br />

                        <label className="font-semibold" htmlFor="sender">User:</label><br />
                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8 mt-2" type="text" defaultValue={parcelData?.sender} name="sender" id="sender" required disabled />
                        <br />

                        <label className="font-semibold" htmlFor="deliveryMan">Delivery Man:</label><br />
                        <select className={`outline-none border-b-2 font-medium placeholder:text-dark2 placeholder:font-medium py-1 max-w-full w-[400px] mb-8 cursor-pointer bg-transparent mt-2`} defaultValue="" name="deliveryMan" id="deliveryMan" required>
                            <option disabled value="">Select a Delivery Man</option>
                            {
                                deliveryMen.map(staff => <option key={staff._id} value={staff._id}>{staff?.name}</option>)
                            }
                        </select>
                        <br />

                        <label className="font-semibold" htmlFor="approximateDate">Approximate Delivery Date:</label><br />
                        <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="date" name="approximateDate" id="approximateDate" required />
                        <br />

                        <button className='px-5 py-2 bg-primary rounded text-white active:scale-95 transition-transform w-full font-medium mb-3'>Confirm</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageParcel;