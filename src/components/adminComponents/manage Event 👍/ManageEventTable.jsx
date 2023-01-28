import React, { useContext, useEffect, useReducer, useState } from "react";
import { BiMessage } from "react-icons/bi";
import { FaBell, FaSearch, FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";
import moment from "moment/moment";
import {
  manageEventCatagiry,
  manageEventDelete,
  manageEventUpdatePosition,
  updateTrending,
} from "../../../Urls/baseurl";
import { ToastContainer, toast } from "react-toastify";
import { Switch } from "@material-tailwind/react";
import AuthContext from "../../../store/auth-context";

const ManageEventTable = () => {
  const location = useLocation();
  const [data, setData] = useState();
  const [isSelected, setIsSelected] = useState("publish");
  const [reducevalue, forceupdate] = useReducer((x) => x + 1, 0);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    let categary = window.localStorage.getItem("categiry");

    fetch(`${manageEventCatagiry}`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ categary }),
    })
      .then((res) => res.json())
      .then((data1) => {
        setData(data1);
      });
  }, [reducevalue]);

  // console.log(data);
  const [id, setId] = useState();
  let findID = (e, id) => {
    setId(id);
  };
  let runit = (customId) => {
    fetch(`${manageEventUpdatePosition}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ customId }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem("update_for_refreace", data.eventName);
        forceupdate();
        // toast("Event Position Updated", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "light",
        // });
      });
  };

  let cat = window.localStorage.getItem("categiry");
  let av = cat.charAt(0);

  let hndlDelete = (id) => {
    fetch(`${manageEventDelete}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authCtx.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem("update_for_refreace", id);
        forceupdate();
        toast.success("Event deleted");
      });
  };

  const [isChecked, setisChecked] = useState();
  let updateTrendingfunc = (id, boleamvalue) => {
    let trending = boleamvalue === true ? false : true;
    fetch(`${updateTrending}/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ trending }),
    })
      .then((res) => res.json())
      .then((data) => {
        window.localStorage.setItem("update_for_refreace", boleamvalue);
        forceupdate();
      });
  };

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

      <div className="text-white bg-[color:var(--blue)] p-2 shadow-lg">
        <div className="flex justify-between gap-5">
          <div className="flex gap-5 lg:gap-10 items-center px-3 py-1.5">
            <h6
              className={`md:text-lg font-semibold px-2 py-1 cursor-pointer ${
                isSelected === "publish" && "border-2 rounded-md"
              } `}
              onClick={() => setIsSelected("publish")}
            >
              Published
            </h6>
            <h6
              className={`md:text-lg font-semibold px-2 py-1 cursor-pointer ${
                isSelected === "drafted" && "border-2 rounded-md"
              } `}
              onClick={() => setIsSelected("drafted")}
            >
              Drafts
            </h6>
          </div>
          {/* <div className="flex gap-5 items-center text-white">
            <Select label="Select date" className="text-white">
              <Option>Today</Option>
              <Option>Past week</Option>
              <Option>Past Month</Option>
              <Option>All</Option>
            </Select>
          </div> */}
        </div>
      </div>

      {!data ? (
        <h1 className="text-center py-10">Loding Please Wait...</h1>
      ) : (
        <div className="p-5">
          <div className="overflow-x-auto relative border-2 rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Event Name
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Location
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Timings
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Date
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Trending
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Actions
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Position
                  </th>
                </tr>
              </thead>

              {data && (
                <tbody>
                  {data
                    .filter((user) => {
                      return user.status.toLowerCase().includes(isSelected);
                    })
                    .filter((user) => {
                      return (
                        user.eventName.toLowerCase().includes(query) ||
                        user.location.toLowerCase().includes(query) ||
                        user._id.toString().includes(query) ||
                        user.customId.toLowerCase().includes(query) ||
                        moment(user.eventDate)
                          .format("DD-MM-YY")
                          .includes(query) ||
                        moment(user.startTime, ["HH:mm"])
                          .format("hh:mm a")
                          .includes(query) ||
                        moment(user.endTime, ["HH:mm"])
                          .format("hh:mm a")
                          .includes(query)
                      );
                    })

                    .map((value) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={value._id}
                        onClick={(e) => {
                          findID(e, value._id);
                        }}
                      >
                        <th
                          scope="row"
                          className="py-4 px-6 font-medium text-gray-900 whitespace-pre-wrap dark:text-white"
                        >
                          {value._id}
                        </th>
                        <td className="py-4  whitespace-pre-wrap px-6">
                          {value.eventName}
                        </td>
                        <td className="py-4  whitespace-pre-wrap px-6">
                          {value.location}
                        </td>
                        <td className="py-4 px-6">{`${moment(value.startTime, [
                          "HH:mm",
                        ]).format("hh:mm a")} - ${moment(value.endTime, [
                          "HH:mm",
                        ]).format("hh:mm a")}`}</td>
                        <td className="py-4 px-6">
                          {moment(value.eventDate).format("DD-MM-YY")}
                        </td>
                        <td className="py-4 px-6">
                          <div className="my-1.5" key={value._id}>
                            <Switch
                              id={value._id}
                              color="green"
                              checked={value.trending}
                              onChange={(e) => {
                                updateTrendingfunc(value._id, value.trending);
                              }}
                            />
                          </div>
                          {/* <input type="checkbox" value={isChecked} onChange={setisChecked(!isChecked)} /> */}
                        </td>
                        <td className="py-4 px-6 space-x-2">
                          <button>
                            <Link
                              to={`/admin/manageEvents/totalEvents/${value?._id}`}
                            >
                              <FaEdit className="text-[color:var(--btn-green)] hover:text-[color:var(--btn-hover-green)] text-xl" />
                            </Link>
                          </button>
                          <button>
                            <AiFillDelete
                              className="text-[color:var(--red)] hover:text-[color:var(--hover-red)] text-xl"
                              onClick={(e) => {
                                hndlDelete(value._id);
                              }}
                            />
                          </button>
                        </td>
                        <td className="py-4 px-9">
                          <select
                            name=""
                            id=""
                            className="text-lg font-semibold px-3 lg:px-4 border-none outline-none"
                            value={value.customId}
                            onChange={(e) => {
                              runit(e.target.value);
                            }}
                          >
                            <option value="z">0</option>
                            <option value={`${av}1`}>1</option>
                            <option value={`${av}2`}>2</option>
                            <option value={`${av}3`}>3</option>
                            <option value={`${av}4`}>4</option>
                            <option value={`${av}5`}>5</option>
                            <option value={`${av}6`}>6</option>
                            <option value={`${av}7`}>7</option>
                            <option value={`${av}8`}>8</option>
                            <option value={`${av}9`}>9</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ManageEventTable;
