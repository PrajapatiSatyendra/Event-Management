import React, { useState, useEffect } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import OrderSummary from "./OrderSummary";

const AttendeeDetailsModal = ({
  attendeeDetailsModal,
  setAttendeeDetailsModal,
  quantity,
  totalPrice,
  cart,
  data,
}) => {
  const theme = useMantineTheme();

  const [checkoutModal, setCheckoutModal] = useState(false);
  const [adjCart, setadjCart] = useState();
  const [attendees, setAttendees] = useState([{}]);

  // console.log("qty:", quantity);
  // console.log("total:", totalPrice);
  useEffect(() => {
    if (cart) {
      let arr = [];
      Object.keys(cart).map((j) => {
        for (let i = 0; i < cart[j]?.qty; i++) {
          const element = cart[j];
          const element1 = { ...element };
          console.log(j);
          element1.ticketId = j;
          element1.ticketNumber = i + 1;
          arr.push(element1);
        }
      });
      setadjCart(arr);
    }
  }, [attendeeDetailsModal]);

  const setName = (value, ticketId, ticketPrice, ticketType, i) => {
    // console.log(ticketPrice, ticketType);
    let adjAttendees = [...attendees];
    if (i === 0) {
      adjAttendees[i].name = value;
      adjAttendees[i].ticketId = ticketId;
      adjAttendees[i].ticketPrice = ticketPrice;
      adjAttendees[i].ticketType = ticketType;
    } else if (!attendees[i]) {
      adjAttendees.push({
        name: value,
        ticketId: ticketId,
        ticketPrice: ticketPrice,
        ticketType: ticketType,
      });
    } else {
      adjAttendees[i].name = value;
    }
    setAttendees(adjAttendees);
  };

  const setEmail = (value, i) => {
    let adjAttendees = [...attendees];
    if (!attendees[i]) {
      adjAttendees.push({ email: value });
    } else {
      adjAttendees[i].email = value;
    }
    setAttendees(adjAttendees);
  };

  const setMobileNum = (value, i) => {
    let adjAttendees = [...attendees];
    if (!attendees[i]) {
      adjAttendees.push({ mobileNum: value });
    } else {
      adjAttendees[i].mobileNum = value;
    }
    setAttendees(adjAttendees);
  };

  // console.log(data);

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
      opened={attendeeDetailsModal}
      onClose={() => setAttendeeDetailsModal(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        <div>
          <div className="flex flex-col gap-5 border-b-2 pb-4">
            <h6 className="text-left text-lg lg:text-2xl font-bold text-[color:var(--blue)]">
              {data?.eventName}
            </h6>

            <form>
              {adjCart && (
                <>
                  {Object.keys(adjCart)?.map((item, i) => (
                    <div className="my-1" key={i}>
                      <div className="flex flex-col gap-1 border-2 rounded-md p-5">
                        <div className="text-sm text-gray-600">
                          <div>
                            Ticket Name :{" "}
                            <span className="text-gray-800">
                              {adjCart[item]?.name}
                            </span>
                          </div>
                          <div>
                            Ticket Number:{" "}
                            <span className="text-gray-800">
                              #{adjCart[item]?.ticketNumber}
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            id="name"
                            value={attendees[i]?.name}
                            placeholder="Enter Attendee's Name"
                            className="px-3 py-1.5 w-full outline-none border-2 focus:ring-1 rounded-md"
                            required
                            onChange={(e) => {
                              setName(
                                e.target.value,
                                adjCart[item].ticketId,
                                adjCart[item].price,
                                adjCart[item].name,
                                i
                              );
                            }}
                          />
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            id="email"
                            placeholder="Enter Attendee's Email"
                            className="px-3 py-1.5 w-full outline-none border-2 focus:ring-1 rounded-md"
                            required
                            value={attendees[i]?.email}
                            onChange={(e) => {
                              setEmail(e.target.value, i);
                            }}
                          />
                        </div>

                        <div className="flex flex-col gap-0.5">
                          <label htmlFor="phoneNum">Mobile Number</label>
                          <input
                            type="text"
                            id="phoneNum"
                            placeholder="Enter Attendee's Mobile Number"
                            className="px-3 py-1.5 w-full outline-none border-2 focus:ring-1 rounded-md"
                            required
                            value={attendees[i]?.mobileNum}
                            onChange={(e) => {
                              setMobileNum(e.target.value, i);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </form>
          </div>

          <div>
            <div className="flex justify-between items-end pt-5">
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <span className="text-[color:var(--blue)] font-medium">
                    QTY:
                  </span>
                  <span className="font-semibold">{quantity}</span>
                </div>
                {/* <div className="flex gap-3">
                  <span className="text-blue-500 font-medium">Price:</span>
                  <span className="font-semibold">₹ 999</span>
                </div> */}
                <div className="flex gap-3">
                  <span className="text-[color:var(--blue)] font-medium">
                    Total:
                  </span>
                  <span className="font-semibold"> ₹ {totalPrice}</span>
                </div>
              </div>
              <div>
                <button
                  onClick={() => setCheckoutModal(true)}
                  className="px-3 md:px-5 py-1 bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md text-white font-semibold md:text-lg disabled:bg-blue-300 disabled:cursor-not-allowed"
                >
                  Continue to Checkout
                </button>

                <OrderSummary
                  checkoutModal={checkoutModal}
                  setCheckoutModal={setCheckoutModal}
                  quantity={quantity}
                  totalPrice={totalPrice}
                  cart={cart}
                  data={data}
                  attendeesDetails={attendees}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AttendeeDetailsModal;
