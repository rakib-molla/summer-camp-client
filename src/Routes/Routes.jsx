
import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import About from "../Pages/About/About";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ErrorPage from "../Pages/Shared/ErrorPage/ErrorPage";
import TestPage from "../Pages/TestPage/TestPage";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import AddItem from "../Pages/Dashboard/AdminHome/AddItem/AddItem";
import ManageClasses from "../Pages/Dashboard/AdminHome/ManageClasses/ManageClasses";
import AddClass from "../Pages/Dashboard/Instructor/AddClass/AddClass";
import ManageUsers from "../Pages/Dashboard/AdminHome/ManageUsers/ManageUsers";
import Instructor from "../Pages/Instructor/Instructor";
import MyClasses from "../Pages/Dashboard/Instructor/MyClasses/MyClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import SelectClass from "../Pages/Dashboard/SelectClass/SelectClass";
import Classes from "../Pages/Home/Classes/Classes";
import EnrollClass from "../Pages/Dashboard/EnrollClass/EnrollClass";

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
        path: 'classes',
        element: <Classes></Classes>
      },
      {
        path: 'test',
        element: <PrivateRoute><TestPage></TestPage></PrivateRoute>
      },
      {
        path: 'instructor',
        element: <Instructor></Instructor>
      }
    ]
  },
  {
    path: 'login',
    element: <Login></Login>
  },
  {
    path: 'signup',
    element: <SignUp></SignUp>
  },
  
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children:[
      {
        path:'additem',
        element: <PrivateRoute><AddItem></AddItem></PrivateRoute>
      },
      {
        path: 'manageclasses',
        element: <PrivateRoute><ManageClasses></ManageClasses></PrivateRoute>
      },
      {
        path: 'addclass',
        element: <PrivateRoute><AddClass></AddClass></PrivateRoute>
      },
      {
        path: 'manageusers',
        element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
      },
      {
        path: 'myclasses',
        element: <PrivateRoute><MyClasses></MyClasses></PrivateRoute>
      },
      {
        path: 'payment/:id',
        element: <PrivateRoute><Payment></Payment></PrivateRoute>,
      },
      {
        path: 'select-class',
        element: <PrivateRoute> <SelectClass></SelectClass></PrivateRoute>
      },
      {
        path: 'enrol-class',
        element: <PrivateRoute><EnrollClass></EnrollClass></PrivateRoute>
      }
    ]
  }
]);