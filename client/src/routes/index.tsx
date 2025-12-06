import Layout from "../layout/client/Layout";
import About from "../pages/client/About";
import AccountDetails from "../pages/client/AccountDetails";
import Adresses from "../pages/client/Addresses";
import ContactUs from "../pages/client/Contact";
import Dashboard from "../pages/client/Dashboard";
import Home from "../pages/client/Home";
import Orders from "../pages/client/Orders";
import Register from "../pages/client/Register";
import Shop from "../pages/client/Shop";
import WishList from "../pages/client/WishList";
import Login from "../pages/shared/Login";
import NotFound from "../pages/shared/NotFound";
import Details from "../pages/client/Details";
import AddToCart from "../pages/client/AddToCart";

// Admin
import AdminLayout from "../layout/admin/Layout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AccessoryDetails from "../pages/client/AccesoryDetails";
import Users from "../components/admin/Users";
import Products from "../pages/admin/ProductManagament";
import PartnersAdminPanel from "../pages/admin/PartnersAdminPanel";
import AdminFAQ from "../pages/admin/FagController";
import Contact from "../pages/admin/ContactManage";
import AdminCalendar from "../pages/admin/Calenadar";
import CommonLayout from "../layout/common";
import ForgotPassword from "../pages/client/ForgotPassword";
import ResetPassword from "../pages/client/ResetPaswor";
import PaymentSuccess from "../pages/client/PaymentSuccsess";
import CourierPage from "../pages/courier/CourierPage";

import { ProtectedRoute } from "../components/ProtectedRoute";
import ProfilePage from "../pages/client/Profile";

const ROUTES = [
    // Client 
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <ContactUs /> },
            { path: "shop", element: <Shop /> },
            { path: "register", element: <Register /> },
            { path: "login", element: <Login /> },
            { path: "details/:id", element: <Details /> },
            { path: "details/accessory/:id", element: <AccessoryDetails /> },
            { path: "payment-success", element: <PaymentSuccess /> },
            { path: "profile", element: <ProfilePage userId={""} token={""} /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "wishlist", element: <WishList /> },
            { path: "orders", element: <Orders /> },
            { path: "addresses", element: <Adresses /> },
            { path: "account", element: <AccountDetails /> },
            { path: "addToCart", element: <AddToCart /> },
            {
                path: "/courier",
                element: <CourierPage />,
            },
        ],
    },

    {
        element: <ProtectedRoute roles={["admin", "superadmin"]} />,
        children: [
            {
                path: "/admin",
                element: <AdminLayout />,
                children: [
                    { index: true, element: <AdminDashboard /> },
                    { path: "products", element: <Products /> },
                    { path: "partners", element: <PartnersAdminPanel /> },
                    { path: "fag", element: <AdminFAQ /> },
                    { path: "contact", element: <Contact /> },
                    { path: "calendar", element: <AdminCalendar /> },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute roles={["superadmin"]}>
            <AdminLayout />
        </ProtectedRoute>,
        children: [
            {
                path: "/admin/users",
                element: <Users />,
            },
        ],
    },

    {
        element: <ProtectedRoute roles={["courier"]} />,
        children: [

        ],
    },



    // Common Layout (error and auth routes)
    {
        path: "/",
        element: <CommonLayout />,
        children: [
            { path: "*", element: <NotFound /> },
            { path: "auth/forgot-password", element: <ForgotPassword /> },
            { path: "auth/reset-password/:token", element: <ResetPassword /> },

        ],
    },
];

export default ROUTES;
