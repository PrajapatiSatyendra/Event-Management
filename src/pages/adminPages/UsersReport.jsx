import { Option, Select } from "@material-tailwind/react";
import moment from "moment/moment";
import React, { useEffect, useReducer, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { FaBell, FaSearch } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import ViewUsersFeedbackModal from "../../components/modals/ViewUsersFeedbackModal";
import {
  feedBackDataGet,
  ReportData,
  UpdatefeedBackData,
} from "../../Urls/baseurl";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const UsersReport = () => {
  const [query, setQuery] = useState("");
  const [users, setusers] = useState([]);
  const [reducer, force] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    fetch(ReportData)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setusers(data);
      });
  }, [reducer]);

  // console.log(query);

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
            Users Report
          </h6>
          <div className="flex items-center gap-2 border rounded-md px-2 py-1.5 bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white">
            {/* <Select label="Select filter" onChange={(e) => { a(e) }}  >
              <Option value="Read">Read</Option>
              <Option value="Unread" >Unread</Option>
              <Option value="">All</Option>
            </Select> */}
            <ReactHTMLTableToExcel
              id="test-table-xls-button"
              className="download-table-xls-button"
              table="table-to-xls"
              filename="Lucknow Junction"
              sheet="Lucknow Junction"
              buttonText="Download as XLS"
            />
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className=" relative border-2 rounded-lg">
          <table
            className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            id="table-to-xls"
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Sr. no
                </th>
                <th scope="col" className="py-3 px-6">
                  Date
                </th>
                <th scope="col" className="py-3 px-6">
                  Event Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Event Venue
                </th>
                <th scope="col" className="py-3 px-6">
                  Event Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Customer Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Customer Email
                </th>
                <th scope="col" className="py-3 px-6">
                  Customer Number
                </th>
                <th scope="col" className="py-3 px-6">
                  Ticket Id
                </th>
                <th scope="col" className="py-3 px-6">
                  Payment
                </th>
                <th scope="col" className="py-3 px-6">
                  Package Name
                </th>
              </tr>
            </thead>
            <tbody>
              {users
                .filter((user) => {
                  return (
                    user?.eventId?.location?.toLowerCase().includes(query) ||
                    user?.eventId?.eventName?.toLowerCase().includes(query) ||
                    user?.customerName?.toLowerCase().includes(query) ||
                    user?.email?.toLowerCase().includes(query) ||
                    user?.ticketType?.toLowerCase().includes(query) ||
                    user?.eventId?._id?.toString().includes(query) ||
                    moment(user.createdAt).format("DD-MM-YY").includes(query) ||
                    user.ticketId?.toString().includes(query) ||
                    user?.ticketPrice?.toString().includes(query) ||
                    user?.mobileNumber?.toString().includes(query)
                  );
                })
                .map((user, key) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={user?._id}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-pre-wrap dark:text-white"
                    >
                      {key + 1}
                    </th>
                    <td className="py-4 px-6">
                      {moment(user.createdAt).format("DD-MM-YY")}
                    </td>
                    <td className="py-4 px-6">{user?.eventId?._id}</td>
                    <td className="py-4 px-6 flex mt-2 items-center gap-2">
                      {user?.eventId?.location}
                    </td>
                    <td className={`py-4 px-6 `}>{user?.eventId?.eventName}</td>
                    <td className={`py-4 px-6 `}>{user?.customerName}</td>
                    <td className={`py-4 px-6 `}>{user?.email}</td>
                    <td className={`py-4 px-6 `}>{user?.mobileNumber}</td>
                    <td className={`py-4 px-6 `}>{user?.ticketId}</td>
                    <td className={`py-4 px-6 `}>{user?.ticketPrice}</td>
                    <td className={`py-4 px-6 `}>{user?.ticketType}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersReport;
