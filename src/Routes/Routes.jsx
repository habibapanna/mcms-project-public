import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import AvailableCamps from "../Pages/AvailableCamps/AvailableCamps";
  
 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/available-camps',
            element: <AvailableCamps></AvailableCamps>
        },
      ]
    },
  ]);