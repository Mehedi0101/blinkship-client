import { FaTruck } from 'react-icons/fa';
import { FaStar } from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const deliveryMenLinks = <>
    <NavLink to="/dashboard/my-delivery-list"
        className={({ isActive }) =>
            isActive ? "flex items-center gap-3 font-bold underline" : "flex items-center gap-3 font-medium"
        }
    >
        <FaTruck className="text-2xl hidden sm:block" />MY DELIVERY LIST
    </NavLink>

    <NavLink to="/dashboard/my-reviews"
        className={({ isActive }) =>
            isActive ? "flex items-center gap-3 font-bold underline" : "flex items-center gap-3 font-medium"
        }
    >
        <FaStar className="text-2xl hidden sm:block" />MY REVIEWS
    </NavLink>
</>

export default deliveryMenLinks;