import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { passwordCreation } from "../../../Urls/baseurl";
import AuthContext from "../../../store/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {toast,ToastContainer} from "react-toastify"

const PasswordSetupModal = ({ passwordSetupModal, setPasswordSetupModal }) => {
  const theme = useMantineTheme();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const showUserPassword = (e) => {
    setShowPassword(!showPassword);
  };
  const authCtx = useContext(AuthContext);
  const navigation = useNavigate();
  

  const formHandler = async (e) => {
    try {
      console.log(password);
      const result = await fetch(`${passwordCreation}`, {
        method: "put",
        body: JSON.stringify({ password:password, otpToken: localStorage.getItem('otpToken'), email: localStorage.getItem('Email') }),
        headers: {
          'content-type': 'application/json'
        }
      });
      const jsonData = await result.json();
      if (!result.ok) {
        toast(jsonData.message);
        throw new Error(jsonData.message);
      }
      localStorage.removeItem('otpToken');
        localStorage.setItem("Name", jsonData.userName);
        localStorage.setItem("Email", jsonData.email);
      localStorage.setItem("IsLoggedIn", true);
       localStorage.setItem("userID", jsonData.userId);
       localStorage.setItem("userId", jsonData.userId);
       localStorage.setItem("Token", jsonData.token);
      // const expirationTime = new Date(
      //   new Date().getTime() + +jsonData.expiresIn * 1000
      // );
      // authCtx.login(
      //   jsonData.token,
      //   expirationTime,
      //   jsonData.userName,
      //   jsonData.userId,
      //   jsonData.email,
      //   'User'
      // );
      setPasswordSetupModal(false);
      navigation('/')
      

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
      opened={passwordSetupModal}
      onClose={() => setPasswordSetupModal(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        <div className="flex flex-col gap-5 max-w-sm mx-auto">
          <div className="flex flex-col gap-3">
            <h6 className="text-center text-xl lg:text-2xl xl:text-3xl font-bold">
              Setup your
              <span className="text-[color:var(--blue)]"> Password</span>
            </h6>
          </div>

          <div className="flex flex-col gap-4 md:gap-5">
            <div>
              <label htmlFor="password">Password</label>
              <div className="flex justify-between items-center border rounded-md focus:ring-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  className="w-full outline-none px-3 py-1.5"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <AiOutlineEye
                    size={20}
                    className="mx-5 cursor-pointer"
                    onClick={showUserPassword}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    className="mx-5 cursor-pointer"
                    onClick={showUserPassword}
                  />
                )}
              </div>
            </div>
            <div>
              <label htmlFor="confirmPass">Confirm Password</label>
              <div className="flex justify-between items-center border rounded-md focus:ring-1">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPass"
                  placeholder="confirm password"
                  className="w-full outline-none px-3 py-1.5"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
                {showPassword ? (
                  <AiOutlineEye
                    size={20}
                    className="mx-5 cursor-pointer"
                    onClick={showUserPassword}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    size={20}
                    className="mx-5 cursor-pointer"
                    onClick={showUserPassword}
                  />
                )}
              </div>
            </div>
          </div>

          <button className="px-3 py-1.5 md:px-5 text-white bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] rounded-md font-semibold w-full max-w-sm mx-auto mb-5" onClick={formHandler}>
            {/* <AiOutlineMail className="text-xl" /> */}
            Finish
          </button>
        </div>
        <ToastContainer />
      </div>
    </Modal>
  );
};

export default PasswordSetupModal;
