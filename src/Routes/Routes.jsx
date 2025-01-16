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
import OrganizerDashboard from "../Pages/Dashboard/OrganizerDashboard/OrganizerDashboard";
import OrganizerProfile from "../Pages/Dashboard/OrganizerDashboard/OrganizerProfile";
import AddCamp from "../Pages/Dashboard/OrganizerDashboard/AddCamp";
import ManageCamps from "../Pages/Dashboard/OrganizerDashboard/ManageCamps";
import ManageRegisteredCamps from "../Pages/Dashboard/OrganizerDashboard/ManageRegisteredCamps";

 
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
      ],
    },

    {  
            path: 'organizer-dashboard',
            element: <PrivateRoute><OrganizerDashboard></OrganizerDashboard></PrivateRoute>,
            children: [
                {
                    path: 'organizer-profile',
                    element: <OrganizerProfile></OrganizerProfile>
                },
                { path: 'add-camp', 
                element: <AddCamp /> },
                { path: 'manage-camps', element: <ManageCamps /> },
                { path: 'manage-registered-camps', element: <ManageRegisteredCamps /> },
            ]
        
    }

  ]);