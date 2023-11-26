import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DashBoard from "../layouts/DashBoard";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../pages/user-dashboard/MyProfile";
import BookParcel from "../pages/user-dashboard/BookParcel";
import MyParcels from "../pages/user-dashboard/MyParcels";
import UpdateParcel from "../pages/user-dashboard/UpdateParcel";
import DashboardRedirect from "../components/dashboard/DashboardRedirect";
import Statistics from "../pages/admin-dashboard/Statistics";
import AllParcels from "../pages/admin-dashboard/AllParcels";
import ManageParcel from "../pages/admin-dashboard/ManageParcel";
import AllDeliveryMen from "../pages/admin-dashboard/AllDeliveryMen";
import AllUsers from "../pages/admin-dashboard/AllUsers";
import MyDeliveryList from "../pages/deliveryman-dashboard/MyDeliveryList";
import UserReview from "../pages/user-dashboard/UserReview";
import MyReviews from "../pages/deliveryman-dashboard/MyReviews";

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/',
                element: <DashboardRedirect></DashboardRedirect>
            },


            // user routes
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'book-parcel',
                element: <BookParcel></BookParcel>
            },
            {
                path: 'my-parcels',
                element: <MyParcels></MyParcels>
            },
            {
                path: 'update-parcel/:id',
                element: <UpdateParcel></UpdateParcel>
            },
            {
                path: 'user-review/:id',
                element: <UserReview></UserReview>
            },


            // admin routes
            {
                path: 'statistics',
                element: <Statistics></Statistics>
            },
            {
                path: 'all-parcels',
                element: <AllParcels></AllParcels>
            },
            {
                path: 'manage-parcel/:id',
                element: <ManageParcel></ManageParcel>
            },
            {
                path: 'all-deliverymen',
                element: <AllDeliveryMen></AllDeliveryMen>
            },
            {
                path: 'all-users',
                element: <AllUsers></AllUsers>
            },


            // deliveryman routes
            {
                path: 'my-delivery-list',
                element: <MyDeliveryList></MyDeliveryList>
            },
            {
                path: 'my-reviews',
                element: <MyReviews></MyReviews>
            }
        ]
    }
])

export default routes;