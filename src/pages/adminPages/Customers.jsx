import React, { useState } from "react";
import { BiMessage } from "react-icons/bi";
import { FaBell, FaSearch } from "react-icons/fa";
import EventCards from "../../components/adminComponents/customers/EventCards";

const Customers = () => {
  const [query, setQurey] = useState("");
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

      <EventCards query={query} />
    </div>
  );
};

export default Customers;
