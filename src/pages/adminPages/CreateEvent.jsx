import React, { useState, useRef } from "react";
import { MdAdd } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { BiMessage } from "react-icons/bi";
import { FaBell, FaCloudUploadAlt } from "react-icons/fa";
import JoditEditor from "jodit-react";
import { createEventUrl } from "../../Urls/baseurl";
import { Select, Option } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  eventName: yup.string().required("Event Name is required."),

  eventDate: yup.string().required("Event Date is required"),

  eventStartTime: yup.string().required("Event starting time is required."),

  eventEndTime: yup.string().required("Event ending time is required."),

  eventLocaton: yup.string().required("Event location is required."),

  files: yup.mixed().test("required", "Please select a file", (value) => {
    return value;
  }),

  ticketName: yup.string().required("Ticket Name is required."),

  numOfTickets: yup.string().required("Number of tickets is required."),

  ticketPrice: yup.string().required("Ticket price is required.")

});

const CreateEvent = () => {
  const editor = useRef(null);
  const [addMoreTickets, setAddMoreTickets] = useState(0);

  const [openDateRange, setOpenDateRange] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  // console.log(dates);

  const [ticketName, setTicketName] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [paymentCurrency, setPaymentCurrency] = useState("");
  const [ticketInfo, setTicketInfo] = useState("");
  const [ticketsData, setTicketsData] = useState([]);

  const [logo, setLogo] = useState();
  const [logoa, setLogoa] = useState();
  const [desc, setEventDesc] = useState("");

  const [eventName, setEventName] = useState("");
  const [categary, setCategary] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");

  const [status, setStatus] = useState("");

  // console.log(logo);
  // console.log(logoa);

  const handleAddTicket = () => {
    const copyTickets = [...ticketsData];
    copyTickets.push({
      ticketName,
      numberOfTickets,
      ticketPrice,
      paymentCurrency,
      ticketInfo,
    });
    setTicketsData(copyTickets);

    setTicketName("");
    setNumberOfTickets("");
    setTicketPrice("");
    setPaymentCurrency("");
    setTicketInfo("");

    toast.success("Ticket Confirmed");
  };
  // console.log(ticketsData);

  const handleRemoveTicket = (e, index) => {
    const copyTickets = [...ticketsData];
    copyTickets.splice(index, 1);
    setTicketsData(copyTickets);
  };

  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async () => {
    if (!logoa) {
      toast.error("Please Upload A Image First");
      return;
    }
    if (submitted) {
      return;
    }
    setSubmitted(true);

    try {
      const formData = new FormData();
      formData.append("banner", logoa);
      formData.set("eventName", eventName);
      formData.set("categary", categary);
      formData.set("eventDate", eventDate);
      formData.set("startTime", startTime);
      formData.set("endTime", endTime);
      formData.set("location", location);
      formData.set("desc", desc);
      formData.set("status", status);
      formData.set("customId", "z");
      formData.set("ticketsData", JSON.stringify(ticketsData));
      console.log(status);

      fetch(`${createEventUrl}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          toast.success("Event Published");
        });
    } catch (error) {
      console.log(error);
    }
  };

  // let hndlSubmit = (e) => {
  //   e.preventDefault();
  //   if (submitted) {
  //     return;
  //   }
  //   setSubmitted(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append("banner", logoa);
  //     formData.set("eventName", eventName);
  //     formData.set("categary", categary);
  //     formData.set("eventDate", eventDate);
  //     formData.set("startTime", startTime);
  //     formData.set("endTime", endTime);
  //     formData.set("location", location);
  //     formData.set("desc", desc);
  //     formData.set("status", status);
  //     formData.set("customId", "z");
  //     formData.set("ticketsData", JSON.stringify(ticketsData));

  //     fetch(`${createEventUrl}`, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => {
  //         return res.json();
  //       })
  //       .then((data) => {
  //         toast.success("Event Published", {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "light",
  //         });
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div>
      <div className="text-white bg-[color:var(--gray)] p-5 shadow-lg">
        <div className="flex justify-end gap-5">
          <div className="flex gap-5 items-center">
            <BiMessage size={20} />
            <FaBell size={20} />
          </div>
        </div>
      </div>

      <div className="p-5 sm:px-10 md:px-12 lg:px-14">
        <h2 className="text-[color:var(--blue)] text-2xl font-bold py-8 font-poppins">
          Publish your Event
        </h2>

        <form
          // onSubmit={(e) => {
          //   hndlSubmit(e);
          // }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-5 lg:gap-8">
            <div>
              <label htmlFor="eventName" className="font-poppins">
                Event Name
              </label>
              <input
                {...register("eventName")}
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
                type="text"
                id="eventName"
                placeholder="name of event"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              />
              {errors.eventName && (
                <p className="text-red-500 text-right text-sm">
                  {errors.eventName.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="eventCat" className="font-poppins">
                Event Category
              </label>
              {/* <input
                value={categary}
                onChange={(e) => { setCategary(e.target.value) }}
                type="text"
                id="eventCat"
                placeholder="event category"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              /> */}
              <Select
                label="Select Category"
                value={categary}
                onChange={(value) => setCategary(value)}
              >
                <Option value="New Year">New Year</Option>
                <Option value="Happing Events">Happening Events</Option>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap gap-5">
              <div className="flex-1">
                <label
                  htmlFor="eventDate"
                  className="font-poppins"
                  onClick={() => setOpenDateRange(!openDateRange)}
                >
                  Event Date
                </label>{" "}
                <input
                  {...register("eventDate")}
                  value={eventDate}
                  onChange={(e) => {
                    setEventDate(e.target.value);
                  }}
                  type="date"
                  id="eventDate"
                  placeholder="event date"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
                {errors.eventDate && (
                  <p className="text-red-500 text-right text-sm">
                    {errors.eventDate.message}
                  </p>
                )}
                {/* ********************************** */}
                {/* <div className="border p-2">
                  <span
                    onClick={() => setOpenDateRange(!openDateRange)}
                    className="text-gray-700"
                  >
                    {`${format(dates[0].startDate, "dd/MM/yyyy")}  to  ${format(
                      dates[0].endDate,
                      "dd/MM/yyyy"
                    )}`}
                  </span>
                  {openDateRange && (
                    <DateRange
                      editableDateInputs={true}
                      onChange={(item) => {
                        setDates([item.selection]);
                      }}
                      moveRangeOnFirstSelection={false}
                      ranges={dates}
                      minDate={new Date()}
                      className="date"
                    />
                  )}
                </div> */}
                {/* ************************************** */}
              </div>

              <div className="flex-1">
                <label htmlFor="startTime" className="font-poppins">
                  Start Time
                </label>
                <input
                  {...register("eventStartTime")}
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  type="time"
                  id="startTime"
                  placeholder="event starting time"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
                {errors.eventStartTime && (
                  <p className="text-red-500 text-right text-sm">
                    {errors.eventStartTime.message}
                  </p>
                )}
              </div>

              <div className="flex-1">
                <label htmlFor="endTime" className="font-poppins">
                  End Time
                </label>
                <input
                  {...register("eventEndTime")}
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                  type="time"
                  id="endTime"
                  placeholder="event ending time"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
                {errors.eventEndTime && (
                  <p className="text-red-500 text-right text-sm">
                    {errors.eventEndTime.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <label htmlFor="eventLocation" className="font-poppins">
                Where will your event take place?
              </label>
              <input
                {...register("eventLocaton")}
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                type="text"
                id="eventLocation"
                placeholder="event location"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              />
              {errors.eventLocaton && (
                <p className="text-red-500 text-right text-sm">
                  {errors.eventLocaton.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="eventDesc" className="font-poppins">
                Event Description
              </label>
              <JoditEditor
                ref={editor}
                value={desc}
                config={{
                  buttons: [
                    "bold",
                    "italic",
                    "link",
                    "ul",
                    "strikethrough",
                    "superscript",
                    "ol",
                  ],
                  askBeforePasteHTML: false,
                  defaultActionOnPaste: "insert_only_text",
                }}
                // tabIndex={1} // tabIndex of textarea
                onBlur={(newContent) => setEventDesc(newContent)} // preferred to use only this option to update the content for performance reasons
              // onChange={(newContent) => setBenefits(newContent)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="eventImage" className="font-poppins">
                Event Image
              </label>
              <p className="text-red-300 text-sm">
                Keep images of size 600*250
              </p>
              <div
                className={`flex flex-col md:flex-row justify-between gap-5 items-center`}
              >
                <div className="flex-1 w-full flex justify-center">
                  <img
                    src={logo}
                    alt=""
                    className="bg-gray-100 w-full lg:w-full h-56"
                  />
                </div>

                <div className="flex-1 border shadow-sm rounded-md p-5">
                  <input
                    type="file"
                    name=""
                    id="eventImage"
                    {...register("files")}
                    className="hidden"
                    onChange={(e) => {
                      setLogo(URL.createObjectURL(e.target.files[0]));
                      setLogoa(e.target.files[0]);
                    }}
                  />
                  {errors.files && (
                    <p className="text-red-500 text-right text-sm">
                      {errors.files.message}
                    </p>
                  )}
                  <label
                    htmlFor="eventImage"
                    className="flex flex-col items-center flex-wrap gap-5"
                  >
                    <FaCloudUploadAlt className="text-2xl text-gray-600 cursor-pointer" />
                    <p className="text-sm text-gray-600" id="eventImage">
                      {logo ? (
                        <div className="flex gap-3 items-center">
                          <span className="sm:text-lg font-medium">
                            File uploaded
                          </span>
                          <TiTick className="bg-green-500 p-1.5 text-4xl border rounded-full text-white" />
                        </div>
                      ) : (
                        "Add an event details photo."
                      )}
                    </p>
                  </label>
                </div>
              </div>
              {errors.files && (
                <p className="text-red-500 text-right text-sm">
                  {errors.files.message}
                </p>
              )}
            </div>

            {ticketsData.length > 0 && (
              <div className="flex flex-col">
                <h2 className="text-lg lg:text-xl font-semibold font-poppins">
                  All Tickets
                </h2>
                {ticketsData?.map((ticket, i) => (
                  <div
                    className="border-2 rounded-md shadow-md px-2 py-5 md:px-5 lg:px-7 mb-2"
                    key={i}
                  >
                    <div className="flex flex-col gap-3 md:gap-5">
                      <div className="flex items-center gap-5 flex-wrap justify-between">
                        <h2 className="text-lg lg:text-xl font-semibold text-gray-900">
                          Ticket {i + 1}
                        </h2>
                        <button
                          type="button"
                          onClick={(e) => handleRemoveTicket(e, i)}
                          className="px-2 py-1 border rounded-md bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white font-poppins"
                        >
                          Remove ticket
                        </button>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-5 md:gap-6 lg:gap-10 xl:gap-12">
                        <div className="sm:flex-1">
                          <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                            Ticket Name
                          </h3>
                          <p className="text-gray-700 text-sm">
                            {ticket?.ticketName}
                          </p>
                        </div>
                        <div className="sm:flex-1">
                          <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                            Total No. of Tickets
                          </h3>
                          <p className="text-gray-700 text-sm">
                            {ticket?.numberOfTickets}
                          </p>
                        </div>
                        <div className="sm:flex-1">
                          <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                            Ticket Price
                          </h3>
                          <p className="text-gray-700 text-sm">
                            ₹ {ticket?.ticketPrice}
                          </p>
                        </div>
                        <div className="sm:flex-1">
                          <h3 className="uppercase text-gray-700 font-semibold font-poppins">
                            Additional Info
                          </h3>
                          <p className="text-gray-700 text-sm">
                            {ticket?.ticketInfo}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* {[...Array(addMoreTickets)].map((_, i) => ( */}
            <div
              // key={i}
              className="border-2 rounded-md bg-gray-50 p-3 lg:p-5 flex flex-col gap-5 lg:gap-8"
            >
              <div>
                <p className="text-lg lg:text-xl font-semibold font-poppins">
                  New Ticket Details
                </p>
                <p className="py-1 text-sm font-medium text-gray-600">
                  Set tickets pricing for your event
                </p>
              </div>

              <div>
                <label htmlFor="ticketName" className="font-poppins">
                  Ticket Name
                </label>
                <input
                  type="text"
                  id="ticketName"
                  name="ticketName"
                  {...register("ticketName")}
                  value={ticketName}
                  onChange={(e) => setTicketName(e.target.value)}
                  placeholder="ticket name"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
                {errors.ticketName && (
                  <p className="text-red-500 text-right text-sm">
                    {errors.ticketName.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="ticketCount" className="font-poppins">
                  Number of tickets
                </label>
                <input
                  type="text"
                  id="ticketCount"
                  name="ticketCount"
                  {...register("numOfTickets")}
                  value={numberOfTickets}
                  onChange={(e) => setNumberOfTickets(e.target.value)}
                  placeholder="number of tickets available"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
                {errors.numOfTickets && (
                  <p className="text-red-500 text-right text-sm">
                    {errors.numOfTickets.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="ticketPrice" className="font-poppins">
                  Ticket Price
                </label>
                <input
                  type="text"
                  id="ticketPrice"
                  name="ticketPrice"
                  {...register("ticketPrice")}
                  value={ticketPrice}
                  onChange={(e) => setTicketPrice(e.target.value)}
                  placeholder="price per ticket"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
                {errors.ticketPrice && (
                  <p className="text-red-500 text-right text-sm">
                    {errors.ticketPrice.message}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="paymentCurrency" className="font-poppins">
                  Payment Currency
                </label>
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
                <label htmlFor="ticketInfo" className="font-poppins">
                  Additional Instruction
                </label>
                <textarea
                  type="text"
                  rows={5}
                  id="ticketInfo"
                  name="ticketInfo"
                  {...register("additionalInfo")}
                  value={ticketInfo}
                  onChange={(e) => setTicketInfo(e.target.value)}
                  placeholder="Additional information related to tickets"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
                {errors.additionalInfo && (
                  <p className="text-red-500 text-right text-sm">
                    {errors.additionalInfo.message}
                  </p>
                )}
              </div>

              <div className="pt-4 pb-8 flex gap-5 justify-end">
                <button
                  type="button"
                  className="px-3 py-1.5 border rounded-md text-white bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-lg font-semibold font-poppins flex gap-2 items-center
                    disabled:bg-blue-300 disabled:cursor-not-allowed
                    "
                  onClick={handleAddTicket}
                >
                  Confirm Ticket
                </button>
                {/* <button
                    type="button"
                    className="px-3 py-1.5 border rounded-md text-white bg-red-500 text-lg font-semibold flex gap-2 items-center"
                    onClick={(e) => {
                      handleRemoveTicket(e, i);
                    }}
                  >
                    Remove Ticket
                  </button> */}
              </div>
            </div>
            {/* ))} */}

            {/* <div className="pt-4 pb-8 flex justify-end">
              <button
                type="button"
                className="px-4 py-2 border rounded-md text-white bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-lg font-semibold flex gap-2 items-center"
                onClick={() => {
                  setAddMoreTickets(addMoreTickets + 1);
                }}
              >
                <MdAdd className="text-white" />{" "}
                <span>
                  {addMoreTickets > 0 ? "Add more Tickets" : "Add Ticket"}
                </span>
              </button>
            </div> */}

            <div className="flex gap-5 flex-wrap items-center justify-end pt-10 pb-5">
              <button
                className="px-4 py-1.5 text-lg md:text-xl font-medium lg:font-semibold border rounded-md bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white font-poppins"
                onClick={(e) => {
                  setStatus("publish");
                }}
              >
                Publish Event
              </button>
              <button
                className="px-4 py-1.5 text-lg md:text-xl font-medium lg:font-semibold border rounded-md bg-[color:var(--orange)] hover:bg-[color:var(--hover-orange)] text-white font-poppins"
                onClick={(e) => {
                  setStatus("drafted");
                }}
              >
                Save as Draft
              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateEvent;
