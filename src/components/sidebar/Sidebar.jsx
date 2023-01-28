import React, { useContext } from "react";
import { ImCross } from "react-icons/im";
import {
  BiCalendarEvent,
  BiHelpCircle,
  BiMessageSquareEdit,
} from "react-icons/bi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { TiTicket } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import { VscFeedback } from "react-icons/vsc";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/index-redux";
import Logo from "../../assets/logo.jpeg";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const path = useLocation().pathname.split("/")[2];
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const logoutAction = () => {
    dispatch(authActions.logoutHandler());
  };
  const logoutHandler = () => {
    authCtx.logout();
    logoutAction();
    navigation("/");
  };

  return (
    <div className="bg-[color:var(--gray)] text-white h-screen overflow-y-auto lg:sticky lg:top-0">
      <div className="lg:hidden">
        <span>
          <ImCross
            onClick={() => setIsSidebarOpen(false)}
            className="px-5 text-6xl"
          />
        </span>
      </div>

      <div className="p-5 lg:pt-14">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4 items-center justify-center">
            <Link to={`/`}>
              <img src={Logo} alt="" className="w-10 h-10 rounded-full " />
            </Link>
            <Link to="/">
              <h6 className="text-xl text-center font-bold font-poppins">
                Lucknow{" "}
                <span className="text-[color:var(--green)]">Junction</span>
              </h6>
            </Link>
          </div>

          <div className="flex flex-col gap-5">
            <Link to={`/admin/manageEvents`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "manageEvents" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <BiCalendarEvent className="text-2xl" />
                <h6 className="text-xl font-poppins">Manage Events</h6>
              </div>
            </Link>

            <Link to={`/admin/tickets`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "tickets" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <TiTicket className="text-2xl" />
                <h6 className="text-xl font-poppins">Tickets</h6>
              </div>
            </Link>

            <Link to={`/admin/manageUsers`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "manageUsers" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUserFriends className="text-2xl" />
                <h6 className="text-xl font-poppins">Manage Admin Users</h6>
              </div>
            </Link>

            <Link to={`/admin/manageAllUsers`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "manageAllUsers" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUsers className="text-2xl" />
                <h6 className="text-xl font-poppins">Manage All Users</h6>
              </div>
            </Link>

            <Link to={`/admin/createEvent`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "createEvent" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <AiOutlineAppstoreAdd className="text-2xl" />
                <h6 className="text-xl font-poppins">Create Event</h6>
              </div>
            </Link>

            <Link to={`/admin/customers`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "customers" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaUsers className="text-2xl" />
                <h6 className="text-xl font-poppins">Customers</h6>
              </div>
            </Link>

            <Link to={`/admin/banner`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "banner" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <BiMessageSquareEdit className="text-2xl" />
                <h6 className="text-xl font-poppins">Banners</h6>
              </div>
            </Link>

            {/* <Link to={`/admin/usersFeedback`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${path === "usersFeedback" && "bg-[#9999ac]"
                  } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <VscFeedback className="text-2xl" />
                <h6 className="text-xl">Users Feedback</h6>
              </div>
            </Link> */}

            <Link to={`/admin/usersReport`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "usersReport" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <VscFeedback className="text-2xl" />
                <h6 className="text-xl font-poppins">Reports</h6>
              </div>
            </Link>

            <Link to={`/admin/usersNeedHelp`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "usersNeedHelp" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <BiHelpCircle className="text-2xl" />
                <h6 className="text-xl font-poppins">Need Help?</h6>
              </div>
            </Link>
          </div>
          <div>
            <div className="px-7 py-4 flex justify-center">
              <button
                className="flex gap-5 items-center justify-center bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white px-3 py-2 rounded-lg w-full"
                onClick={logoutHandler}
              >
                <CgLogOut className="text-2xl" />
                <h4 className="text-lg font-poppins">Logout</h4>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
