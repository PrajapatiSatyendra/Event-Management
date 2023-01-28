import React, { useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import AttendeeDetailsModal from "./AttendeeDetailsModal";
import moment from "moment";
import { getEventsbyid } from "../../../Urls/baseurl";

const TicketsModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();
  const [attendeeDetailsModal, setAttendeeDetailsModal] = useState(false);

  const [numberOfTickets, setNumberOfTickets] = useState([]);
  // console.log(numberOfTickets);
  useEffect(() => {
    fetch(`${getEventsbyid}/${window.localStorage.getItem("EventIDForTicket")}`)
      .then((res) => res.json())
      .then((data) => {
        data.ticket.map((d) => {
          if (d.numberOfTickets <= d.customersId.length) {
            return numberOfTickets.push(d._id);
          }
          numberOfTickets.push("1");
        });
      });
  }, []);

  /*************** */
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [getQTY, setGetQTY] = useState(0);

  const saveCart = (myCart) => {
    let subt = 0;
    let qt = 0;
    let keys = Object.keys(myCart);
    for (let i = 0; i < keys.length; i++) {
      subt += myCart[keys[i]]?.price * myCart[keys[i]]?.qty;
      qt += myCart[keys[i]]?.qty;
    }
    setSubTotal(subt);
    setGetQTY(qt);
  };

  const addToCart = (itemCode, qty, price, name) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name };
    }

    setCart(newCart);
    saveCart(newCart);
  };

  // const clearCart = () => {
  //   setCart({});
  //   saveCart({});
  // };

  const removeFromCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]?.qty <= 0) {
      delete newCart[itemCode];
    }

    setCart(newCart);
    saveCart(newCart);
  };

  // console.log(cart);
  // console.log(Object.keys(cart).length);
  // console.log("qty:", getQTY);
  // console.log("total:", subTotal);
  /******************** */

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={5}
      overflow="inside"
      size="xl"
      centered
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        {/* <div
          className="absolute top-4 right-10 cursor-pointer flex flex-col items-center"
          onClick={() => setModalOpened(false)}
        >
          <AiOutlineCloseCircle className=" text-2xl text-red-500" />
          <span className="font-semibold text-red-500 text-sm">Close</span>
        </div> */}

        <div>
          <div className="flex flex-col gap-5 border-b-2 pb-4">
            <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold text-center text-[color:var(--blue)] py-2">
              {data?.eventName}
            </h3>

            <div className="flex flex-col gap-2">
              <p className="text-center text-gray-700">{data?.location}</p>
              <p className="text-center text-gray-700">
                {moment(data?.eventDate).format("MMMM D, YYYY")}
              </p>
            </div>

            <h6 className="text-left text-lg lg:text-2xl font-bold">Tickets</h6>
          </div>

          <div>
            {data?.ticket?.map((value, key) => {
              return (
                <div
                  key={value?._id}
                  className="border-b-2 py-2 md:py-4 lg:pt-8 flex flex-col sm:flex-row gap-5 justify-between"
                >
                  {numberOfTickets[key] == value?._id ? (
                    <>
                      <div className="sm:flex-[2]">
                        <h6 className="font-semibold text-lg pb-2">
                          {value.ticketName}
                        </h6>
                        <p>{value.ticketInfo}</p>
                        <p>Not Avaliable</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="sm:flex-[2]">
                        <h6 className="font-semibold text-lg pb-2">
                          {value.ticketName}
                        </h6>
                        <p>{value.ticketInfo}</p>
                      </div>

                      <div className="sm:flex-1 flex flex-col items-end gap-2">
                        <p>
                          <span className="text-[color:var(--blue)]">Rs.</span>{" "}
                          <span className="font-bold">{value.ticketPrice}</span>
                        </p>
                        <div className="flex gap-3 items-center">
                          <AiOutlineMinusCircle
                            className="text-2xl text-[color:var(--blue)] hover:text-[color:var(--hover-blue)] disabled:cursor-not-allowed "
                            onClick={() => {
                              removeFromCart(value?._id, 1);
                            }}
                          />
                          <span className="font-bold text-lg">
                            {/* {Object.keys(cart).map(
                          (item, i) =>
                            item === value._id &&
                            item.length == 0 && <span>{cart[item].qty}</span>
                        )}

                        {Object.keys(cart).map((item, i) => (
                          <span key={i}>
                            {item === value._id && (
                              <span>{cart[item].qty}</span>
                            )}
                          </span>
                        ))} */}

                            {Object.keys(cart).length > 0
                              ? Object.keys(cart).map((item, i) => (
                                  <span>
                                    {value._id in cart && item in cart
                                      ? item === value._id && cart[item].qty
                                      : ""}
                                  </span>
                                ))
                              : 0}
                          </span>

                          <AiOutlinePlusCircle
                            className="text-2xl text-[color:var(--blue)] hover:text-[color:var(--hover-blue)]"
                            onClick={() => {
                              addToCart(
                                value?._id,
                                1,
                                value?.ticketPrice,
                                value?.ticketName
                              );
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}

            <div className="flex justify-between items-end py-5">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <span className="text-[color:var(--blue)] font-medium">
                    QTY:
                  </span>
                  <span className="font-semibold">{getQTY}</span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[color:var(--blue)] font-medium">
                    Total:
                  </span>
                  <span className="font-semibold"> ₹ {subTotal}</span>
                </div>
              </div>
              <div>
                <button
                  disabled={Object.keys(cart).length === 0}
                  className="px-3 md:px-5 py-1 bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md text-white font-semibold md:text-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
                  onClick={() => {
                    setAttendeeDetailsModal(true);
                  }}
                >
                  Process
                </button>
                <AttendeeDetailsModal
                  attendeeDetailsModal={attendeeDetailsModal}
                  setAttendeeDetailsModal={setAttendeeDetailsModal}
                  quantity={getQTY}
                  totalPrice={subTotal}
                  cart={cart}
                  data={data}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default TicketsModal;

// import React, { useEffect, useState } from "react";
// import { Modal, useMantineTheme } from "@mantine/core";
// import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
// import AttendeeDetailsModal from "./AttendeeDetailsModal";
// import moment from "moment";

// const TicketsModal = ({ modalOpened, setModalOpened, data }) => {
//   const theme = useMantineTheme();
//   const [attendeeDetailsModal, setAttendeeDetailsModal] = useState(false);

//   /***************************************** */
//   const [cart, setCart] = useState({});
//   const [subTotal, setSubTotal] = useState(0);
//   const [getQTY, setGetQTY] = useState(0);

//   const saveCart = (myCart) => {
//     let subt = 0;
//     let qt = 0;
//     let keys = Object.keys(myCart);
//     for (let i = 0; i < keys.length; i++) {
//       subt += myCart[keys[i]]?.price * myCart[keys[i]]?.qty;
//       qt += myCart[keys[i]]?.qty;
//     }
//     setSubTotal(subt);
//     setGetQTY(qt);
//   };

//   const addToCart = (itemCode, qty, price, name) => {
//     let newCart = cart;
//     if (itemCode in cart) {
//       newCart[itemCode].qty = cart[itemCode].qty + qty;
//     } else {
//       newCart[itemCode] = { qty: 1, price, name };
//     }

//     setCart(newCart);
//     saveCart(newCart);
//   };

//   // const clearCart = () => {
//   //   setCart({});
//   //   saveCart({});
//   // };

//   const removeFromCart = (itemCode, qty) => {
//     let newCart = cart;
//     if (itemCode in cart) {
//       newCart[itemCode].qty = cart[itemCode].qty - qty;
//     }
//     if (newCart[itemCode]?.qty <= 0) {
//       delete newCart[itemCode];
//     }

//     setCart(newCart);
//     saveCart(newCart);
//   };

//   // console.log(cart);
//   // console.log(Object.keys(cart).length);
//   // console.log("qty:", getQTY);
//   // console.log("total:", subTotal);
//   /************************************************************ */

//   return (
//     <Modal
//       overlayColor={
//         theme.colorScheme === "dark"
//           ? theme.colors.dark[9]
//           : theme.colors.gray[2]
//       }
//       overlayOpacity={0.55}
//       overlayBlur={5}
//       overflow="inside"
//       size="xl"
//       centered
//       opened={modalOpened}
//       onClose={() => setModalOpened(false)}
//       withCloseButton={true}
//       transition="fade"
//       transitionDuration={500}
//       transitionTimingFunction="ease"
//     >
//       <div className="pr-4 md:px-10">
//         {/* <div
//           className="absolute top-4 right-10 cursor-pointer flex flex-col items-center"
//           onClick={() => setModalOpened(false)}
//         >
//           <AiOutlineCloseCircle className=" text-2xl text-red-500" />
//           <span className="font-semibold text-red-500 text-sm">Close</span>
//         </div> */}

//         <div>
//           <div className="flex flex-col gap-5 border-b-2 pb-4">
//             <h3 className="text-lg lg:text-xl xl:text-2xl font-semibold text-center text-[color:var(--blue)] py-2">
//               {data?.eventName}
//             </h3>

//             <div className="flex flex-col gap-2">
//               <p className="text-center text-gray-700">{data?.location}</p>
//               <p className="text-center text-gray-700">
//                 {moment(data?.eventDate).format("MMMM D, YYYY")}
//               </p>
//             </div>

//             <h6 className="text-left text-lg lg:text-2xl font-bold">Tickets</h6>
//           </div>

//           <div>
//             {data?.ticket?.map((value) => {
//               return (
//                 <div
//                   key={value?._id}
//                   className="border-b-2 py-2 md:py-4 lg:pt-8 flex flex-col sm:flex-row gap-5 justify-between"
//                 >
//                   <div className="sm:flex-[2]">
//                     <h6 className="font-semibold text-lg pb-2">
//                       {value.ticketName}
//                     </h6>
//                     <p>{value.ticketInfo}</p>
//                   </div>

//                   <div className="sm:flex-1 flex flex-col items-end gap-2">
//                     <p>
//                       <span className="text-[color:var(--blue)]">Rs.</span>{" "}
//                       <span className="font-bold">{value.ticketPrice}</span>
//                     </p>
//                     <div className="flex gap-3 items-center">
//                       <AiOutlineMinusCircle
//                         className="text-2xl text-[color:var(--blue)] hover:text-[color:var(--hover-blue)] disabled:cursor-not-allowed "
//                         onClick={() => {
//                           removeFromCart(value?._id, 1);
//                         }}
//                       />
//                       <span className="font-bold text-lg">
//                         {/* {Object.keys(cart).map(
//                           (item, i) =>
//                             item === value._id &&
//                             item.length == 0 && <span>{cart[item].qty}</span>
//                         )}

//                         {Object.keys(cart).map((item, i) => (
//                           <span key={i}>
//                             {item === value._id && (
//                               <span>{cart[item].qty}</span>
//                             )}
//                           </span>
//                         ))} */}

//                         {Object.keys(cart).length > 0
//                           ? Object.keys(cart).map((item, i) => (
//                               <span>
//                                 {value._id in cart && item in cart
//                                   ? item === value._id && cart[item].qty
//                                   : ""}
//                               </span>
//                             ))
//                           : 0}
//                       </span>

//                       <AiOutlinePlusCircle
//                         className="text-2xl text-[color:var(--blue)] hover:text-[color:var(--hover-blue)]"
//                         onClick={() => {
//                           addToCart(
//                             value?._id,
//                             1,
//                             value?.ticketPrice,
//                             value?.ticketName
//                           );
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}

//             <div className="flex justify-between items-end py-5">
//               <div className="flex flex-col gap-2">
//                 <div className="flex gap-4">
//                   <span className="text-[color:var(--blue)] font-medium">
//                     QTY:
//                   </span>
//                   <span className="font-semibold">{getQTY}</span>
//                 </div>
//                 <div className="flex gap-3">
//                   <span className="text-[color:var(--blue)] font-medium">
//                     Total:
//                   </span>
//                   <span className="font-semibold"> ₹ {subTotal}</span>
//                 </div>
//               </div>
//               <div>
//                 <button
//                   disabled={Object.keys(cart).length === 0}
//                   className="px-3 md:px-5 py-1 bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md text-white font-semibold md:text-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
//                   onClick={() => {
//                     setAttendeeDetailsModal(true);
//                   }}
//                 >
//                   Process
//                 </button>
//                 <AttendeeDetailsModal
//                   attendeeDetailsModal={attendeeDetailsModal}
//                   setAttendeeDetailsModal={setAttendeeDetailsModal}
//                   quantity={getQTY}
//                   totalPrice={subTotal}
//                   cart={cart}
//                   data={data}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default TicketsModal;
