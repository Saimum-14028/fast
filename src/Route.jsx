import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "./DashboardLayout";

const myCreatedRoute =  createBrowserRouter([
    {
        path : "/",
        element : <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>,
        children : [
            {
                path : "/",
                element : <Home></Home>,
            },
            {
                path: "login",
                element : <Login></Login>
            },
            {
                path: "register",
                element : <Register></Register>
            },
        ]
    },

    {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <DashboardLayout></DashboardLayout>
          </PrivateRoute>
        ),
        children: [
            
        ]
    }
])

export default myCreatedRoute;