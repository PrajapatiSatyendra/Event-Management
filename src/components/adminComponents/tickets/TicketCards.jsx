import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTicket, getImage } from "../../../Urls/baseurl";

const TicketCards = (props) => {
  const { query } = props;
  const [ticketArr, setEventsArr] = useState([]);
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`${getTicket}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEventsArr(data);
      });
  }, []);

  return (
    <div>
      <div className="pb-8 pt-4 px-6 md:pb-10 flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
          {ticketArr
            ?.filter((user) => {
              return user.eventName.toLowerCase().includes(query);
            })

            .map((ticket) => (
              <Link to={`/admin/tickets/${ticket._id}`} key={ticket?._id}>
                <div
                  className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max shadow-sm hover:shadow-md"
                  onClick={(e) => {
                    window.localStorage.setItem(
                      "ticketDataMAiEventName",
                      ticket._id
                    );
                  }}
                >
                  <img
                    src={`https://lucknowjunction-images.s3.amazonaws.com/${ticket?.imageFilename}`}
                    alt=""
                    className=" w-full object-fill sm:object-cover md:object-fill sm:h-52 xl:h-56 group-hover:scale-105 transition-transform duration-200 ease-in-out "
                  />
                  <div className="flex flex-col gap-5 p-4 bg-white sm:h-[calc(100%-15rem)] ">
                    <p className="text-xl font-bold font-poppins">
                      {ticket?.eventName}
                    </p>

                    {/* <div className="flex justify-around">
                    <div className="flex-1 flex flex-col gap-2">
                      <p className="font-semibold text-lg">Total Tickets</p>
                      <p className="text-[color:var(--blue)] font-semibold text-lg md:text-xl lg:text-2xl">
                        {ticket?.totalTickets}
                      </p>
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <p className="font-semibold text-lg">Tickets Sold</p>
                      <p className="text-[color:var(--blue)] font-semibold text-lg md:text-xl lg:text-2xl">
                        {ticket?.ticketsSold}
                      </p>
                    </div>
                  </div> */}
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TicketCards;
