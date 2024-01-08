import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./ErrorPage";

const myCreatedRoute =  createBrowserRouter([
    {
        path : "/",
        errorElement: <ErrorPage></ErrorPage>,
    }
])

export default myCreatedRoute;