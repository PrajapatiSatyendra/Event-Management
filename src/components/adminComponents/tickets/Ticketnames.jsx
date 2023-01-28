import React, { useEffect, useReducer, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { FaBell, FaEdit, FaSearch } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { getEventsbyid, ticketDelete } from "../../../Urls/baseurl";
import { toast, ToastContainer } from "react-toastify";

const Ticketnames = () => {
  const { id } = useParams();
  window.localStorage.setItem("TicketNameToeditTicketEventIDShare", id);
  const [data, setData] = useState();
  const [reducevalue, forceupdate] = useReducer((x) => x + 1, 0);
  const [query, setQurey] = useState("");

  useEffect(() => {
    fetch(`${getEventsbyid}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setData(data);
      });
  }, [reducevalue]);

  let hndlDelete = (ids) => {
    fetch(`${ticketDelete}/${id}/${ids}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Ticket deleted");
        forceupdate();
      });
  };

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

      <div className="p-5">
        <div className="overflow-x-auto relative border-2 rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Ticket ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Ticket Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Sold/Qty
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {data?.ticket
                ?.filter((user) => {
                  return (
                    user.ticketName.toLowerCase().includes(query) ||
                    user.ticketPrice.toLowerCase().includes(query) ||
                    user._id.toString().includes(query)
                  );
                })

                .map((t, i, a) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={t?._id}
                  >
                    <th
                      scope="row"
                      className="py-4 px-6 font-medium text-gray-900 whitespace-pre-wrap dark:text-white"
                    >
                      {t?._id}
                    </th>
                    <td className="py-4  whitespace-pre-wrap px-6">
                      {t?.ticketName}
                    </td>
                    <td className="py-4 px-6">₹ {t?.ticketPrice}</td>

                    <td className="py-4 px-6">
                      {a[i]?.customersId?.length}/{t?.numberOfTickets}
                    </td>

                    <td className="py-4 px-6 space-x-3">
                      <Link to={`/admin/tickets/${id}/${t?._id}`} state={t}>
                        <button>
                          <FaEdit className="text-[color:var(--btn-green)] hover:text-[color:var(--btn-hover-green)] text-xl" />
                        </button>
                      </Link>

                      <button>
                        <AiFillDelete
                          className="text-[color:var(--red)] hover:text-[color:var(--hover-red)] text-xl"
                          onClick={(e) => {
                            hndlDelete(t._id);
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
      <ToastContainer />
    </div>
  );
};

export default Ticketnames;
