import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, useMantineTheme } from "@mantine/core";
import { BsFillPersonFill } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { BiMessageAltDetail } from "react-icons/bi";
import { contactQureyPost } from "../../Urls/baseurl";

const ContactUsModal = ({ openContactUsModal, setOpenContactUsModal }) => {
  const theme = useMantineTheme();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const data = { name, email, message };
      fetch(contactQureyPost, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          toast.success("Form submitted.");
        });

      setTimeout(() => {
        setOpenContactUsModal(false);
      }, 2500);
    } catch (error) {
      console.log(error);
    }
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      overflow="inside"
      size="auto"
      centered
      opened={openContactUsModal}
      onClose={() => setOpenContactUsModal(false)}
      withCloseButton={false}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="md:px-10 md:p-10">
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="md:flex-1">
            <h2 className="text-center text-lg md:text-xl lg:text-2xl font-semibold mb-3">
              Get in Touch
            </h2>

            <form
              className="flex flex-col max-w-xl mx-auto mb-5 bg-gray-200 p-5 rounded-lg"
              onSubmit={submitForm}
            >
              <div>
                <div className="bg-white flex flex-row justify-center items-center mt-2 py-1.5 px-2 rounded border border-black">
                  <BsFillPersonFill className="text-gray-600 text-xl" />
                  <input
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className=" bg-white py-2 px-3 w-full outline-none"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="bg-white flex flex-row justify-center items-center mt-2 py-1.5 px-2 rounded border border-black">
                  <FiMail className="text-gray-600 text-xl" />
                  <input
                    type="text"
                    id="email"
                    placeholder="Your Email"
                    className=" bg-white py-2 px-3 w-full outline-none"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div>
                <div className="bg-white flex flex-row justify-center items-center mt-2 py-1.5 px-2 rounded border border-black">
                  <BiMessageAltDetail className="text-gray-600 text-xl" />
                  <textarea
                    type="text"
                    id="message"
                    placeholder="Message"
                    className=" bg-white py-2 px-3 w-full outline-none"
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-5 justify-around text-xs font-semibold text-white pt-6 pb-3">
                <button
                  type="button"
                  className="flex-1 w-fit sm:flex-none bg-[color:var(--red)] hover:bg-[color:var(--hover-red)] border-0 py-2 px-8 focus:outline-none rounded md:text-sm lg:text-lg"
                  onClick={() => setOpenContactUsModal(false)}
                >
                  Discard
                </button>
                <button
                  type="submit"
                  className="flex-1 w-fit sm:flex-none bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] border-0 py-2 px-8 focus:outline-none rounded md:text-sm lg:text-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default ContactUsModal;
