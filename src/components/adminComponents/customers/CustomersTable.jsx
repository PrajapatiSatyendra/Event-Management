import moment from "moment/moment";
import React, { useState } from "react";
import { BiMessage } from "react-icons/bi";
import { FaBell, FaSearch } from "react-icons/fa";
import { useLocation, useParams } from "react-router";

const CustomersTable = () => {
  const customersData = useLocation().state;

  // this is ticket id
  // const { id } = useParams()
  // this is event id
  // const ids =window.localStorage.getItem('TicketNameTocustermerTicketEventIDShare')

  // console.log(customersData.customersId);

  const [query, setQuery] = useState("");

  return (
    <div>
      <div className="text-white bg-[color:var(--gray)] p-5 shadow-lg">
        <div className="flex justify-between gap-5">
          <div className="flex gap-2 items-center bg-white rounded-lg px-3 py-1.5">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
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
          {customersData?.customersId ? (
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Email
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Buy Date
                  </th>
                  {/* <th scope="col" className="py-3 px-6">
                    Event Date
                  </th> */}
                  <th scope="col" className="py-3 px-6">
                    Ticket Price
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Payment Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {customersData?.customersId
                  .filter((user) => {
                    return (
                      user.customerName.toLowerCase().includes(query) ||
                      user.email.toLowerCase().includes(query) ||
                      // user.ticketPrice.includes(query) ||
                      moment(user?.createdAt)
                        .format("DD-MM-YY")
                        .toLowerCase()
                        .includes(query) ||
                      user._id.toString().includes(query)
                    );
                  })
                  .map((cust) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={cust?._id}
                    >
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-pre-wrap dark:text-white"
                      >
                        {cust?._id}
                      </th>
                      <td className="py-4 px-6">{cust?.customerName}</td>
                      <td className="py-4 px-6">{cust?.email}</td>
                      <td className="py-4  whitespace-pre-wrap px-6">
                        {moment(cust?.createdAt).format("DD-MM-YY")}
                      </td>
                      {/* <td className="py-4 px-6">{cust?.eventDate}</td> */}
                      <td className="py-4 px-6">₹ {cust?.ticketPrice}</td>
                      <td className="py-4 px-6">{cust?.order_status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center md:text-lg py-4">
              <p>No customers of this ticket</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersTable;
