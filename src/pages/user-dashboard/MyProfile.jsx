import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { AiOutlineUpload } from "react-icons/ai";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import auth from "../../configs/firebase.config";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import axios from "axios";
import useGetUserData from "../../hooks/useGetUserData";

const MyProfile = () => {
    document.title = "My Profile";
    const { currentUser } = useContext(AuthContext);
    const { userData, refetch } = useGetUserData();
    const [updateStatus, setUpdateStatus] = useState(false);
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`;
    const axiosSecure = useAxiosSecure();

    const handleUpload = e => {
        e.preventDefault();
        const imageFile = { image: document.getElementById('new-image').files[0] };

        const toastId = toast.loading('Uploading image...');
        axios.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": 'multipart/form-data'
            }
        })
            .then(res => {
                if (res?.data?.success) {
                    const image = res?.data?.data?.url;
                    updateProfile(auth.currentUser, { photoURL: image })
                        .then(() => {
                            axiosSecure.patch(`/users/${currentUser?.email}`, { image })
                                .then(res => {
                                    if (res.data.modifiedCount >= 0) {
                                        toast.success('Profile picture updated', { id: toastId });
                                        refetch();
                                    }
                                })
                                .catch(() => {
                                    toast.failed('Something went wrong', { id: toastId });
                                })
                        })
                        .catch(() => {
                            toast.failed('Something went wrong', { id: toastId });
                        })

                    setUpdateStatus(false);
                }
            })
    }

    return (
        <div className="p-10 md:px-10 px-5">
            <h2 className={`md:text-4xl text-3xl font-bold text-center mb-10 text-black`}>My Profile</h2>
            <div className="flex flex-col justify-center items-center gap-5">
                <img className="w-40 h-40 object-cover rounded-full" src={userData.image} alt="" />
                <button onClick={() => setUpdateStatus(true)} className="px-5 py-2 font-bold bg-primary text-sm flex items-center gap-2 text-white active:scale-95 transition-all"><AiOutlineUpload className="text-2xl" /> UPDATE PROFILE PICTURE</button>
                {
                    updateStatus &&
                    <form onSubmit={handleUpload}>
                        <input className="outline-none font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="file" name="new-image" id="new-image" required />
                        <input className="px-5 py-2 font-bold bg-primary text-sm text-white active:scale-95 transition-all cursor-pointer" type="submit" value="UPLOAD" />
                    </form>
                }
                <div className="">
                    <span className="font-extrabold">User Name: </span>
                    <span>{userData.name}</span>
                </div>
                <div className="">
                    <span className="font-extrabold">Email: </span>
                    <span>{userData.email}</span>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;