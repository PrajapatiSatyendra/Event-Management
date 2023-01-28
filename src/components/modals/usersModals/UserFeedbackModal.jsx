import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { Rating } from "react-simple-star-rating";
import { feedBackDataGetPOST } from "../../../Urls/baseurl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const tooltipArray = [
  "Terrible",
  "Terrible+",
  "Bad",
  "Bad+",
  "Average",
  "Average+",
  "Great",
  "Great+",
  "Awesome",
  "Awesome+",
];
const fillColorArray = [
  "#f17a45",
  "#f17a45",
  "#f19745",
  "#f19745",
  "#f1a545",
  "#f1a545",
  "#f1b345",
  "#f1b345",
  "#f1d045",
  "#f1d045",
];

const UserFeedbackModal = ({ openFeedbackModal, setOpenFeedbackModal }) => {
  const theme = useMantineTheme();

  const [rating, setRating] = useState();
  const [msg, setMsg] = useState("");
  const nav = useNavigate();
  const handleRating = (rate) => setRating(rate);

  const [submiteed, setSubmiteed] = useState(false);
  let hndlSubmit = (e) => {
    if (submiteed) {
      return;
    }
    setSubmiteed(true);

    e.preventDefault();
    const data = { rating, msg };
    const id = window.localStorage.getItem("userID");
    fetch(`${feedBackDataGetPOST}/${id}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        toast.success("Thanks For Giving Feedback");
        setTimeout(() => {
          setMsg("");
          setOpenFeedbackModal(false);
        }, 700);
      });
  };

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
      size="lg"
      centered
      opened={openFeedbackModal}
      onClose={() => setOpenFeedbackModal(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        <div className="flex flex-col gap-5 max-w-sm mx-auto">
          <div className="flex flex-col gap-3 tracking-wide">
            <h6 className="text-center text-xl lg:text-2xl xl:text-3xl font-bold">
              Send
              <span className="text-[color:var(--blue)]"> Feedback</span>
            </h6>
          </div>
          <form
            onSubmit={(e) => {
              hndlSubmit(e);
            }}
          >
            <div className="flex flex-col gap-4 md:gap-5">
              <div>
                <div className="flex flex-col gap-3">
                  <h6 className="text-lg">
                    How was your{" "}
                    <span className="text-[color:var(--blue)] font-semibold">
                      Experience?
                    </span>
                  </h6>
                  {/* <br /> */}
                  <p className="text-lg text-gray-800 leading-6 ">
                    How satisfied are you with the overall experience of our
                    website?
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h3>
                  We appreciate your{" "}
                  <span className="text-[color:var(--blue)]">Ratings</span>
                </h3>
                <div>
                  <Rating
                    onClick={handleRating}
                    SVGstyle={{
                      display: "inline",
                    }}
                    fillStyle={{
                      display: "inline",
                      position: "absolute",
                      top: "-14px",
                    }}
                    style={{ display: "inline" }}
                    size={50}
                    transition
                    allowFraction
                    showTooltip
                    tooltipArray={tooltipArray}
                    fillColorArray={fillColorArray}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-0.5">
                <label htmlFor="email">Any Problems?</label>
                <textarea
                  type="email"
                  id="email"
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  rows={5}
                  placeholder="Enter your message"
                  className="w-full outline-none px-3 py-1.5 border rounded-md ring-1 focus:ring-2"
                />
              </div>
            </div>

            <button className="px-3 py-1.5 my-3 md:px-5 text-white bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md font-semibold w-full max-w-sm mx-auto mb-5">
              {/* <AiOutlineMail className="text-xl" /> */}
              Submit
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default UserFeedbackModal;
