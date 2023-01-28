import React, { useState } from "react";
import { BiMessage } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { manageUserUpdate } from "../../../Urls/baseurl";

const EditUser = () => {
  const nav = useNavigate();
  const user = useLocation().state;

  const [userName, setUsername] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [mobile, setMoblie] = useState(user.mobile);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const formHandler = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Password and confirm password doesn't match!");
        return;
      }
      const formData = {
        userName,
        email,
        mobile,
        password,
      };
      const result = await fetch(`${manageUserUpdate}/${user._id}`, {
        method: "put",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json",
        },
      });
      // alert("submitted");
      toast.success("User Data updated!");
      setTimeout(() => {
        nav("/admin/manageUsers");
      }, 2000);
      // if (!result.ok) {
      //   throw new Error(result);
      // }
      const jsonData = await result.json();
      // console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  let a = () => {
    toast("Redirecting to Manage Users");
    setTimeout(() => {
      nav("/admin/manageUsers");
    }, 1000);
  };

  return (
    <div>
      <div className="text-white bg-[color:var(--gray)] p-5 shadow-lg">
        <div className="flex justify-end gap-5">
          {/* <div className="flex gap-2 items-center bg-white rounded-lg px-3 py-1.5">
            <input
              type="text"
              placeholder="Search for events"
              className="px-3 py-1 border-none outline-none text-black"
            />
            <FaSearch className="text-gray-500" />
          </div> */}
          {/* <div className="flex gap-5 items-center">
            <BiMessage size={20} />
            <FaBell size={20} />
          </div> */}
        </div>
      </div>

      <div className="p-5 sm:px-10 md:px-12 lg:px-14 xl:px-16">
        <h2 className="text-[color:var(--blue)] text-2xl font-bold py-8">
          Edit user
        </h2>

        <form onSubmit={formHandler}>
          <div className="flex flex-col gap-5 lg:gap-8">
            <div>
              <label htmlFor="name">Name</label>
              <input
                value={userName}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                type="text"
                id="name"
                placeholder="user name"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                id="email"
                placeholder="user email"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              />
            </div>

            <div>
              <label htmlFor="mobileNum">Mobile Number</label>
              <input
                value={mobile}
                onChange={(e) => {
                  setMoblie(e.target.value);
                }}
                type="text"
                id="mobileNum"
                placeholder="mobile number"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="text"
                id="password"
                placeholder="password"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="text"
                id="confirmPassword"
                placeholder="confirm password"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              />
            </div>

            <div className="flex gap-5 flex-wrap items-center justify-end pt-10 pb-5">
              <button
                className="px-4 py-1.5 text-lg md:text-xl font-medium lg:font-semibold border rounded-md bg-[color:var(--red)] hover:bg-[color:var(--hover-red)] text-white"
                onClick={a}
              >
                Discard
              </button>
              <button className="px-4 py-1.5 text-lg md:text-xl font-medium lg:font-semibold border rounded-md bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)]  text-white">
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditUser;
