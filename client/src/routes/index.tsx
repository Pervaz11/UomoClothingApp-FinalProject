// Client
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
import Profile from "../pages/client/Profile";
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
            { path: "profil", element: <Profile /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "wishlist", element: <WishList /> },
            { path: "orders", element: <Orders /> },
            { path: "addresses", element: <Adresses /> },
            { path: "account", element: <AccountDetails /> },
            { path: "details/:id", element: <Details /> },
            { path: "details/accessory/:id", element: <AccessoryDetails /> },
            { path: "addToCart", element: <AddToCart /> },
        ],
    },

    // Admin
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { index: true, element: <AdminDashboard /> },
            { path: "users", element: <Users /> },
            { path: "products", element: <Products /> },
            { path: "partners", element: <PartnersAdminPanel /> },
            { path: "fag", element: <AdminFAQ /> },
            { path: "contact", element: <Contact /> },
            { path: "calendar", element: <AdminCalendar /> },
        ],
    },

    {
        path: "/",
        element: <CommonLayout />,
        children: [
            { path: "*", element: <NotFound /> },
            {
                path: "*",
                element: <NotFound />,
            },
            {
                path: "auth/forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "auth/reset-password/:token",
                element: <ResetPassword />,
            },
        ],
    },
];

export default ROUTES;
