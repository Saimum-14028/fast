import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import MainLayout from "./MainLayout";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "./DashboardLayout";
import AdminRoute from "./AdminRoute";
import Statistics from "./Statistics";
import AllParcels from "./AllParcels";
import AllUsers from "./AllUsers";
import AllDeliveryMen from "./AllDeliveryMen";
import UserRoute from "./UserRoute";
import BookParcel from "./BookParcel";
import MyParcels from "./MyParcels";
import MyProfile from "./MyProfile";
import DeliveryMenRoute from "./DeliveryMenRoute";
import MyDeliveryList from "./MyDeliveryList";
import MyReviews from "./MyReviews";
import UpdateParcel from "./UpdateParcel";
import AllAdmins from "./AllAdmins";
import Payment from "./Payment";
import PaymentSuccess from "./PaymentSuccess";

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
          <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>
        ),
        children: [
            // Admin Routes
            {
                index: true,
                element: (
                  <PrivateRoute><AdminRoute><Statistics></Statistics></AdminRoute></PrivateRoute>
                ),
            },
            {
              path: 'all admins',
                element: (
                  <PrivateRoute><AdminRoute><AllAdmins></AllAdmins></AdminRoute></PrivateRoute>
                ),
            },
            {
                path: 'all parcels',
                element: (
                  <PrivateRoute><AdminRoute><AllParcels></AllParcels></AdminRoute></PrivateRoute>
                ),
            },
            {
                path: 'all users',
                element: (
                  <PrivateRoute><AdminRoute><AllUsers></AllUsers></AdminRoute></PrivateRoute>
                ),
            },
            {
                path: 'all delivery men',
                element: (
                  <PrivateRoute><AdminRoute><AllDeliveryMen></AllDeliveryMen></AdminRoute></PrivateRoute>
                ),
            },
            // User Routes
            {
                path: 'book a parcel',
                element: (
                  <PrivateRoute><UserRoute><BookParcel></BookParcel></UserRoute></PrivateRoute>
                ),
            },
            {
              path : "update a parcel/:id",
              element : (
                <PrivateRoute><UserRoute><UpdateParcel></UpdateParcel></UserRoute></PrivateRoute>
              ),
              loader: ({params}) => fetch(`https://brainy-boa-shoulder-pads.cyclic.app/parcels/${params.id}`),
            },
            {
                path: 'my parcels',
                element: (
                  <PrivateRoute><UserRoute><MyParcels></MyParcels></UserRoute></PrivateRoute>
                ),
            },
            {
              path: 'payment/:id',
              element: (
                <PrivateRoute><UserRoute><Payment></Payment></UserRoute></PrivateRoute>
              ),
              loader: ({params}) => fetch(`https://brainy-boa-shoulder-pads.cyclic.app/parcels/${params.id}`),
            },
            {
              path: 'payment success',
              element: (
                <PrivateRoute><UserRoute><PaymentSuccess></PaymentSuccess></UserRoute></PrivateRoute>
              ),
            },
            {
                path: 'my profile',
                element: (
                  <PrivateRoute><UserRoute><MyProfile></MyProfile></UserRoute></PrivateRoute>
                ),
            },
            // Delivery Men Routes
            {
                path: 'my delivery list',
                element: (
                  <PrivateRoute><DeliveryMenRoute><MyDeliveryList></MyDeliveryList></DeliveryMenRoute></PrivateRoute>
                ),
            },
            {
                path: 'my reviews',
                element: (
                  <PrivateRoute><DeliveryMenRoute><MyReviews></MyReviews></DeliveryMenRoute></PrivateRoute>
                ),
            },
          ]
      }
])

export default myCreatedRoute;