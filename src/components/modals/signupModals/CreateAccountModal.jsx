import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import PasswordSetupModal from "./PasswordSetupModal";
import { signUp } from "../../../Urls/baseurl";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";

const CreateAccountModal = ({
  openCreateAccountModal,
  setOpenCreateAccountModal,
}) => {
  const theme = useMantineTheme();

  const [passwordSetupModal, setPasswordSetupModal] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [otp, setOTP] = useState();
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await fetch(`${signUp}`, {
        method: "put",
        body: JSON.stringify({
          email: localStorage.getItem("Email"),
          firstName,
          lastName,
          otp,
          otpId:localStorage.getItem("otpId")
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const jsonData = await result.json();
      console.log(jsonData);
      if (!result.ok) {
        toast(jsonData.message);
        throw new Error(jsonData.message);
      }
      localStorage.setItem("otpToken", jsonData.otpToken);
      setPasswordSetupModal(true);
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
      setError(error);
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
      opened={openCreateAccountModal}
      onClose={() => setOpenCreateAccountModal(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        <div className="flex flex-col gap-5 max-w-sm mx-auto">
          <div className="flex flex-col gap-3">
            <h6 className="text-center text-xl lg:text-2xl xl:text-3xl font-bold">
              Let's create your
              <span className="text-[color:var(--blue)]"> Account</span>
            </h6>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4 md:gap-5">
              <div>
                <label htmlFor="email">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  id="email"
                  placeholder="your email"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                  value={localStorage.getItem("Email")}
                  readOnly
                />
                {errors.email && (
                  <p className="text-red-500 text-right text-sm">
                    *Provide a valid email address.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  id="firstName"
                  placeholder="your first name"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-right text-sm">
                    *Provide a valid first name.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  {...register("lastName", { required: true })}
                  type="text"
                  id="lastName"
                  placeholder="your last name"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-right text-sm">
                    *Provide a valid last name.
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="code">Verification Code</label>
                <input
                  {...register("otp", { required: true })}
                  type="text"
                  id="code"
                  placeholder="Enter OTP"
                  className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />
                <p className="text-end text-gray-500 text-sm">
                  An OTP has been sent to your email.
                </p>
                {errors.otp && (
                  <p className="text-red-500 text-right text-sm">
                    *Invalid OTP
                  </p>
                )}
              </div>
            </div>

            <button
              className="px-3 py-1.5 md:px-5 text-white bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md font-semibold w-full max-w-sm mx-auto mb-5"
            >
              {/* <AiOutlineMail className="text-xl" /> */}
              Register
            </button>
            <PasswordSetupModal
              passwordSetupModal={passwordSetupModal}
              setPasswordSetupModal={setPasswordSetupModal}
            />
          </form>
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default CreateAccountModal;
