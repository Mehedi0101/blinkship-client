import { NavLink } from "react-router-dom";
import { TfiStatsUp } from "react-icons/tfi";
import { BsBoxSeamFill } from "react-icons/bs";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { PiUsersThreeBold } from "react-icons/pi";

const adminLinks = <>
    <NavLink to="/dashboard/statistics"
        className={({ isActive }) =>
            isActive ? "flex items-center gap-3 font-bold underline" : "flex items-center gap-3 font-medium"
        }
    >
        <TfiStatsUp className="text-2xl hidden sm:block" />STATISTICS
    </NavLink>

    <NavLink to="/dashboard/all-parcels"
        className={({ isActive }) =>
            isActive ? "flex items-center gap-3 font-bold underline" : "flex items-center gap-3 font-medium"
        }
    >
        <BsBoxSeamFill className="text-2xl hidden sm:block" />ALL PARCELS
    </NavLink>

    <NavLink to="/dashboard/all-deliverymen"
        className={({ isActive }) =>
            isActive ? "flex items-center gap-3 font-bold underline" : "flex items-center gap-3 font-medium"
        }
    >
        <MdOutlineDeliveryDining className="text-2xl hidden sm:block" />ALL DELIVERYMEN
    </NavLink>

    <NavLink to="/dashboard/all-users"
        className={({ isActive }) =>
            isActive ? "flex items-center gap-3 font-bold underline" : "flex items-center gap-3 font-medium"
        }
    >
        <PiUsersThreeBold className="text-2xl hidden sm:block" />ALL USERS
    </NavLink>
</>

export default adminLinks;