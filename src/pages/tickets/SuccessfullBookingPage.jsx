import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { TiTick } from "react-icons/ti";
import { Link, useLocation, useParams } from "react-router-dom";
import Download from "./Download";
import moment from "moment";
import { fetchAttendeesTickets } from "../../Urls/baseurl";
import { useSearchParams } from "react-router-dom";

const SuccessfullBookingPage = () => {
  const  search  = useSearchParams()[0];
  const reference = search.get("reference");
  const [tickets, setTickets] = useState();
  const [eventData, setEventData] = useState();
  useEffect(() => {
    const getTickets = async () => {
      try {
        const result = await fetch(`${fetchAttendeesTickets}/${reference}`);
        const jsonData = await result.json();
        if (!result) {
          throw new Error(jsonData.message);
        }
        console.log(jsonData);
        setTickets(jsonData.data);
        setEventData(jsonData.data[0]?.eventId);
      } catch (error) {
        console.log(error);
      }
      
    }
    getTickets(); 

  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    // documentTitle: "Ticket"
  });

  return (
    <div className="py-8 px-8 lg:max-w-[80vw] lg:mx-auto min-h-[81vh]">
      <div className="flex flex-col gap-5">
        <div className="flex gap-3 justify-center items-center">
          <h4 className="text-center text-lg md:text-xl lg:text-2xl font-semibold text-[color:var(--btn-green)] font-poppins">
            Booking Successfull
          </h4>
          <TiTick className="border rounded-full text-4xl p-0.5 text-white bg-[color:var(--btn-green)]" />
        </div>

        <div id="ThisIsForDownload" ref={componentRef}>
          <div className="lg:max-w-[80vw] lg:mx-auto">
            <div className="border-2 rounded-md shadow-md px-2 py-5 md:px-5 md:py-8 lg:px-8 lg:py-12">
              <div className="flex flex-col gap-3 md:gap-5 lg:gap-8">
                <h2 className="text-lg lg:text-xl font-semibold">
                  { eventData?.eventName}
                </h2>
                <div className="flex flex-col sm:flex-row gap-5 md:gap-6 lg:gap-10 xl:gap-12">
                  <div className="sm:flex-1">
                    <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                      Venue
                    </h3>
                    <p className="text-gray-700 text-sm">
                      { eventData?.location}
                    </p>
                  </div>
                  <div className="sm:flex-1">
                    <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                      Time
                    </h3>
                    <p className="text-gray-700 text-sm">
                      {`${moment(eventData?.eventDate).format(
                        "Do MMMM, YYYY"
                      )} [${moment(
                        moment().set({
                          hour: eventData?.startTime?.split(":")[0],
                          minute: eventData?.startTime?.split(":")[1],
                        })
                      ).format("h:mmA")} - ${moment(
                        moment().set({
                          hour: eventData?.endTime?.split(":")[0],
                          minute: eventData?.endTime?.split(":")[1],
                        })
                      ).format("h:mmA")}]`}
                    </p>
                  </div>
                  <div className="sm:flex-1">
                    <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                      Transaction
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Purchased on: <br />{" "}
                      {tickets && tickets[0]?.updatedAt}
                    </p>
                  </div>
                  <div className="sm:flex-1">
                    <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                      Order Summary
                    </h3>
                    <p className="text-gray-700 text-sm">
                      Amount & Fees:{" "}
                      {tickets && (tickets[0]?.totalPrice)/100} <br />{" "}
                      Discount: 000 <br /> Paid Amount:{" "}
                      {tickets && (tickets[0]?.totalPrice)/100}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {tickets && (
              <div>
                {tickets?.map((ticket, i) => {
                  return (
                    <div
                      key={i}
                      className="border-[24px] border-[#153FD1] shadow-md px-2 py-5 md:px-5 md:py-8 lg:px-8 lg:py-12 my-4"
                    >
                      <div className="flex flex-col md:flex-row gap-5 md:gap-6 lg:gap-10 xl:gap-12">
                        <div className="md:flex-1">
                          <img
                            src={ticket.qrCode}
                            alt=""
                            className="object-fill h-[160px] w-[160px] mx-auto"
                          />
                        </div>
                        <div className="md:flex-[2]  flex flex-col gap-5 self-center sm:gap-6">
                          <div>
                            <h4 className="font-semibold text-lg font-[Open Sans] md:text-2xl ">
                              {ticket.ticketId}
                            </h4>
                            <p className="text-lg font-poppins">
                              Issued to,{" "}
                              <span className="font-semibold">
                                {ticket.customerName}
                              </span>
                            </p>
                          </div>

                          <div>
                            <p className="text-gray-700 uppercase font-poppins">
                              Ticket Information
                            </p>
                            <p className="text-gray-700 font-semibold">
                              {ticket.ticketType} Ticket - ₹{" "}
                              {ticket.ticketPrice} INR
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="flex gap-5 flex-col items-end sm:flex-row sm:justify-between py-10">
          <div>
            <Link to={`/`}>
              <button
                className="px-3 py-1.5 font-poppins text-[color:var(--orange)] hover:text-[color:var(--hover-orange)] border-2 border-[color:var(--orange)]
              hover:border-[color:var(--hover-orange)] rounded-md font-medium md:font-semibold md:text-lg"
              >
                Book more Tickets
              </button>
            </Link>
          </div>

          <div className="text-white font-medium md:font-medium md:text-lg">
            <button className="px-3 py-1.5 border-2 bg-[color:var(--btn-green)] hover:bg-[color:var(--btn-hover-green)] rounded-md font-poppins">
              <Download
                elementId="ThisIsForDownload"
                fileName="Lucknow Junction"
              />
            </button>
            <button
              className="px-3 py-1.5 border-2 bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md font-poppins"
              onClick={handlePrint}
            >
              Print Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessfullBookingPage;
