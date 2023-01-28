import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { Rating } from "react-simple-star-rating";

const ViewUsersFeedbackModal = ({
  viewModalOpened,
  setViewModalOpened,
  msg,
}) => {
  const theme = useMantineTheme();

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
      opened={viewModalOpened}
      onClose={() => setViewModalOpened(false)}
      withCloseButton={true}
      transition="fade"
      transitionDuration={500}
      transitionTimingFunction="ease"
    >
      <div className="pr-4 md:px-10">
        <div className="flex flex-col gap-5 max-w-sm mx-auto">
          <div className="flex flex-col gap-3 tracking-wide pb-1">
            <h6 className="text-center text-xl lg:text-2xl xl:text-3xl font-bold">
              User
              <span className="text-[color:var(--blue)]"> Feedback</span>
            </h6>
          </div>

          <div className="pb-3 lg:pb-5">
            <p className="text-lg text-gray-800 leading-6 ">{msg}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewUsersFeedbackModal;
