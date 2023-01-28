import React, { useEffect, useState } from "react";
import { bannerGet, getImage } from "../../Urls/baseurl";
import { BsWhatsapp } from "react-icons/bs";
import ReactWhatsapp from "react-whatsapp";


const Header = () => {
  const [img, setImg] = useState();
  useEffect(() => {
    fetch(bannerGet)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setImg(data?.filename);
      });
  }, []);
  console.log(img);

  return (
    <div className="relative">
      <img
        src={`https://lucknowjunction-images.s3.amazonaws.com/${img}`}
        //src={`${getImage}/${img}`}
        alt=""
        className="object-fill h-44 sm:h-60 lg:h-64 xl:h-72 w-full "
      />

      {/* <span className="absolute bottom-0 -left-2 font-semibold text-sm md:text-base lg:text-lg xl:text-2xl bg-[#153FD1] text-white px-5 py-2 -skew-x-[25deg]">
        Explore Lucknow
      </span> */}

      <div>
        {/* <a href="https:/wa.me/919369048005" target="_blank">
          <BsWhatsapp className="whatsapp_float p-2 bg-green-500 shadow-lg" />
        </a> */}
        <ReactWhatsapp
          number="+91  9369048005"
          message="join chat"
        >
          <BsWhatsapp className="whatsapp_float p-2 bg-green-500 shadow-lg" />
        </ReactWhatsapp>
      </div>
    </div>
  );
};

export default Header;
