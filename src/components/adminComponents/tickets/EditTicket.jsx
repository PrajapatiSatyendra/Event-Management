import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { BiMessage } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { updateEventUrl, updateEventUrlticket } from "../../../Urls/baseurl";

const EditTicket = () => {
  const editTicketData = useLocation().state;
  const { id } = useParams();
  const nav = useNavigate();
  const EventID = window.localStorage.getItem(
    "TicketNameToeditTicketEventIDShare"
  );

  const [ticketName, setTicketName] = useState(editTicketData.ticketName);
  const [numberOfTickets, setNumberOfTickets] = useState(
    editTicketData.numberOfTickets
  );
  const [ticketPrice, setTicketPrice] = useState(editTicketData.ticketPrice);
  const [paymentCurrency, setPaymentCurrency] = useState(
    editTicketData.paymentCurrency
  );
  const [ticketInfo, setTicketInfo] = useState(editTicketData.ticketInfo);

  const [submitted, setSubmitted] = useState(false);

  let hndlSubmit = (e) => {
    e.preventDefault();
    if (submitted) {
      return;
    }
    setSubmitted(true);
    try {
      const formData = new FormData();
      formData.set("ticketName", ticketName);
      formData.set("numberOfTickets", numberOfTickets);
      formData.set("ticketPrice", ticketPrice);
      formData.set("paymentCurrency", paymentCurrency);
      formData.set("ticketInfo", ticketInfo);

      fetch(`${updateEventUrlticket}/${id}/${EventID}`, {
        method: "PUT",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          toast.success("Ticket updated");
          setTimeout(() => {
            nav(`/admin/tickets/${EventID}`);
          }, 600);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-white bg-[color:var(--gray)] p-5 shadow-lg">
        <div className="flex justify-end gap-5">
          {/* <div className="flex gap-2 items-center bg-white rounded-lg px-3 py-1.5">
            <input
              type="text"
              placeholder="Search for events"
              className="px-3 py-1 border-none outline-none text-black"
            />
            <FaSearch className="text-gray-500" />
          </div> */}
          <div className="flex gap-5 items-center">
            <BiMessage size={20} />
            <FaBell size={20} />
          </div>
        </div>
      </div>

      <div className="p-5 sm:px-10 md:px-12 lg:px-14">
        <h2 className="text-[color:var(--blue)] text-2xl font-bold py-8">
          Edit your Ticket
        </h2>

        <form
          onSubmit={(e) => {
            hndlSubmit(e);
          }}
        >
          <div className="flex flex-col gap-5 lg:gap-8">
            <div className="border-2 rounded-md bg-gray-50 p-3 lg:p-5 flex flex-col gap-5 lg:gap-8">
              <div>
                <p className="text-lg lg:text-xl font-semibold ">
                  Edit Ticket Details
                </p>
                <p className="py-1 text-sm font-medium text-gray-600">
                  Set tickets pricing for your event
                </p>
              </div>

              <div>
                <label htmlFor="ticketName">Ticket Name</label>
                <input
                  type="text"
                  id="ticketName"
                  name="ticketName"
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                  placeholder="ticket name"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
              </div>

              <div>
                <label htmlFor="ticketCount">Number of tickets</label>
                <input
                  type="text"
                  id="ticketCount"
                  name="ticketCount"
                  value={numberOfTickets}
                  onChange={(e) => setNumberOfTickets(e.target.value)}
                  placeholder="number of tickets available"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
              </div>

              <div>
                <label htmlFor="ticketPrice">Ticket Price</label>
                <input
                  type="text"
                  id="ticketPrice"
                  name="ticketPrice"
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  placeholder="price per ticket"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
              </div>

              <div>
                <label htmlFor="paymentCurrency">Payment Currency</label>
                <input
                  type="text"
                  id="paymentCurrency"
                  name="ticketPaymentCurrency"
                  value={paymentCurrency}
                  onChange={(e) => setPaymentCurrency(e.target.value)}
                  placeholder="payment currency"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
              </div>

              <div>
                <label htmlFor="ticketInfo">Additional Instruction</label>
                <textarea
                  type="text"
                  rows={5}
                  id="ticketInfo"
                  name="ticketInfo"
                  value={ticketInfo}
                  onChange={(e) => setTicketInfo(e.target.value)}
                  placeholder="Additional information related to tickets"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
              </div>
            </div>

            <div className="flex gap-5 flex-wrap items-center justify-end pt-10 pb-5">
              <button className="px-4 py-1.5 text-lg md:text-xl font-medium lg:font-semibold border rounded-md bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)]  text-white">
                Update Ticket
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditTicket;
