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
            }
        ]
    }
])

export default routes;