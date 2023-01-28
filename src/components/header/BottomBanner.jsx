import React, { useEffect, useState } from "react";
import { footerbannerGet, getImage } from "../../Urls/baseurl";
const BottomBanner = () => {
  const [img, setImg] = useState();
  useEffect(() => {
    fetch(footerbannerGet)
      .then((res) => res.json())
      .then((data) => {
        setImg(data?.filename);
        console.log(data);
      });
  }, []);

  return (
    <div className="relative">
      <img
        src={`https://lucknowjunction-images.s3.amazonaws.com/${img}`}
        loading="lazy"
        alt=""
        className="object-fill h-36 sm:h-52 w-full "
      />

      {/* <span className="absolute bottom-0 -left-2 font-semibold text-sm md:text-base lg:text-lg xl:text-2xl bg-[#153FD1] text-white px-5 py-2 -skew-x-[25deg]">
        Explore Lucknow
      </span> */}
    </div>
  );
};

export default BottomBanner;
