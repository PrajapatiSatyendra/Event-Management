import React, { useEffect, useReducer, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { AiFillDelete, AiOutlinePlus } from "react-icons/ai";
import { FaBell, FaSearch, FaEdit } from "react-icons/fa";
import {
  manageUserDelete,
  manageUserGet,
  manageUserstatusUpdate,
} from "../../Urls/baseurl";
import { Link } from "react-router-dom";

// const users = [
//   {
//     id: 1,
//     name: "Aman",
//     role: "Admin",
//     email: "abcd@gmail.com",
//     status: true,
//   },
//   {
//     id: 2,
//     name: "super",
//     role: "Superadmin",
//     email: "efgh@gmail.com",
//     status: false,
//   },
// ];

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [reducevalue, forceupdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetch(manageUserGet)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, [reducevalue]);

  let hndlDelete = (id) => {
    fetch(`${manageUserDelete}/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        forceupdate();
      });
  };

  const statusChangeHandler = (id) => {
    try {
      fetch(`${manageUserstatusUpdate}/${id}`, {
        method: "put",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          forceupdate();
          if (!data.ok) {
            throw new Error(data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  let [query, setQurey] = useState("");

  return (
    <div>
      <div className="text-white bg-[color:var(--gray)] p-5 shadow-lg">
        <div className="flex justify-between gap-5">
          <div className="flex gap-2 items-center bg-white rounded-lg px-3 py-1.5">
            <input
              value={query}
              onChange={(e) => {
                setQurey(e.target.value);
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

      <div className="p-5 flex justify-between">
        <h2 className="text-lg lg:text-xl font-medium">Manage users</h2>
        <Link to={`/admin/manageUsers/addUser`}>
          <button className="flex items-center gap-3 border bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md px-3 py-1.5 text-white lg:font-semibold">
            <AiOutlinePlus /> Add User
          </button>
        </Link>
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
                  Name
                </th>
                {/* <th scope="col" className="py-3 px-6">
                  Role
                </th> */}
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
                    user.userName.toLowerCase().includes(query) ||
                    user.email.toLowerCase().includes(query) ||
                    user.status.toLowerCase().includes(query) ||
                    user._id.toString().includes(query)
                  );
                })

                .map((user) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-pre-wrap dark:text-white"
                    >
                      {user?._id}
                    </th>
                    <td className="py-4 px-6">{user?.userName}</td>
                    {/* <td className="py-4 px-6">{user?.role}</td> */}
                    <td className="py-4 px-6">{user?.email}</td>
                    <td
                      className={`py-4 px-6 cursor-default ${
                        user.status === "Block"
                          ? "text-red-500"
                          : "text-green-500"
                      } `}
                      onClick={(e) => {
                        statusChangeHandler(user._id);
                      }}
                    >
                      {user?.status}
                    </td>
                    <td className="py-4 px-6 space-x-3">
                      <Link
                        to={`/admin/manageUsers/editUser/${user?._id}`}
                        state={user}
                      >
                        <button>
                          <FaEdit className="text-green-500 text-xl" />
                        </button>
                      </Link>
                      <button>
                        <AiFillDelete
                          className="text-red-500 text-xl"
                          onClick={(e) => {
                            hndlDelete(user._id);
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
