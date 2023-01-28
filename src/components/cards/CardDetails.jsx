import React, { useState, useEffect } from "react";
import {
  AiFillFacebook,
  AiFillLinkedin,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { MdCopyAll } from "react-icons/md";
import { BsHeartFill, BsInstagram, BsPinterest } from "react-icons/bs";
import { TiTicket } from "react-icons/ti";
import TicketsModal from "../modals/ticket/TicketsModal";
import { useLocation } from "react-router-dom";
import parse from "html-react-parser";
import moment from "moment";
import { getImage } from "../../Urls/baseurl";
import { useParams } from "react-router-dom";
import { getEventById } from "../../Urls/baseurl";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import SignInModal from "../modals/signupModals/SignInModal";
import Logo from "../../assets/logo.jpeg";

const CardDetails = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const [event, setEvent] = useState();
  const [banner, setBanner] = useState();
  const [openSignInModal, setOpenSignInModal] = useState(false);
  const path = useLocation();
  const navigation = useNavigate();
  // useEffect(() => {
  //   if (path.state) {
  //     setEvent(path.state);
  //     setBanner(path.state.banner?.filename);
  //   }
  // }, []);

  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    toTop();
  }, [path.pathname]);

  let { id } = useParams();

  localStorage.setItem("EventIDForTicket", id);

  useEffect(() => {
    const getEventByIdFunc = async () => {
      try {
        const result = await fetch(`${getEventById}/${id}`);
        const jsonData = await result.json();
        if (!result.ok) {
          throw new Error(jsonData.message);
        }
        setEvent(jsonData.data);
        setBanner(jsonData.data?.imageFilename);
      } catch (error) {
        console.log(error);
      }
    };
    getEventByIdFunc();
  }, []);
  // console.log(event);

  const copyLink = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied");
  };

  const time = moment().set(event?.startTime);
  // console.log(moment(time).format('h:mmA'));
  const isLoggedIn = localStorage.getItem("IsLoggedIn");
  const ticketFunc = () => {
    const storedUserId = localStorage.getItem("userID");
    const isLoggedIn = localStorage.getItem("IsLoggedIn");
    const storedToken = localStorage.getItem("Token");
    // const storedExpirationDate = localStorage.getItem('expirationTime');
    if (!storedToken || !storedUserId) {
      // if (!storedUserId) {
      setOpenSignInModal(true);

      // toast.warning('Go To Login First')
      // setTimeout(() => {
      //   navigation('/')
      // }, 1500)
      return;
    } else {
      if (isLoggedIn === false) {
        setOpenSignInModal(true);

        // toast.warning('Go To Login First')
        // setTimeout(() => {
        //   navigation('/')
        // }, 1500)
        return;
      } else {
        setModalOpened(true);
      }
    }
  };

  // const [openSignInModal, setOpenSignInModal] = useState(false);

  // let openModal = () => {
  //   const storedUserId = localStorage.getItem("userID");
  //   const isLoggedIn = localStorage.getItem("IsLoggedIn");
  //   const storedToken = localStorage.getItem("Token");
  //   if (!storedToken || !storedUserId) {
  //     setOpenSignInModal(true);
  //     return;
  //   } else {
  //     if (isLoggedIn === false) {
  //       setOpenSignInModal(true);
  //       return;
  //     } else {
  //       setModalOpened(true);
  //     }
  //   }
  // };

  return (
    <div className="">
      <div className="px-4 md:px-8 py-4 my-4 md:mt-8 mx-auto lg:max-w-[90vw] border-2 rounded-md shadow-sm sticky top-12 md:top-14 lg:top-16 bg-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
          <div className="flex gap-10">
            <img
              src={`https://lucknowjunction-images.s3.amazonaws.com/${banner}`}
              alt=""
              loading="lazy"
              className="w-24 h-16 lg:w-32 lg:h-20 rounded-md object-cover "
            />

            <div className="flex flex-col justify-center gap-2">
              <h4 className="font-bold text-lg lg:text-xl font-poppins">
                {event?.eventName}
              </h4>
              <p>
                {moment(event?.eventDate).format("MMM DD, YYYY")} -{" "}
                {moment(event?.eventDate).format("MMM DD, YYYY")}
              </p>
            </div>
          </div>

          <div>
            <button
              onClick={ticketFunc}
              className="px-4 lg:px-6 py-2 bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-white rounded-md md:text-lg font-semibold flex gap-2 items-center"
            >
              <TiTicket />
              Tickets
            </button>
            <SignInModal
              openSignInModal={openSignInModal}
              setOpenSignInModal={setOpenSignInModal}
            />

            <TicketsModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={event}
            />
          </div>
        </div>
      </div>

      <div className="px-4 mx-auto lg:max-w-[90vw] md:items-center md:flex md:px-8">
        <div className="py-10 w-full flex flex-col md:flex-row md:justify-between gap-10 xl:gap-24">
          <div className="md:flex-[2] w-full flex flex-col gap-5">
            <img
              src={`https://lucknowjunction-images.s3.amazonaws.com/${banner}`}
              alt=""
              loading="lazy"
              className="w-full object-fill sm:h-60 xl:h-96 rounded-md"
            />

            <div className="flex flex-col gap-5">
              <h6 className="text-[color:var(--blue)] font-bold text-lg sm:text-xl lg:text-2xl font-poppins">
                {event?.eventName}
              </h6>
              <p className="font-poppins">{parse(event?.desc || "")}</p>
            </div>

            <div>
              <h6 className="text-[color:var(--blue)] font-bold text-lg sm:text-xl lg:text-2xl font-poppins">
                Location
              </h6>
              <p>{event?.location}</p>

              <p>
                {/* <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14001.930206377461!2d77.16001955!3d28.675208399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1671309306997!5m2!1sen!2sin"
                  className="w-full h-96"
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  region="New Delhi"
                >
                  New Delhi
                </iframe> */}
              </p>
            </div>
          </div>

          <div className="md:flex-1 w-full flex flex-col gap-10">
            <div className="border-b-2 rounded-md p-3 lg:p-5">
              <h2 className="text-lg font-medium md:text-2xl lg:font-semibold pb-2 md:pb-3 font-poppins">
                Date and Time
              </h2>
              <p>
                {`${moment(event?.eventDate).format("Do MMMM, YYYY")} [${moment(
                  moment().set({
                    hour: event?.startTime?.split(":")[0],
                    minute: event?.startTime?.split(":")[1],
                  })
                ).format("h:mmA")} - ${moment(
                  moment().set({
                    hour: event?.endTime?.split(":")[0],
                    minute: event?.endTime?.split(":")[1],
                  })
                ).format("h:mmA")}]`}
              </p>
            </div>

            <div className="border-b-2 rounded-md p-3 lg:p-5">
              <h2 className="text-lg font-medium md:text-2xl lg:font-semibold pb-2 md:pb-3 font-poppins">
                Location
              </h2>
              <p>{event?.location}</p>
            </div>

            <div className="border-b-2 rounded-md p-3 lg:p-5">
              <h2 className="text-lg font-medium md:text-2xl lg:font-semibold pb-2 md:pb-3 font-poppins">
                Hosted By
              </h2>
              <div className="flex gap-5 items-center">
                <div className="flex-1">
                  <img
                    src={Logo}
                    loading="lazy"
                    className="w-16 h-16 object-fit rounded-full overflow-hidden border bg-gray-100"
                    alt=""
                  />
                </div>
                <div className="flex-[3]">
                  <h2 className="font-semibold md:text-lg">Lucknow Junction</h2>
                </div>
              </div>
            </div>

            <div className="border-b-2 rounded-md p-3 lg:p-5">
              <h2 className="text-lg font-medium md:text-2xl lg:font-semibold pb-2 md:pb-3 font-poppins">
                Spread the word
              </h2>
              <div className="flex gap-5">
                <AiOutlineWhatsApp className="text-3xl text-green-500 cursor-pointer" />
                <AiFillFacebook className="text-3xl text-[color:var(--blue)] cursor-pointer" />
                <BsInstagram className="text-3xl text-pink-400 cursor-pointer" />
                <AiFillLinkedin className="text-3xl text-blue-700 cursor-pointer" />
                <BsPinterest className="text-3xl text-red-500 cursor-pointer" />
              </div>

              <div className="border-2 rounded-md p-2 my-3">
                <p className="flex gap-5 items-center">
                  Recommend this to your friends
                  <BsHeartFill className="text-red-600" />
                </p>
              </div>

              <div className="border-2 rounded-md p-2 my-3">
                <div className="flex justify-between gap-5 items-center">
                  {/* <p>{path?.pathname}</p> */}
                  <input
                    type="text"
                    value={`http://lucknowjunction.com${path.pathname}`}
                    className="w-full outline-none"
                  />
                  <MdCopyAll
                    className="text-gray-500 text-xl lg:text-xl cursor-pointer hover:bg-gray-300"
                    onClick={() =>
                      copyLink(`http://lucknowjunction.com${path.pathname}`)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CardDetails;
