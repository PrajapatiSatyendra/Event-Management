import React, { useState, useRef, useEffect } from "react";
import { BiMessage } from "react-icons/bi";
import { FaBell, FaCloudUploadAlt } from "react-icons/fa";
import JoditEditor from "jodit-react";
import { Select, Option } from "@material-tailwind/react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { getEventsbyid, updateEventUrl, getImage } from "../../../Urls/baseurl";

const EditEvent = () => {
  const { id } = useParams();
  const nav = useNavigate();
  const editor = useRef(null);
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
  const [submitted, setSubmitted] = useState(false);

  const [banner, setBanner] = useState();

  useEffect(() => {
    fetch(`${getEventsbyid}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBanner(data.imageFilename);

        setLogoa(data.banner);
        setEventDesc(data.desc);
        setEventName(data.eventName);
        setCategary(data.categary);

        let date = new Date(data.eventDate)?.toISOString();
        let adjDate = date?.split("T")[0];

        setEventDate(adjDate);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setLocation(data.location);
      });
  }, []);

  let hndlSubmit = (e) => {
    e.preventDefault();
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
      console.log(status,id);
      fetch(`${updateEventUrl}/${id}`, {
        method: "PUT",
        body: formData,
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          toast.success("Event Updated");
          setTimeout(() => {
            nav("/admin/manageEvents/totalEvents");
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
          Edit your Event
        </h2>

        <form
          onSubmit={(e) => {
            hndlSubmit(e);
          }}
        >
          <div className="flex flex-col gap-5 lg:gap-8">
            <div>
              <label htmlFor="eventName">Event Name</label>
              <input
                value={eventName}
                onChange={(e) => {
                  setEventName(e.target.value);
                }}
                type="text"
                id="eventName"
                placeholder="name of event"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              />
            </div>
            <div>
              <label htmlFor="eventCat">Event Category</label>
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
                <label htmlFor="eventDate">Event Date</label>
                <input
                  value={eventDate}
                  onChange={(e) => {
                    setEventDate(e.target.value);
                  }}
                  type="date"
                  id="eventDate"
                  placeholder="event date"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="startTime">Start Time</label>
                <input
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                  }}
                  type="time"
                  id="startTime"
                  placeholder="event starting time"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
              </div>

              <div className="flex-1">
                <label htmlFor="endTime">End Time</label>
                <input
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
                  }}
                  type="time"
                  id="endTime"
                  placeholder="event ending time"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                />
              </div>
            </div>
            <div>
              <label htmlFor="eventLocation">
                Where will your event take place?
              </label>
              <input
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                type="text"
                id="eventLocation"
                placeholder="event location"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              />
            </div>
            <div>
              <label htmlFor="eventDesc">Event Description</label>
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
              <label htmlFor="eventImage">Event Image</label>
              <div
                className={`flex ${
                  logo && "gap-5"
                }  justify-between items-center`}
              >
                <div className="flex-1 w-full flex justify-center">
                  <img
                    src={`https://lucknowjunction-images.s3.amazonaws.com/${banner}`}
                    alt=""
                    className="bg-gray-100 w-64 lg:w-80 h-56"
                  />
                </div>

                <div className="flex-1 border shadow-sm rounded-md p-5">
                  <input
                    type="file"
                    name=""
                    id="eventImage"
                    className="hidden"
                    onChange={(e) => {
                      setLogo(URL.createObjectURL(e.target.files[0]));
                      setLogoa(e.target.files[0]);
                    }}
                  />
                  <label
                    htmlFor="eventImage"
                    className="flex flex-col items-center flex-wrap gap-5"
                  >
                    <FaCloudUploadAlt className="text-2xl text-gray-600 cursor-pointer" />
                    <p className="text-sm text-gray-600" id="eventImage">
                      {logo ? (
                        <div className="flex gap-3 items-center">
                          {logo && (
                            <img
                              src={logo}
                              alt=""
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          )}
                        </div>
                      ) : (
                        "Change event details photo."
                      )}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-5 flex-wrap items-center justify-end pt-10 pb-5">
              <button
                className="px-4 py-1.5 text-lg md:text-xl font-medium lg:font-semibold border rounded-md bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white"
                onClick={(e) => {
                  setStatus("publish");
                }}
              >
                Update Event
              </button>
              <button
                className="px-4 py-1.5 text-lg md:text-xl font-medium lg:font-semibold border rounded-md bg-[color:var(--orange)] hover:bg-[color:var(--hover-orange)] text-white"
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

export default EditEvent;
