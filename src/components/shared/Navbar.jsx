import { Link, NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { FaBell } from "react-icons/fa";
import logoWhite from "../../assets/logo/BlinkShip-logos_white.png";
import logoBlack from "../../assets/logo/BlinkShip-logos_black.png";

const Navbar = () => {
    const [showUser, setShowUser] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const { pathname } = useLocation();

    const links = <>
        <NavLink to="/"
            className={({ isActive }) =>
                isActive ? "underline" : ""
            }
        >
            HOME
        </NavLink>

        <NavLink to="/dashboard"
            className={({ isActive }) =>
                isActive ? "underline" : ""
            }
        >
            DASHBOARD
        </NavLink>

        <NavLink to="/notifications"
            className={({ isActive }) =>
                isActive ? "flex justify-center items-center" : "flex justify-center items-center"
            }
        >
            <FaBell className="text-lg" />
        </NavLink>
    </>

    return (
        <>
            {/* large device */}
            <div className={`hidden absolute lg:block justify-between items-center px-10 py-5 text-sm font-semibold z-10 text-white w-full ${pathname === '/' ? 'text-white' : 'text-black'}`} >
                <div className="flex justify-between items-center max-w-[1516px] mx-auto">
                    <div className="text-left">
                        <Link to='/'><img className="w-48" src={pathname === '/' ? logoWhite : logoBlack} alt="" /></Link>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex gap-10 justify-center list-none">
                            {
                                links
                            }
                        </div>

                        <div className="text-right">
                            <Link to='/login'><button className="px-5 py-2 font-bold bg-white text-primary active:scale-95 transition-all">LOGIN</button></Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* medium device */}
            <div className={`absolute z-10 flex gap-2 items-center justify-between lg:hidden md:px-10 px-5 py-2 text-white w-full`}>
                <div className="flex sm:gap-5 gap-2 items-center">
                    <FiMenu onClick={() => { setShowMenu(!showMenu); setShowUser(false) }} className="text-2xl cursor-pointer" />
                    <Link to='/'><img className="h-14 max-w-full cursor-pointer" src={pathname === '/' ? logoWhite : logoBlack} alt="" /></Link>
                </div>
                <div className={`${showMenu ? 'flex' : 'hidden'} flex-col absolute top-16 bg-[#000000BB] px-8 py-5 rounded space-y-3 z-10 text-white list-none text-sm`}>
                    {
                        links
                    }
                </div>
                <div className="flex items-center gap-10 text-sm">
                    <Link to='/login'><button className="px-5 py-2 font-bold bg-white text-sm text-primary active:scale-95 transition-all">SIGN IN</button></Link>
                </div >
            </div >
        </>
    );
};

export default Navbar;