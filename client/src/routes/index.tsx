import { type RouteObject } from "react-router-dom";
import Home from "../pages/client/Home";
import Layout from "../layout/client/Layout";

// Layouts
// import Layout from "../layout/Layout";
// import AuthLayout from "../layout/auth/AuthLayout";

// // Client Pages
// import Home from "../pages/client/Home";

// // Auth Pages
// import Login from "../pages/auth/Login";
// import Register from "../pages/auth/Register";
// import ForgotPassword from "../pages/auth/ForgotPassword";
// import ResetPassword from "../pages/auth/ResetPassword";
// import AuthCallback from "../pages/auth/AuthCallabck";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
        ],
    },
    // {
    //     path: "/auth",
    //     element: <AuthLayout />,
    //     children: [
    //         {
    //             path: "login",
    //             element: <Login />,
    //         },
    //         {
    //             path: "register",
    //             element: <Register />,
    //         },
    //         {
    //             path: "forgot-password",
    //             element: <ForgotPassword />,
    //         },
    //         {
    //             path: "reset-password/:token",
    //             element: <ResetPassword />,
    //         },
    //         {
    //             path: "success/:token",
    //             element: <AuthCallback />,
    //         },
    //     ],
    // },
];

export default routes;
