import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import MainLayout from "./MainLayout";
import Home from "./Home";

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
        ]
    }
])

export default myCreatedRoute;