import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import CreateAccountModal from "./CreateAccountModal";
import { checkInWithEmail, login } from "../../../Urls/baseurl";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ openLoginModal, setOpenLoginModal }) => {
  const theme = useMantineTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();
  const formHandler = async () => {
    try {
      const result = await fetch(login, {
        method: 'post',
        body: JSON.stringify({
          email: email, password: password
        }),
        headers: {
          'content-type': 'application/json'
        }
      });
      const jsonData = await result.json();
      if (!result.ok) {
        toast.error(jsonData.message);
        throw new Error(jsonData.message);
      }
        localStorage.setItem("Name", jsonData.userName);
        localStorage.setItem("Email", jsonData.email);
        localStorage.setItem("IsLoggedIn", true);
        localStorage.setItem("userID", jsonData.userId);
        localStorage.setItem("userId", jsonData.userId);
      localStorage.setItem("Token", jsonData.token);
      setOpenLoginModal(false);
        navigation("/");
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
      size="lg"
      centered
      opened={openLoginModal}
      onClose={() => setOpenLoginModal(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        <div className="flex flex-col gap-5 max-w-sm mx-auto">
          <div className="flex flex-col gap-3">
            <h6 className="text-center text-xl lg:text-2xl xl:text-3xl font-bold">
              Lucknow Junction
              <span className="text-[color:var(--blue)]"> Login</span>
            </h6>
            {/* <p className="text-center md:text-lg font-medium">
              Let's get{" "}
              <span className="text-[color:var(--blue)]">Started</span>
            </p> */}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="enter your email"
              className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              placeholder="enter your password"
              className="w-full outline-none px-3 py-1.5 border rounded-md focus:ring-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="px-3 py-1.5 md:px-5 text-white bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md font-semibold w-full max-w-sm mx-auto mb-5" onClick={formHandler}>
            Login
          </button>
        </div>
        <ToastContainer/>
      </div>
    </Modal>
  );
};

export default LoginModal;
