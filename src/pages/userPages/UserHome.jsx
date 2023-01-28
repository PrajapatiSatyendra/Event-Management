import React from "react";

const UserHome = () => {
  const Name = localStorage.getItem("Name");

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div>
        <h1 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-poppins">
          Welcome to
        </h1>
      </div>
      <div>
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl py-2 md:font-semibold text-[color:var(--blue)] font-poppins">
          Your Dashboard, {Name}
        </h1>
      </div>
    </div>
  );
};

export default UserHome;
