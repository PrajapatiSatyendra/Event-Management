import React, { useContext, useState } from "react";
import { ImCross } from "react-icons/im";
import { BiCalendarEvent, BiMessageSquareEdit } from "react-icons/bi";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaUserFriends, FaUsers } from "react-icons/fa";
import { TiTicket } from "react-icons/ti";
import { Link, useLocation } from "react-router-dom";
import { CgLogOut } from "react-icons/cg";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";
import UserFeedbackModal from "../modals/usersModals/UserFeedbackModal";
import { VscFeedback } from "react-icons/vsc";
import { logoutGoogle } from "../modals/signupModals/google/firebase";

const UserSidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const path = useLocation().pathname.split("/")[2];
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();

  const [openFeedbackModal, setOpenFeedbackModal] = useState(false);

  const logoutHandler = () => {
    authCtx.logout();
    navigation("/");
  };
  const Data = window.localStorage.getItem("userID");
  // const userID = Data ? Data : authCtx.userId

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
        <div className="min-h-[85vh] flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-4 items-center justify-center">
              <span className="bg-white w-10 h-10 rounded-full"></span>
              <Link to="/">
                <h6 className="text-xl text-center font-bold font-poppins">
                  Lucknow{" "}
                  <span className="text-[color:var(--green)]">Junction</span>
                </h6>
              </Link>
            </div>

            <Link to={`/`}>
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "upcomingEvents" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <BiCalendarEvent className="text-2xl" />
                <h6 className="text-xl font-poppins">Upcoming Events</h6>
              </div>
            </Link>

            <Link
              to={`/user/previousTickets/${window.localStorage.getItem(
                "userID"
              )}`}
            >
              <div
                className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${
                  path === "previousTickets" && "bg-[#9999ac]"
                } `}
                onClick={() => setIsSidebarOpen(false)}
              >
                <TiTicket className="text-2xl" />
                <h6 className="text-xl font-poppins">Previous Tickets</h6>
              </div>
            </Link>

            {/* <div
              className={`p-2 flex gap-3 items-center hover:bg-[#9999ac] rounded-lg cursor-pointer ${path === "feedback" && "bg-[#9999ac]"
                } `}
              onClick={() => {
                setOpenFeedbackModal(true);
                // setIsSidebarOpen(false);
              }}
            >
              <VscFeedback className="text-2xl" />
              <h6 className="text-xl">Feedback</h6>
            </div>
            <UserFeedbackModal
              openFeedbackModal={openFeedbackModal}
              setOpenFeedbackModal={setOpenFeedbackModal}
            /> */}
          </div>
          <div>
            <div className="px-7 py-4 flex justify-center">
              <button
                className="flex gap-5 items-center justify-center bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white px-3 py-2 rounded-lg w-full"
                onClick={() => {
                  logoutHandler();
                  logoutGoogle();
                }}
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

export default UserSidebar;
