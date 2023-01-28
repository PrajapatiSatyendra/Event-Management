import { Option, Select } from "@material-tailwind/react";
import React, { useEffect, useReducer, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { FaBell, FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import ViewUsersNeedHelpData from "../../components/modals/ViewUsersNeedHelpData";
import {
  ContactQurey,
  contentQureyStatusPut,
  feedBackDataGet,
  UpdatefeedBackData,
} from "../../Urls/baseurl";

// const allusers = [
//   {
//     _id: 1,
//     name: "Aman",
//     email: "abcd@gmail.com",
//     msg: "hello aman this side",
//     status: true,
//   },
//   {
//     _id: 2,
//     name: "Punit",
//     email: "abcd@gmail.com",
//     msg: "hello punit this side",
//     status: false,
//   },
// ];

const UsersContactUs = () => {
  const [query, setQuery] = useState("");
  const [users, setusers] = useState([]);
  const [reducer, force] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetch(ContactQurey)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setusers(data);
      });
  }, [reducer]);

  //   console.log(query);

  let a = (e) => {
    // if (e == "Read") {
    //   setQuery(true);
    // } else if (e == "Unread") {
    //   setQuery(false);
    // } else {
    //   setQuery("");
    // }
    setQuery(e);
  };

  return (
    <div>
      <div className="text-white bg-[color:var(--gray)] p-5 shadow-lg">
        <div className="flex justify-between gap-5">
          <div className="flex gap-2 items-center bg-white rounded-lg px-3 py-1.5">
            <input
              onChange={(e) => {
                setQuery(e.target.value.toLowerCase());
              }}
              type="text"
              placeholder="Search for events"
              className="px-3 py-1 border-none outline-none text-black"
            />
            <FaSearch className="text-gray-500" />
          </div>
          <div className="flex gap-5 items-center">
            <BiMessage size={20} />
            <FaBell size={20} />
          </div>
        </div>
      </div>

      <div className="px-5 pt-5">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <h6 className="text-lg font-medium lg:text-xl lg:font-semibold">
            Users Feedback
          </h6>
          <div className="flex gap-5 items-center">
            <Select
              label="Select filter"
              onChange={(e) => {
                a(e);
              }}
            >
              <Option value="Read">Read</Option>
              <Option value="Unread">Unread</Option>
              <Option value="">All</Option>
            </Select>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="overflow-x-auto relative border-2 rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  User Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => {
                  return (
                    user?._id?.toString().includes(query) ||
                    user?.email?.toLowerCase().includes(query) ||
                    user?.name?.toLowerCase().includes(query) ||
                    user.status.toString().includes(query) ||
                    user.status.toLowerCase().includes(query)
                  );
                })

                .map((user) => (
                  <MyFunction user={user} force={force} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MyFunction = ({ user, force }) => {
  const [viewModalOpened, setViewModalOpened] = useState(false);

  const UPDATE = (id) => {
    fetch(`${contentQureyStatusPut}/${id}`, { method: "PUT" })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        force();
      });
  };

  return (
    <tr
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
      key={user?._id}
    >
      <th
        scope="row"
        className="py-4 px-6 font-medium text-gray-900 whitespace-pre-wrap dark:text-white"
      >
        {user?._id}
      </th>
      <td className="py-4 px-6">{user?.name}</td>
      <td className="py-4 px-6">{user?.email}</td>
      <td
        className={`py-4 px-6 cursor-default ${
          user?.status === "Unread" ? "text-red-500" : "text-green-500"
        } `}
      >
        {user?.status}
      </td>
      <td className="py-4 px-6">
        <button
          onClick={() => {
            setViewModalOpened(true);
            UPDATE(user._id);
          }}
          className="flex items-center gap-2 border rounded-md px-2 py-1.5 bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white"
        >
          View <FiEye />
        </button>
        <ViewUsersNeedHelpData
          viewModalOpened={viewModalOpened}
          setViewModalOpened={setViewModalOpened}
          msg={user?.message}
        />
      </td>
    </tr>
  );
};

export default UsersContactUs;
