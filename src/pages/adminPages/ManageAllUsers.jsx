import React, { useEffect, useReducer, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { FaBell, FaEdit, FaSearch } from "react-icons/fa";
import { ManageAllUser, ManageAllUserDelete } from "../../Urls/baseurl";



const ManageAllUsers = () => {
  const [query, setQuery] = useState("");
  const [allUsers, setallUsers] = useState([]);
  const [reducer, forceupdate] = useReducer(x => x + 1, 0)
  useEffect(() => {
    fetch(ManageAllUser).then(res => res.json()).then((data) => { setallUsers(data) })
  }, [reducer])

  let deleteUser = (id) => {
    fetch(`${ManageAllUserDelete}/${id}`, { method: "DELETE" }).then(res => res.json()).then((data) => {
      forceupdate()
    })

  }

  return (
    <div>
      <div className="text-white bg-[color:var(--gray)] p-5 shadow-lg">
        <div className="flex justify-between gap-5">
          <div className="flex gap-2 items-center bg-white rounded-lg px-3 py-1.5">
            <input
              value={query}
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

      <div className="p-5">
        <div className="overflow-x-auto relative border-2 rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  First Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Last Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email
                </th>
                {/* <th scope="col" className="py-3 px-6">
                  Status
                </th> */}
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {allUsers
                .filter((user) => {
                  return (
                    user?.email?.toLowerCase().includes(query) ||
                    user?.firstName?.toLowerCase().includes(query) ||
                    user?.lastName?.toLowerCase().includes(query) ||
                    user?._id?.toString().includes(query)

                  )

                })


                .map((user) => (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user?._id}>
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-pre-wrap dark:text-white"
                    >
                      {user?._id}
                    </th>
                    <td className="py-4 px-6">{user?.firstName}</td>
                    <td className="py-4 px-6">{user?.lastName}</td>
                    <td className="py-4 px-6">{user?.email}</td>
                    {/* <td
                      className={`py-4 px-6 cursor-default ${
                        user.status === "Block"
                          ? "text-red-500"
                          : "text-green-500"
                      } `}
                    >
                      {user?.status}
                    </td> */}
                    <td className="py-4 px-6">
                      <button onClick={(e) => { deleteUser(user._id) }}>
                        <AiFillDelete className="text-red-500 text-xl" />
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

export default ManageAllUsers;
