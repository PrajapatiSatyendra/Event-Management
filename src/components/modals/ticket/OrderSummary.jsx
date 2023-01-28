import React, { useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { paymentCheckout } from "../../../Urls/baseurl";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { verifyPayment } from "../../../Urls/baseurl";

const OrderSummary = ({
  checkoutModal,
  setCheckoutModal,
  quantity,
  totalPrice,
  cart,
  data,
  attendeesDetails,
}) => {
  const theme = useMantineTheme();
  const [attendees, setAttendees] = useState();
  const navigation = useNavigate();

  useEffect(() => {
    setAttendees(attendeesDetails);
  }, [checkoutModal]);

  const payHandler = async (e) => {
    e.preventDefault();
  

        try {
          const bodyData = {
            userId: localStorage.getItem("userID"),
            totalPrice,
            attendeesDetails,
            eventData: data,
          };
          const result = await fetch(`${paymentCheckout}`, {
            method: "post",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(bodyData),
          });

          const jsonData = await result.json();
          
          if (!result.ok) {
            throw new Error(jsonData.message);
          }
          let order = jsonData.order;
          var options = {
            key: "rzp_live_YMwpt8RpGsQxmw", // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Lucknow Junction",
            description: "Live Transaction",
            image:
              "https://scontent.fknu1-2.fna.fbcdn.net/v/t39.30808-6/299945511_460146106125199_1265948012191844166_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=5L6W7nLMKoQAX_5D-r6&_nc_ht=scontent.fknu1-2.fna&oh=00_AfBe6V4ixBXsSOZ-SBE98iSYDdP2UCQGI9Yq9xHpPpwbVQ&oe=63B15699",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: verifyPayment,
            notes: {
              address: "Razorpay Corporate Office",
            },
            theme: {
              color: "#35364A",
            },
          };
            var rzp1 = new window.Razorpay(options);

            rzp1.open();
 
        } catch (error) {
          console.log(error);
        }
  }


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
      opened={checkoutModal}
      onClose={() => setCheckoutModal(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        <div>
          <div className="flex flex-col gap-5 border-b-2 pb-4">
            <h6 className="text-left text-lg lg:text-2xl font-bold">
              Order Summary
            </h6>
            <h6 className="text-left text-lg lg:text-xl font-bold text-[color:var(--blue)]">
              {data.eventName}
            </h6>
            {attendees && (
              <>
                {attendees?.map((attendee) => {
                  return (
                    <div
                      key={attendee}
                      className="border-2 rounded-md shadow-md hover:shadow-lg w-full p-2 md:p-5 flex flex-col gap-1 relative"
                    >
                      <div className="absolute top-2 right-2 text-white bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] px-3 py-1 border shadow-lg rounded-md">
                        ₹ {attendee.ticketPrice}
                      </div>

                      <p className="text-lg font-semibold">{attendee.name}</p>
                      <p className="text-gray-600 font-medium">
                        {attendee.mobileNum}
                      </p>
                      <p className="text-gray-600 font-medium">
                        {attendee.email}
                      </p>
                      <p className="text-gray-600 font-medium">
                        {attendee.ticketType} Ticket
                      </p>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          <div>
            <div className="flex justify-between items-end pt-5">
              <div className="flex gap-2">
                <div className="flex-1 flex flex-col whitespace-nowrap gap-2 text-[color:var(--blue)] font-medium">
                  <div>Sub Total:</div>
                  <div>Fees and Taxes:</div>
                  <div>Order Total:</div>
                </div>

                <div className="flex-1 flex flex-col whitespace-nowrap gap-2 font-semibold">
                  <span>₹ {totalPrice}</span>
                  <span>₹ 0</span>
                  <span>₹ {totalPrice}</span>
                </div>
              </div>
              <div>
                <button
                  className="px-3 md:px-5 py-1 bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md text-white font-semibold md:text-lg disabled:bg-blue-200 disabled:cursor-not-allowed"
                  onClick={payHandler}
                >
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default OrderSummary;
