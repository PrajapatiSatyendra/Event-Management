import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiDownload, FiEye } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { bookingHistory } from "../../Urls/baseurl";
import TicketForBooking from "./TicketForBooking";

const MyBookings = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    try {
      fetch(`${bookingHistory}/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          // console.log(data);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="py-8 px-8  lg:max-w-[90vw] lg:mx-auto min-h-[81vh]">
        <div className="flex flex-col gap-5">
          <div className="lg:max-w-[80vw] mx-auto">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-800 pb-5 font-poppins">
              My tickets
            </h2>

            {loading ? (
              <div className="text-lg text-center lg:text-xl">Loading...</div>
            ) : (
              data.map((value, i) => (
                <div
                  className="flex flex-col gap-4 md:gap-6 lg:gap-10 xl:gap-12 border-2 rounded-2xl p-5 my-4"
                  key={i}
                >
                  <div className="flex justify-between flex-wrap gap-3 items-center border-b-2 border-b-[color:var(--blue)] pb-2 md:pb-4">
                    <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold text-[color:var(--blue)] font-poppins">
                      {value.eventId?.eventName}
                    </h2>
                    <Link to={`/downloadTicket/${value._id}`} state={value}>
                      <button className="bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white px-3 py-1.5 border rounded-md flex items-center gap-2 font-poppins">
                        View Ticket
                        <FiEye />
                      </button>
                    </Link>
                  </div>

                  <div className="md:flex md:flex-row  gap-4 md:gap-6 lg:gap-10 xl:gap-12">
                    <div className="md:flex-1">
                      <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                        Ticked Id
                      </h3>
                      <p className="text-gray-700 text-sm">{value.ticketId}</p>
                    </div>

                    <div className="md:flex-1">
                      <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                        Venue
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {value.eventId?.location}
                      </p>
                    </div>

                    <div className="md:flex-1">
                      <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                        Ticket Name
                      </h3>
                      <p className="text-gray-700 text-sm">
                        {" "}
                        {value.ticketType}
                      </p>
                    </div>
                    <div className="md:flex-1">
                      <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                        Transaction
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Purchased on: <br />
                        {moment(value.createdAt).format("DD-MM-YY")}
                      </p>
                    </div>
                    <div className="md:flex-1">
                      <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                        Order Summary
                      </h3>
                      <p className="text-gray-700 text-sm">
                        Paid Amount: {value.ticketPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyBookings;
