import Layout from "../layout/client/Layout";
import About from "../pages/client/About";
import ContactUs from "../pages/client/Contact";
import Home from "../pages/client/Home";
import Shop from "../pages/client/Shop";
import NotFound from "../pages/shared/NotFound";

const ROUTES = [
    // client
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <About />,
            },
            {
                path: "contact",
                element: <ContactUs />,
            },
            {
                path: "shop",
                element: <Shop />,
            },
        ],
    },
    // admin
    // {
    //     element: (
    //         <AdminRoute>
    //             <AdminLayout />
    //         </AdminRoute>
    //     ),
    //     path: "/admin/",
    //     children: [
    //         {
    //             index: true,
    //             element: <Dashboard />,
    //         },
    //         {
    //             path: "adminProfile",
    //             element: <AdminProfile />,
    //         },
    //         {
    //             path: "tourlist",
    //             element: <AdminTourList />,
    //         },
    //     ],
    // },
    // not found
    {
        path: "*",
        element: <NotFound />,
    },
];

export default ROUTES;
