import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { AiOutlineGoogle, AiOutlineMail } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import ContinueWithEmailModal from "./ContinueWithEmailModal";
import { signInWithGoogle, signInWithFacebook } from "../signupModals/google/firebase";
import FacebookLoginComponent from "../signupModals/google/facebook";
import LoginModal from "./LoginModal";
import { Link } from "react-router-dom";

const SignInModal = ({ openSignInModal, setOpenSignInModal }) => {
  const theme = useMantineTheme();

  const [openContinueWithEmailModal, setOpenContinueWithEmailModal] =
    useState(false);

  const [openLoginModal, setOpenLoginModal] = useState(false);

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
      opened={openSignInModal}
      onClose={() => setOpenSignInModal(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        <div>
          <div className="flex flex-col gap-5 pb-4">
            <h6 className="text-center text-xl lg:text-2xl xl:text-3xl font-bold">
              Quick <span className="text-[color:var(--blue)]">Sign Up</span>
            </h6>
            <p className="text-center md:text-lg font-medium">
              Join events, Get recommendations based on your interest. Find
              where your friends are going.
            </p>
          </div>

          <div className="flex flex-col items-center gap-5 max-w-sm mx-auto">
            <button
              onClick={() => setOpenContinueWithEmailModal(true)}
              className="flex justify-center items-center gap-4 px-3 py-1.5 md:px-5 bg-gray-200 rounded-md font-medium w-full hover:bg-gray-300"
            >
              <AiOutlineMail className="text-xl text-[color:var(--blue)]" />
              Continue with Email
            </button>
            <ContinueWithEmailModal
              openContinueWithEmailModal={openContinueWithEmailModal}
              setOpenContinueWithEmailModal={setOpenContinueWithEmailModal}
            />

            <button
              onClick={() => {
                signInWithGoogle();
                setOpenSignInModal(false);
              }}
              className="flex justify-center items-center gap-4 px-3 py-1.5 md:px-5 bg-gray-200 rounded-md font-medium w-full hover:bg-gray-300"
            >
              <AiOutlineGoogle className="text-xl text-green-500" />
              Continue with Google
            </button>

            <button onClick={() => {
              signInWithFacebook();
              setOpenSignInModal(false);
            }}
              className="flex justify-center items-center gap-4 px-3 py-1.5 md:px-5 bg-gray-200 rounded-md font-medium w-full hover:bg-gray-300">
              <FaFacebook className="text-xl text-blue-700" />
              Continue with Facebook
              {/* <FacebookLoginComponent></FacebookLoginComponent> */}
            </button>
          </div>

          <div className="pt-8 text-center">
            <p
              className="max-w-sm mx-auto text-center cursor-pointer"
              onClick={() => setOpenLoginModal(true)}
            >
              Already have an account?{" "}
              <span className="text-[color:var(--blue)] font-semibold">
                Login here
              </span>
            </p>
            <LoginModal
              openLoginModal={openLoginModal}
              setOpenLoginModal={setOpenLoginModal}
            />
          </div>

          <div className="py-4 text-center">
            <p>By Signing In, I Agree to Lucknow Junction's</p>
            <p>
              <Link
                to={`/termsAndConditions`}
                onClick={() => setOpenSignInModal(false)}
              >
                <span className="text-[color:var(--blue)]">
                  Terms and Conditions
                </span>{" "}
              </Link>
              and{" "}
              <Link
                to={`/privacyPolicies`}
                onClick={() => setOpenSignInModal(false)}
              >
                <span className="text-[color:var(--blue)]">Privacy Policy</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;
