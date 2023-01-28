import React from "react";
import Download from "./Download";
import { FiDownload, FiEye } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const TicketForBooking = () => {
  const value = useLocation().state;
  // console.log(value);

  return (
    <div className="min-h-[81vh]">
      <div className=" flex justify-center items-center px-2 py-5 md:px-5 md:py-8 lg:px-8 lg:py-12">
        <div
          id="ThisIsForDownload"
          className="flex border-[20px] p-5 sm:p-8 md:p-10 lg:p-16 flex-col md:flex-row gap-5 md:gap-6 lg:gap-10 xl:gap-12"
        >
          <div className="md:flex-1 w-36 h-36 m-auto lg:w-48 lg:h-40">
            <img
              src={value?.qrCode}
              alt=""
              className="object-fill h-36 w-36 lg:w-40 lg:h-40 mx-auto"
            />
          </div>

          <div className="md:flex-[2] flex flex-col gap-5 self-center sm:gap-6">
            <div>
              <h4 className="font-semibold text-lg md:text-2xl">
                {value?.ticketId}
              </h4>
              <p className="text-lg font-poppins">
                Issued to,{" "}
                <span className="font-semibold">{value?.customerName}</span>
              </p>
            </div>

            <div>
              <p className="text-gray-700 uppercase font-poppins">
                value Information
              </p>
              <p className="text-gray-700 font-semibold">
                {value?.ticketType} Ticket - ₹ {value?.ticketPrice} INR
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white px-3 py-1.5 border rounded-md flex items-center gap-2 font-poppins">
          <Download elementId="ThisIsForDownload" fileName="Lucknow Junction" />

          <FiDownload />
        </button>
      </div>
    </div>
  );
};

export default TicketForBooking;
