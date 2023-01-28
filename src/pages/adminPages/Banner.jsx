import React, { useEffect, useState } from "react";
import {
  bannerGet,
  bannerPost,
  bannerPut,
  footerbannerGet,
  footerbannerPost,
  footerbannerPut,
  getImage,
} from "../../Urls/baseurl";

const Banner = () => {
  const [banner1, setBanner1] = useState(null);
  const [banner1backend, setBanner1backend] = useState();
  const [banner1File, setBanner1File] = useState();
  const [id1, setId1] = useState();

  const [banner2, setBanner2] = useState(null);
  const [banner2backend, setBanner2backend] = useState();
  const [banner2File, setBanner2File] = useState();
  const [id2, setId2] = useState();

  // _________________________________________imange 1_________________________________________
  useEffect(() => {
    fetch(bannerGet)
      .then((res) => res.json())
      .then((data) => {
        setBanner1backend(data.filename);
        setBanner1File(data.filename);
        setId1(data._id);
      });
  }, []);

  let hndlChange1 = (e, file) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("navbarBanner", file);

    fetch(`${bannerPut}/${id1}`, { method: "PUT", body: formData })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };

  // let hndlChange1 = (e, file) => {
  //   const formData = new FormData()
  //   formData.append('navbarBanner', file)

  //   fetch(`${bannerPost}`, { method: 'POST', body: formData }).then(res => res.json()).then((data) => { console.log(data); })
  // }

  // _________________________________________imange 2_________________________________________

  useEffect(() => {
    fetch(footerbannerGet)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setBanner2backend(data.filename);
        setBanner2File(data.filename);
        setId2(data._id);
      });
  }, []);

  let hndlChange2 = (e, file) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("footerBanner1", file);

    fetch(`${footerbannerPut}/${id2}`, { method: "PUT", body: formData })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
      });
  };

  // let hndlChange2 = (e, file) => {
  //   const formData = new FormData()
  //   formData.append('footerBanner1', file)

  //   fetch(`${footerbannerPost}`, { method: 'POST', body: formData }).then(res => res.json()).then((data) => { console.log(data); })
  // }

  return (
    <div>
      <div className="p-5 sm:px-10 md:px-12 lg:px-14">
        <div className="flex flex-col gap-5 lg:gap-8">
          <div className="flex flex-col gap-3 lg:gap-5 rounded-sm">
            <div>
              <h6 className="font-medium md:font-semibold md:text-xl tracking-wide">
                Banner 1
              </h6>
              <p className="text-gray-500 text-sm">
                Keep banner images of size 1600*400
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={
                  !banner1
                    ? `https://lucknowjunction-images.s3.amazonaws.com/${banner1backend}`
                    : banner1
                }
                alt=""
                className="w-full h-72 object-fill bg-gray-100"
              />
            </div>
            <div className="flex justify-end">
              <input
                type="file"
                name=""
                id="banner1"
                className="hidden"
                onChange={(e) => {
                  setBanner1(URL.createObjectURL(e.target.files[0]));
                  setBanner1File(e.target.files[0]);
                  hndlChange1(e, e.target.files[0]);
                }}
              />
              <label
                htmlFor="banner1"
                className="bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] px-3 py-1.5 border rounded-md text-white font-medium md:text-lg cursor-pointer"
              >
                Change Image
              </label>
            </div>
          </div>

          <div className="flex flex-col gap-3 lg:gap-5 rounded-sm">
            <div>
              <h6 className="font-medium md:font-semibold md:text-xl tracking-wide">
                Banner 2
              </h6>
              <p className="text-gray-500 text-sm">
                Keep banner images of size 1600*400
              </p>
            </div>
            <div className="rounded-lg overflow-hidden">
              <img
                src={!banner2 ? `https://lucknowjunction-images.s3.amazonaws.com/${banner2backend}` : banner2}
                alt=""
                className="w-full h-72 object-fill bg-gray-100"
              />
            </div>
            <div className="flex justify-end">
              <input
                type="file"
                name=""
                id="banner2"
                className="hidden"
                onChange={(e) => {
                  setBanner2(URL.createObjectURL(e.target.files[0]));
                  setBanner2File(e.target.files[0]);
                  hndlChange2(e, e.target.files[0]);
                }}
              />
              <label
                htmlFor="banner2"
                className="bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] px-3 py-1.5 border rounded-md text-white font-medium md:text-lg cursor-pointer"
              >
                Change Image
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
