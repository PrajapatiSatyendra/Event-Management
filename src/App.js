import { useContext, useState } from "react";
import { FaBars } from "react-icons/fa";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/sidebar/Sidebar";
import {
  Outlet,
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import ManageEvents from "./pages/adminPages/ManageEvents";
import ManageUsers from "./pages/adminPages/ManageUsers";
import Tickets from "./pages/adminPages/Tickets";
import CreateEvent from "./pages/adminPages/CreateEvent";
import Home from "./pages/home/Home";
import CardDetails from "./components/cards/CardDetails";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Ticketnames from "./components/adminComponents/tickets/Ticketnames";
import Customers from "./pages/adminPages/Customers";
import CustomersTable from "./components/adminComponents/customers/CustomersTable";
import ManageEventTable from "./components/adminComponents/manage Event 👍/ManageEventTable";
import TicektsTable from "./components/adminComponents/customers/TicektsTable";
import EditEvent from "./components/adminComponents/manage Event 👍/EditEvent";
import EditTicket from "./components/adminComponents/tickets/EditTicket";
import Banner from "./pages/adminPages/Banner";
import AdminLogin from "./pages/adminPages/AdminLogin";
import SuccessfullBookingPage from "./pages/tickets/SuccessfullBookingPage";
import MyBookings from "./pages/tickets/MyBookings";
import AddUser from "./components/adminComponents/manageUsers/AddUser";
import EditUser from "./components/adminComponents/manageUsers/EditUser";
import AuthContext from "./store/auth-context";

import TicketForBooking from "./pages/tickets/TicketForBooking";
import AllEvents from "./pages/allEvents/AllEvents";
import { useSelector } from "react-redux";
import Protect_auth from "./store/Protect-auth";
import ManageAllUsers from "./pages/adminPages/ManageAllUsers";
import UserSidebar from "./components/sidebar/UserSidebar";
import PreviousTickets from "./pages/userPages/PreviousTickets";
import UpcomingEvents from "./pages/userPages/UpcomingEvents";
import UsersFeedback from "./pages/adminPages/UsersFeedback";
import UsersReport from "./pages/adminPages/UsersReport";
import Protect_auth_user from "./store/Protect_auth_user";
import PrivacyPolicy from "./pages/footerPages/PrivacyPolicy";
import TermsAndConditions from "./pages/footerPages/TermsAndConditions";
import About from "./pages/About";
import AdminHome from "./pages/adminPages/AdminHome";
import UserHome from "./pages/userPages/UserHome";
import UsersContactUs from "./pages/adminPages/UsersContactUs";
import RefundPolicies from "./pages/footerPages/RefundPolicies";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="lg:hidden z-20 sticky top-0">
        {isSidebarOpen ? (
          <div>
            <Sidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        ) : (
          <div className="bg-[#35364A] w-full text-white">
            <FaBars
              onClick={() => setIsSidebarOpen(true)}
              className="p-5 text-6xl "
            />
          </div>
        )}
      </div>

      <div className="flex">
        <div className="hidden lg:inline-block lg:flex-1">
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div className="lg:flex-[4] w-full">
          <div className={`${isSidebarOpen && "hidden"}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

const HomeLayout = () => {
  return (
    <div>
      <Navbar />

      <Outlet />
      <Footer />
    </div>
  );
};

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="lg:hidden z-20 sticky top-0">
        {isSidebarOpen ? (
          <div>
            <UserSidebar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        ) : (
          <div className="bg-[#35364A] w-full text-white">
            <FaBars
              onClick={() => setIsSidebarOpen(true)}
              className="p-5 text-6xl "
            />
          </div>
        )}
      </div>

      <div className="flex">
        <div className="hidden lg:inline-block lg:flex-1">
          <UserSidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
        </div>

        <div className="lg:flex-[4] w-full">
          <div className={`${isSidebarOpen && "hidden"}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const role = authCtx.role;
  const authRedux = useSelector((state) => state.auth);
  // console.log(authRedux);
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: <Protect_auth Component={AdminLayout} />,
      // element: isLoggedIn && role === "Admin" ? (<AdminLayout />) : <Navigate to='/adminlogin' />,
      children: [
        {
          path: "/admin",
          element: <Protect_auth Component={AdminHome} />,
          // element: isLoggedIn && role === "Admin" ? <ManageEvents /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/manageEvents",
          element: <Protect_auth Component={ManageEvents} />,
          // element: isLoggedIn && role === "Admin" ? <ManageEvents /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/manageEvents/totalEvents",
          element: <Protect_auth Component={ManageEventTable} />,
          // element: isLoggedIn && role === "Admin" ? <ManageEventTable /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/manageEvents/totalEvents/:id",
          element: <Protect_auth Component={EditEvent} />,
          // element: isLoggedIn && role === "Admin" ? <EditEvent /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/manageUsers",
          element: <Protect_auth Component={ManageUsers} />,
          // element: isLoggedIn && role === "Admin" ? <ManageUsers /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/manageAllUsers",
          element: <Protect_auth Component={ManageAllUsers} />,
          // element: isLoggedIn && role === "Admin" ? <ManageUsers /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/manageUsers/addUser",
          element: <Protect_auth Component={AddUser} />,
          // element: isLoggedIn && role === "Admin" ? <AddUser /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/manageUsers/editUser/:id",
          element: <Protect_auth Component={EditUser} />,
          // element: isLoggedIn && role === "Admin" ? <EditUser /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/tickets",
          element: <Protect_auth Component={Tickets} />,
          // element: isLoggedIn && role === "Admin" ? <Tickets /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/tickets/:id",
          element: <Protect_auth Component={Ticketnames} />,
          // element: isLoggedIn && role === "Admin" ? <Ticketnames /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/tickets/:id/:id",
          element: <Protect_auth Component={EditTicket} />, // eventID and then ticketID
          // element: isLoggedIn && role === "Admin" ? <EditTicket /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/createEvent",
          element: <Protect_auth Component={CreateEvent} />,
          // element: isLoggedIn && role === "Admin" ? <CreateEvent /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/customers",
          element: <Protect_auth Component={Customers} />,
          // element: isLoggedIn && role === "Admin" ? <Customers /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/customers/:id",
          element: <Protect_auth Component={TicektsTable} />,
          // element: isLoggedIn && role === "Admin" ? <TicektsTable /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/customers/:id/:id",
          element: <Protect_auth Component={CustomersTable} />, //eventID and then ticketID
          // element: isLoggedIn && role === "Admin" ? <CustomersTable /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/banner",
          element: <Protect_auth Component={Banner} />,
          // element: isLoggedIn && role === "Admin" ? <Banner /> : <Navigate to='/adminlogin' />,
        },
        // {
        //   path: "/admin/usersFeedback",
        //   element: <Protect_auth Component={UsersFeedback} />,
        //   // element: isLoggedIn && role === "Admin" ? <Banner /> : <Navigate to='/adminlogin' />,
        // },
        {
          path: "/admin/usersReport",
          element: <Protect_auth Component={UsersReport} />,
          // element: isLoggedIn && role === "Admin" ? <Banner /> : <Navigate to='/adminlogin' />,
        },
        {
          path: "/admin/usersNeedHelp",
          element: <Protect_auth Component={UsersContactUs} />,
          // element: isLoggedIn && role === "Admin" ? <Banner /> : <Navigate to='/adminlogin' />,
        },
      ],
    },

    {
      path: "/adminlogin",
      element: <AdminLogin />,
    },

    {
      path: "/user",
      // element: <UserLayout />,
      element: <Protect_auth_user Component={UserLayout} />,
      children: [
        {
          path: "/user",
          // element: <UpcomingEvents />,
          element: <Protect_auth_user Component={UserHome} />,
        },
        {
          path: "/user/upcomingEvents",
          // element: <UpcomingEvents />,
          element: <Protect_auth_user Component={UpcomingEvents} />,
        },
        {
          path: "/user/previousTickets/:id",
          // element: <PreviousTickets />,
          element: <Protect_auth_user Component={PreviousTickets} />,
        },
      ],
    },

    {
      path: "/",
      element: <HomeLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/allEvents",
          element: <AllEvents />,
        },
        {
          path: "/event/:id",
          element: <CardDetails />,
        },
        {
          path: "/success",
          element: <SuccessfullBookingPage />,
        },
        {
          path: "/bookings/:id", //send current user id
          element: <MyBookings />,
        },
        {
          path: "/downloadTicket/:id", //send current user id
          element: <TicketForBooking />,
        },
        {
          path: "/aboutUs",
          element: <About />,
        },
        {
          path: "/privacyPolicies",
          element: <PrivacyPolicy />,
        },
        {
          path: "/refundPolicies",
          element: <RefundPolicies />,
        },
        {
          path: "/termsAndConditions",
          element: <TermsAndConditions />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
