import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  manageEvent,
  manageEventCatagiry,
  manageEventCatagirySwipe,
} from "../../../Urls/baseurl";

var colors = ["blue", "green", "orange", "purple", "red", "pink"];
// eslint-disable-next-line no-extend-native
Array.prototype.getRandom = function (cut) {
  var i = Math.floor(Math.random() * this.length);
  if (cut && i in this) {
    return this.splice(i, 1)[0];
  }
  return this[i];
};

const ManageEventCards = () => {
  const [eventsArr, setEventsArr] = useState({});
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`${manageEvent}`)
      .then((res) => res.json())
      .then((data) => {
        setEventsArr(data[0]);
        // console.log(data);
      });
  }, []);

  return (
    <div>
      <div className="pb-8 pt-4 px-6 md:pb-10 flex flex-col gap-10">
        <h6 className="text-lg font-semibold lg:text-xl xl:text-2xl">
          Categories
        </h6>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 mt-3">
          {Object.keys(eventsArr).map((ticket, i) => (
            <Link to="/admin/manageEvents/totalEvents" key={i}>
              <div
                className={`border rounded-lg overflow-hidden  cursor-pointer bg-${colors.getRandom()}-800 text-white h-full shadow-sm hover:shadow-md`}
                onClick={(e) => {
                  window.localStorage.setItem("categiry", ticket);
                }}
              >
                <div className="flex flex-col justify-between gap-5 lg:gap-8 p-4 sm:h-[calc(100%-15rem)] ">
                  <div>
                    <p className="text-xl font-bold font-poppins">{(ticket === 'Happing Events') ? "Happening Events" : ticket }</p>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <h5 className="font-poppins">Published Events: </h5>
                    <p className="text-sm font-bold">{eventsArr[ticket]}</p>
                  </div>
                </div>
              </div>
            </Link>
            // <Link to='/admin/manageEvents/totalEvents' state={aaa} >
            //   <div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max shadow-sm hover:shadow-md" onClick={(e) => { storeCategity(ticket) }}  >
            //     <div className="flex flex-row gap-5 p-4 bg-white sm:h-[calc(100%-15rem)] " style={{ justifyContent: "space-evenly" }}>

            //       <div>
            //         <h5>Catagery Name</h5>
            //         <p className="text-xl font-bold " >
            //           {ticket}
            //         </p>
            //       </div>
            //       <div>
            //         <h5>Total Publish Events</h5>
            //         <p className="text-sm font-bold pt-1">
            //           {eventsArr[ticket]}
            //         </p>
            //       </div>
            //     </div>
            //   </div>
            // </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageEventCards;
