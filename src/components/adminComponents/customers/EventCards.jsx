// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getTicket, getImage } from "../../../Urls/baseurl";

// // const eventsArr = [
// //   {
// //     id: 1,
// //     img: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F382705419%2F104000318639%2F1%2Foriginal.20221029-154844?w=512&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C666%2C1080%2C540&s=1575ed9f69de40ae7a839070003a6b05",
// //     eventName: "Colors of New Year",
// //     eventDate: "31st Dec, 2022",
// //     availableTickets: [
// //       {
// //         id: 123,
// //         ticketName: "Golden Ticket",
// //         ticketPrice: 1500,
// //         sold: 100,
// //         totalTickets: 500,
// //         customers: [
// //           {
// //             id: 123456,
// //             customerName: "Aman",
// //             customerEmail: "abcd@gmail.com",
// //             paidAmount: 1100,
// //             status: "paid",
// //           },
// //         ],
// //       },
// //       {
// //         id: 987,
// //         ticketName: "Platinum Ticket",
// //         ticketPrice: 2500,
// //         sold: 350,
// //         totalTickets: 400,
// //       },
// //     ],
// //   },
// //   {
// //     id: 2,
// //     img: "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1661236875%2Fomcvzmca20jm73c6iqhz.jpg",
// //     eventName: "New Year EVE party",
// //     eventDate: "1st Jan, 2023",
// //     availableTickets: [
// //       {
// //         id: 321,
// //         ticketName: "Single Ticket",
// //         ticketPrice: 1500,
// //         sold: 157,
// //         totalTickets: 1000,
// //       },
// //       {
// //         id: 456,
// //         ticketName: "Couple Ticket",
// //         ticketPrice: 2500,
// //         sold: 400,
// //         totalTickets: 500,
// //         customers: [
// //           {
// //             id: 849,
// //             customerName: "Punit",
// //             customerEmail: "abcd@gmail.com",
// //             paidAmount: 550,
// //             status: "paid",
// //           },
// //         ],
// //       },
// //     ],
// //   },
// // ];

// const EventCards = (props) => {
//   return (
//     <div>
//       <div className="pb-8 pt-4 px-6 md:pb-10 flex flex-col gap-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
//           {eventsArr.map((event) => (
//             <Link
//               to={`/admin/customers/${event.id}`}
//               key={event.id}
//               state={event}
//             >
//               <div className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max shadow-sm hover:shadow-md">
//                 <img
//                   src={event?.img}
//                   alt=""
//                   className=" w-full object-fill sm:object-cover md:object-fill sm:h-52 xl:h-56 group-hover:scale-105 transition-transform duration-200 ease-in-out "
//                 />
//                 <div className="flex flex-col gap-5 p-4 bg-white sm:h-[calc(100%-15rem)] ">
//                   <p className="text-xl font-bold text-center">
//                     {event?.eventName}
//                   </p>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCards;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTicket, getImage } from "../../../Urls/baseurl";

const EventCards = (props) => {
  const { query } = props;
  const [ticketArr, setEventsArr] = useState([]);
  const [data, setData] = useState();
  useEffect(() => {
    fetch(`${getTicket}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
              <Link
                to={`/admin/customers/${ticket._id}`}
                key={ticket?._id}
                state={ticket}
              >
                <div
                  className="border rounded-lg overflow-hidden group cursor-pointer bg-white h-max shadow-sm hover:shadow-md"
                  onClick={(e) => {
                    window.localStorage.setItem(
                      "CustmerDataMAiEventName",
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
                    <p className="text-xl font-bold text-center font-poppins">
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

export default EventCards;
