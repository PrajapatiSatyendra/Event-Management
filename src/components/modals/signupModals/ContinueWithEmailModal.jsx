import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import CreateAccountModal from "./CreateAccountModal";
import { checkInWithEmail } from "../../../Urls/baseurl";
import LoginModal from "./LoginModal";
import { toast, ToastContainer } from "react-toastify";
import { useForm } from "react-hook-form";

const ContinueWithEmailModal = ({
  openContinueWithEmailModal,
  setOpenContinueWithEmailModal,
}) => {
  const theme = useMantineTheme();

  const [openCreateAccountModal, setOpenCreateAccountModal] = useState(false);
  const [error, setError] = useState();
  // const [openEnterPasswordModal, setOpenEnterPasswordModal] = useState(false);
  // const [openLoginModal, setOpenLoginModal] = useState(false);

  const [email, setEmail] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await fetch(`${checkInWithEmail}`, {
        method: "put",
        body: JSON.stringify({ email }),
        headers: {
          "content-type": "application/json",
        },
      });

      const jsonData = await result.json();
      if (!result.ok) {
        toast(jsonData.message);
        throw new Error(jsonData.message);
      }
      setError(null);
      localStorage.setItem("Email", jsonData.posts.email);
      localStorage.setItem("otpId", jsonData.posts.otpId);
      setOpenCreateAccountModal(true);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
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
      opened={openContinueWithEmailModal}
      onClose={() => setOpenContinueWithEmailModal(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        <div className="flex flex-col gap-5 max-w-sm mx-auto">
          <div className="flex flex-col gap-3">
            <h6 className="text-center text-xl lg:text-2xl xl:text-3xl font-bold">
              <span className="text-[color:var(--blue)]">Sign Up </span>
              with
              <span className="text-[color:var(--blue)]"> Email</span>
            </h6>
            <p className="text-center md:text-lg font-medium">
              Let's get{" "}
              <span className="text-[color:var(--blue)]">Started</span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-0.5">
              <label htmlFor="email">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                id="email"
                placeholder="your email"
                className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1 mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p className="text-red-500 text-right text-sm">
                  *Provide a valid email address.
                </p>
              )}
            </div>

            <button className="px-3 py-1.5 md:px-5 text-white bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md font-semibold w-full max-w-sm mx-auto mb-5">
              {/* <AiOutlineMail className="text-xl" /> */}
              Continue
            </button>
          </form>

          <CreateAccountModal
            openCreateAccountModal={openCreateAccountModal}
            setOpenCreateAccountModal={setOpenCreateAccountModal}
          />
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default ContinueWithEmailModal;
