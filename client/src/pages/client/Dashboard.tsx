import { useState, lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

// Lazy load components
const Profile = lazy(() => import("./Profile"));
const Orders = lazy(() => import("./Orders"));
const Addresses = lazy(() => import("./Addresses"));
const AccountDetails = lazy(() => import("./AccountDetails"));
const Wishlist = lazy(() => import("./WishList"));

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [tabLoading, setTabLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    if (tab === activeTab) return;
    setTabLoading(true);

    setTimeout(() => {
      setActiveTab(tab);
      setTabLoading(false);
    }, 500);

    // Close sidebar on small screens after clicking
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const renderComponent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      case "addresses":
        return <Addresses />;
      case "account":
        return <AccountDetails />;
      case "wishlist":
        return <Wishlist />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex min-h-screen relative">
      {/* Sidebar toggle button for small screens */}
      <button
        className="md:hidden absolute top-4 left-4 z-50 text-2xl text-red-600"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 h-screen bg-white border-r transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold px-6 py-4">MY ACCOUNT</h2>
        <nav className="flex flex-col space-y-4 px-6 mt-4">
          <button
            className={`text-left text-red-600 font-bold hover:text-black transition relative px-4 py-2 dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all hover:scale-110 duration-500 before:duration-300 hover:before:w-7 ${
              activeTab === "dashboard" ? "text-red-600 font-bold" : ""
            }`}
            onClick={() => handleTabClick("dashboard")}
          >
            DASHBOARD
          </button>
          <button
            className={`text-left hover:scale-110 duration-500 text-red-600 font-bold hover:text-black transition relative px-4 py-2 dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7 ${
              activeTab === "orders" ? "text-red-600 font-bold" : ""
            }`}
            onClick={() => handleTabClick("orders")}
          >
            ORDERS
          </button>
          <button
            className={`text-left hover:scale-110 duration-500 text-red-600 font-bold hover:text-black transition relative px-4 py-2 dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7 ${
              activeTab === "addresses" ? "text-red-600 font-bold" : ""
            }`}
            onClick={() => handleTabClick("addresses")}
          >
            ADDRESSES
          </button>
          <button
            className={`text-left hover:scale-110 duration-500 text-red-600 font-bold hover:text-black transition relative px-4 py-2 dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7 ${
              activeTab === "account" ? "text-red-600 font-bold" : ""
            }`}
            onClick={() => handleTabClick("account")}
          >
            ACCOUNT DETAILS
          </button>
          <button
            className={`text-left text-red-600 font-bold hover:text-black transition relative px-4 py-2 hover:scale-110 duration-500 dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7 ${
              activeTab === "wishlist" ? "text-red-600 font-bold" : ""
            }`}
            onClick={() => handleTabClick("wishlist")}
          >
            WISHLIST
          </button>
          <button
            onClick={handleLogout}
            className="text-left flex gap-3 text-red-600 font-bold hover:text-black transition relative px-4 py-2 hover:scale-110 duration-500 dark:hover:text-black before:absolute before:bottom-0 before:left-4 before:w-0 before:h-[2px] before:bg-black dark:before:bg-black before:transition-all text-sm before:duration-300 hover:before:w-7"
          >
            LOGOUT
          </button>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        {tabLoading ? (
          <div className="flex justify-center items-center mt-14">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="flex justify-center items-center mt-14">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
              </div>
            }
          >
            {renderComponent()}
          </Suspense>
        )}
      </main>
    </div>
  );
}
