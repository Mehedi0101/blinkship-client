import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { BsFillBoxSeamFill } from "react-icons/bs";

const userLinks = <>
    {/* admin home */}
    <NavLink to="/dashboard/"
        className={({ isActive }) =>
            isActive ? "flex items-center gap-3 font-bold underline" : "flex items-center gap-3 font-medium"
        }
    >
        <FaUserCircle className="text-2xl hidden sm:block" />MY PROFILE
    </NavLink>

    {/* add items */}
    <NavLink to="/dashboard/add-items"
        className={({ isActive }) =>
            isActive ? "flex items-center gap-3 font-bold underline" : "flex items-center gap-3 font-medium"
        }
    >
        <FaTruck className="text-2xl hidden sm:block" />BOOK A PARCEL
    </NavLink>

    {/* manage items */}
    <NavLink to="/dashboard/manage-items"
        className={({ isActive }) =>
            isActive ? "flex items-center gap-3 font-bold underline" : "flex items-center gap-3 font-medium"
        }
    >
        <BsFillBoxSeamFill className="text-2xl hidden sm:block" />MY PARCELS
    </NavLink>
</>

export default userLinks;