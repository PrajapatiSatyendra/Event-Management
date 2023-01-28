import React, { useEffect, useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import moment from "moment";
import { getImage } from "../../Urls/baseurl";

const Card = ({ data }) => {
  const [ticketPrice, setTicketPrice] = useState(0);
  const [month, setMonth] = useState("");
  const [date, setDate] = useState(0);
  const [banner, setBanner] = useState();

  useEffect(() => {
    let leastPrice = 99999999;
    if (data) {
      data.ticket?.forEach((element) => {
        if (element.ticketPrice < leastPrice) {
          leastPrice = element.ticketPrice;
        }
      });
      setMonth(moment(data.eventDate).format("MMM"));
      setDate(moment(data.eventDate).format("DD"));
      setTicketPrice(leastPrice);
      setBanner(data.imageFilename);
    }
  });

  return (
    <Link to={`/event/${data?._id}`} state={data}>
      <div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-full shadow-sm hover:shadow-md">
        <img
          src={`https://lucknowjunction-images.s3.amazonaws.com/${banner}`}
          alt=""
          loading="lazy"
          className=" w-full object-fill sm:object-cover md:object-fill h-48 sm:h-60 xl:h-64 group-hover:scale-105 transition-transform duration-200 ease-in-out "
        />
        <div className="flex gap-5 justify-between items-center p-5 bg-white sm:h-[calc(100%-15rem)] ">
          <div className="flex-1 font-bold">
            <p className="text-[color:var(--blue)] ">
              {month.toString().toUpperCase()}
            </p>
            <span>{date}</span>
          </div>

          <div className="flex-[5] flex flex-col gap-1 justify-between ">
            <p className="text-xl font-bold font-poppins">{data?.eventName}</p>
            <p className="text-sm text-gray-700 mb-3 ">
              {data?.location?.length > 50
                ? data?.location?.slice(0, 40) + "..."
                : data?.location}
            </p>

            <button className="flex items-center gap-1 font-semibold">
              <span className="text-[color:var(--blue)] font-bold">₹</span>
              {ticketPrice}
              <BsArrowRight />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
