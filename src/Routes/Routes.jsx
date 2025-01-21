import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
import Login from "../Pages/Login/Login";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Register from "../Pages/Register/Register";
import CampDetails from "../components/CampDetails/CampDetails";
import PrivateRoute from "./PrivateRoute";
import OrganizerProfile from "../Pages/Dashboard/Dashboard/OrganizerProfile";
import AddCamp from "../Pages/Dashboard/Dashboard/AddCamp";
import ManageCamps from "../Pages/Dashboard/Dashboard/ManageCamps";
import ManageRegisteredCamps from "../Pages/Dashboard/Dashboard/ManageRegisteredCamps";
import Footer from "../Pages/Shared/Footer/Footer";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Analytics from "../Pages/Dashboard/Dashboard/Analytics/Analytics";
import RegisteredCamps from "../Pages/Dashboard/Dashboard/RegisteredCamps/RegisteredCamps";
import ParticipantProfile from "../Pages/Dashboard/Dashboard/ParticipantProfile/ParticipantProfile";
import PaymentHistory from "../Pages/Dashboard/Dashboard/PaymentHistory/PaymentHistory";
import AllParticipants from "../Pages/Dashboard/Dashboard/AllUser/AllUser";
import AllUser from "../Pages/Dashboard/Dashboard/AllUser/AllUser";





export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'available-camps',
                element: <AvailableCamps></AvailableCamps>
            },
            {
                path: 'camp-details/:id',
                element: <PrivateRoute><CampDetails></CampDetails></PrivateRoute>
            },

            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'footer',
                element: <Footer></Footer>
            },
        ],
    },
// admin dashboard
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'organizer-profile',
                element: <OrganizerProfile></OrganizerProfile>
            },
            {
                path: 'add-camp',
                element: <AddCamp />
            },
            { path: 'manage-camps', element: <ManageCamps /> },
            { path: 'manage-registered-camps', element: <ManageRegisteredCamps /> },
            { path: 'all-user', element: <AllUser></AllUser>},
            // Participant Dashboard Routes
            {
                path: 'analytics',
                element: <Analytics></Analytics>

            },
            {
                path: 'registered-camps',
                element: <RegisteredCamps></RegisteredCamps>

            },
            {
                path: 'participant-profile',
                element: <ParticipantProfile></ParticipantProfile>

            },
            {
                path: 'payment-history',
                element: <PaymentHistory></PaymentHistory>

            },
        ]

    },


]);