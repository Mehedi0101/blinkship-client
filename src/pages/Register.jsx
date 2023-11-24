import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
import auth from "../configs/firebase.config";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import axios from "axios";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Register = () => {
    document.title = "CREATE AN ACCOUNT";
    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
    const { signUpEmailPassword, logout, googleLogin, setLoading, setGoogleLoginAttempt } = useContext(AuthContext);
    const navigate = useNavigate();
    const [passwordError, setPasswordError] = useState('');
    const [alreadyExistError, setAlreadyExistError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const { state } = useLocation();
    const axiosPublic = useAxiosPublic();

    const handleRegister = e => {
        e.preventDefault();
        setPasswordError('');
        setAlreadyExistError(false);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const role = form.role.value;

        if (password.length < 6) {
            setPasswordError('password should contain at least 6 characters');
            return;
        }

        if (!/^(?=.*[A-Z]).+$/.test(password)) {
            setPasswordError('password should contain at least an uppercase character');
            return;
        }

        if (!/^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\-]).+$/.test(password)) {
            setPasswordError('password should contain at least a special character');
            return;
        }

        const imageFile = { image: document.getElementById('image').files[0] };

        const toastId = toast.loading('Creating account...');
        axios.post(image_hosting_api, imageFile, {
            headers: {
                "content-type": 'multipart/form-data'
            }
        })
            .then(res => {
                if (res.data.success) {
                    const image = res?.data?.data?.url;
                    signUpEmailPassword(email, password)
                        .then(() => {
                            updateProfile(auth.currentUser, { displayName: name, photoURL: image })
                                .then(() => { })
                                .catch(() => { })

                            const userData = { email, name, image, role };

                            axiosPublic.post('/users', userData)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        toast.success('Account created successfully', { id: toastId });
                                    }

                                    logout()
                                        .then(() => {
                                            navigate('/login');
                                        })
                                })

                                .catch(() => {
                                    toast.error('Account creation failed', { id: toastId });
                                })

                            logout();
                        })

                        .catch(error => {
                            toast.error('Account creation failed', { id: toastId });
                            error.code === 'auth/email-already-in-use' && setAlreadyExistError(true);
                        })
                }
            })

            .catch(() => {
                toast.error('Invalid image file', { id: toastId });
            })
    }

    const handleGoogle = e => {
        e.preventDefault();
        const toastId = toast.loading('Logging in...');
        googleLogin()
            .then(() => {
                setGoogleLoginAttempt(true);
                navigate(state || '/');
                toast.success('Logged in successfully', { id: toastId });
            })
            .catch(() => {
                toast.error('Login failed', { id: toastId });
                setLoading(false);
                setGoogleLoginAttempt(false);
            })
    }

    return (
        <>
            <div className="min-h-screen pt-28 md:px-10 px-5 max-w-screen-2xl mx-auto">
                <div className="flex flex-row justify-between">
                    <div className="pt-20 pb-10 font-primary max-w-full mx-auto">
                        <form onSubmit={handleRegister} className="xl:p-14 lg:p-12 md:p-10 p-8 border rounded text-sm md:text-base max-w-[90%] mx-auto">
                            <h2 className="font-bold text-3xl md:text-4xl mb-10 font-secondary">Create Account</h2>
                            <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="text" name="name" id="name" placeholder="Name" required />
                            <br />
                            <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="email" name="email" id="email" placeholder="Email" required />
                            {
                                alreadyExistError && <p className="text-red-500 text-xs -mt-8 max-w-full w-[400px]">Email is already in use</p>
                            }

                            <div className="mb-8 relative">
                                <input className="outline-none border-b-2 font-medium placeholder:font-medium py-1 max-w-full w-[400px]" type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Password" required />
                                {
                                    showPassword ? <AiOutlineEyeInvisible onClick={() => setShowPassword(!showPassword)} className="absolute top-[20%] right-2 text-2xl cursor-pointer" /> : <AiOutlineEye onClick={() => setShowPassword(!showPassword)} className="absolute top-[20%] right-2 text-2xl cursor-pointer" />
                                }
                            </div>
                            {
                                passwordError && <p className="text-red-500 text-xs -mt-8 mb-8 max-w-full w-[400px]">*{passwordError}</p>
                            }

                            <select className={`outline-none border-b-2 font-medium placeholder:text-dark2 placeholder:font-medium py-1 max-w-full w-[400px] mb-8 cursor-pointer bg-transparent`} defaultValue="" name="role" id="role" required>
                                <option value="" disabled>Role</option>
                                <option value="user">User</option>
                                <option value="deliveryMen">Delivery man</option>
                            </select>
                            <br />

                            <input className="outline-none font-medium placeholder:font-medium py-1 max-w-full w-[400px] mb-8" type="file" name="image" id="image" required />
                            <br />

                            <button className='px-5 py-2 bg-primary rounded text-white active:scale-95 transition-transform w-full font-medium mb-3'>Create Account</button>
                            <div className="flex flex-wrap justify-center gap-1 text-sm font-medium">
                                <p className="text-center">Already have an account?</p>
                                <Link className="text-primary underline" to='/login'>Login</Link>
                            </div>
                            <div className="max-w-[90%] w-[400px]">
                                <div className="flex items-center gap-2 my-6">
                                    <hr className="border-[1px] border-[#C5C5C5] w-full" />
                                    <p className="text-black font-medium">Or</p>
                                    <hr className="border-[1px] border-[#C5C5C5] w-full" />
                                </div>
                                <div>
                                    <div onClick={handleGoogle} className='px-5 py-2 text-black active:scale-95 transition-transform w-full font-medium mb-3 flex items-center border border-[#C5C5C5] rounded-full cursor-pointer text-center'><FcGoogle className="text-2xl" /><p className="mx-auto">Continue with Google</p></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;