import React, { useReducer, useState } from "react";
import { ImCross } from "react-icons/im";
import { FaBars } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { TiTicket } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import SignInModal from "../modals/signupModals/SignInModal";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";
import { logoutGoogle } from "../modals/signupModals/google/firebase";
import Logo from "../../assets/logo.jpeg";

const Navbar = () => {
  const [navbar, setNavbar] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false);
  // const [reducer, forceData] = useReducer(x => x + 1, 0)
  const authCtx = useContext(AuthContext);
  // const IsLoggedIn = authCtx.IsLoggedIn;
  const IsLoggedIn = JSON.parse(localStorage.getItem("IsLoggedIn"));
  const navigation = useNavigate();
  const logoutHandler = () => {
    authCtx.logout();
    navigation("/");
  };

  const Data = window.localStorage.getItem("userID");
  const Name = window.localStorage.getItem("Name");
  const userID = Data ? Data : authCtx.userId;

  return (
    <nav className="w-full bg-[color:var(--gray)] shadow sticky top-0 z-50">
      <div className="justify-between px-4 mx-auto lg:max-w-[90vw] md:items-center md:flex md:px-8">
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <div className="flex gap-2 items-center">
              <Link to={`/`}>
                <img src={Logo} className="w-10 h-10 rounded-full" alt="" />
              </Link>
              <Link to="/">
                <h6 className="text-xl text-center font-bold text-white font-poppins">
                  Lucknow{" "}
                  <span className="text-[color:var(--green)]">Junction</span>
                </h6>
              </Link>
            </div>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <ImCross className="text-white text-xl" />
                ) : (
                  <FaBars className="text-white text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? "block" : "hidden"
            }`}
          >
            {/* <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <div className="flex gap-5 items-center bg-white text-black rounded-md px-3 py-1.5">
                <input
                  type="text"
                  placeholder="Search for events, interests or activities"
                  className="border-none outline-none px-1 py-1 w-full"
                />

                <BiSearch className="text-xl" />
              </div>

              <li className="text-white hover:text-indigo-200 cursor-pointer flex items-center gap-2">
                <ImLocation />
                Lucknow
              </li>
            </ul> */}

            <div className="mt-3 space-y-2 md:hidden ">
              {IsLoggedIn && (
                <Link to={`/user`}>
                  <span
                    className="w-full px-4 py-2 text-center text-white bg-[color:var(--blue)] rounded-md shadow hover:bg-[color:--hover-blue] cursor-pointer
                  flex justify-center gap-2 items-center"
                  >
                    Welcome <span className="text-lg">{Name}</span>
                    <TiTicket />
                  </span>
                </Link>
              )}

              {!IsLoggedIn ? (
                <>
                  {" "}
                  <span
                    onClick={() => setOpenSignInModal(true)}
                    className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 cursor-pointer"
                  >
                    Sign Up
                  </span>
                  <SignInModal
                    openSignInModal={openSignInModal}
                    setOpenSignInModal={setOpenSignInModal}
                  />
                </>
              ) : (
                <span
                  className="w-full px-4 py-2 text-center text-white bg-[color:var(--red)] rounded-md shadow hover:bg-[color:var(--hover-red)] cursor-pointer
               flex justify-center gap-2 items-center"
                  onClick={() => {
                    logoutHandler();
                    logoutGoogle();
                  }}
                >
                  Logout
                  <FiLogOut />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="hidden space-x-2 md:flex items-center">
          {/* <Link to={`/bookings/${authCtx.userId}`}> */}
          {IsLoggedIn && (
            <Link to={`/user`}>
              {/* <span className="px-4 py-2 text-white bg-[color:var(--blue)] rounded-md whitespace-nowrap w-full shadow hover:bg-[color:var(--hover-blue)] cursor-pointer flex gap-2 items-center">
                Go To Dashboard
                <TiTicket />
              </span> */}
              <div className="px-4 py-2 text-white whitespace-nowrap w-full cursor-pointer flex gap-2 items-center">
                Welcome <span className="text-lg">{Name}</span>
              </div>
            </Link>
          )}

          {!IsLoggedIn ? (
            <span
              onClick={() => setOpenSignInModal(true)}
              className="px-4 py-2 text-white bg-gray-600 rounded-md w-full shadow hover:bg-gray-700 cursor-pointer"
            >
              Sign Up
            </span>
          ) : (
            <span
              className="px-4 py-2 text-white bg-[color:var(--red)] rounded-md w-full shadow hover:bg-[color:var(--hover-red)] cursor-pointer flex gap-2 items-center"
              onClick={() => {
                logoutHandler();
                logoutGoogle();
              }}
            >
              Logout
              <FiLogOut />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
