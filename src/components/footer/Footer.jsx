import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs";
import ContactUsModal from "../modals/ContactUsModal";
import Logo from "../../assets/logo.jpeg";

const Footer = () => {
  const [openContactUsModal, setOpenContactUsModal] = useState(false);

  return (
    // <footer className="bg-[color:var(--gray)]">
    //   <div className="lg:max-w-[90vw] lg:mx-auto p-4 sm:p-6">
    //     <div className="md:flex md:justify-between">
    //       <div className="mb-6 md:mb-0">
    //         <Link to={`/`} className="flex items-center">
    //           <img src={Logo} className="rounded-full w-10 h-10 mr-2" alt="" />
    //           <span className="self-center text-2xl font-semibold text-white font-poppins">
    //             Lucknow{" "}
    //             <span className="text-[color:var(--green)]">Junction</span>
    //           </span>
    //         </Link>
    //       </div>
    //       <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
    //         <div>
    //           <h2 className="mb-6 text-sm font-semibold text-white uppercase">
    //             Resources
    //           </h2>
    //           <ul className="text-gray-400">
    //             <li className="mb-4">
    //               <Link to={`/aboutUs`} className="hover:underline">
    //                 About Us
    //               </Link>
    //             </li>
    //             <li
    //               className="cursor-pointer hover:underline"
    //               onClick={() => setOpenContactUsModal(true)}
    //             >
    //               {/* <Link className="hover:underline"> */}
    //               Contact Us
    //               {/* </Link> */}
    //             </li>
    //             <ContactUsModal
    //               openContactUsModal={openContactUsModal}
    //               setOpenContactUsModal={setOpenContactUsModal}
    //             />
    //           </ul>
    //         </div>
    //         <div>
    //           <h2 className="mb-6 text-sm font-semibold text-white uppercase">
    //             Follow us
    //           </h2>
    //           <ul className="text-gray-400">
    //             <li className="mb-4">
    //               <a href="" target="_blank" className="hover:underline ">
    //                 Instagram
    //               </a>
    //             </li>
    //             <li>
    //               <a
    //                 href="https://www.facebook.com/lucknowjunction.lko?mibextid=ZbWKwL"
    //                 target="_blank"
    //                 className="hover:underline"
    //               >
    //                 Facebook
    //               </a>
    //             </li>
    //           </ul>
    //         </div>
    //         <div>
    //           <h2 className="mb-6 text-sm font-semibold text-white uppercase">
    //             Legal
    //           </h2>
    //           <ul className="text-gray-400">
    //             <li className="mb-4">
    //               <Link to={`/privacyPolicies`} className="hover:underline">
    //                 Privacy Policy
    //               </Link>
    //             </li>
    //             <li>
    //               <Link to={`/termsAndConditions`} className="hover:underline">
    //                 Terms &amp; Conditions
    //               </Link>
    //             </li>
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
    //     <div className="sm:flex sm:items-center sm:justify-between">
    //       <span className="text-sm md:text-base text-gray-400 sm:text-center">
    //         © 2022 <Link to={`/`}>Lucknow Junction</Link>. All Rights Reserved.
    //       </span>
    //       <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
    //         <a
    //           target="_blank"
    //           href="https://www.facebook.com/lucknowjunction.lko?mibextid=ZbWKwL"
    //         >
    //           <BsFacebook className="text-lg text-gray-400 hover:text-gray-200" />
    //           <span className="sr-only">Facebook page</span>
    //         </a>

    //         <a target="_blank" href="">
    //           <BsInstagram className="text-lg text-gray-400 hover:text-gray-200" />
    //           <span className="sr-only">Instagram page</span>
    //         </a>

    //         <a target="_blank" href="">
    //           <BsTwitter className="text-lg text-gray-400 hover:text-gray-200" />
    //           <span className="sr-only">Twitter page</span>
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </footer>

    <footer className="bg-[color:var(--gray)] text-white">
      <div className="lg:max-w-[90vw] lg:mx-auto p-4 sm:p-6">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <div className="flex justify-between items-center gap-5 w-full sm:flex-col sm:gap-1 sm:w-max">
            <Link to={`/`}>
              <h2 className="text-white font-poppins text-lg font-medium">
                Lucknow{" "}
                <span className="text-[color:var(--green)]">Junction</span>
              </h2>
            </Link>

            <div className="flex items-center gap-3 sm:gap-5 pt-1">
              <a
                target="_blank"
                href="https://www.facebook.com/lucknowjunction.lko?mibextid=ZbWKwL"
              >
                <span className="text-gray-500 flex items-center gap-2 hover:text-white">
                  <BsFacebook />
                </span>
              </a>
              <a target="_blank" href="">
                <span className="text-gray-500 flex items-center gap-2 hover:text-white">
                  <BsInstagram />
                </span>
              </a>
              <a target="_blank" href="">
                <span className="text-gray-500 flex items-center gap-2 hover:text-white">
                  <BsTwitter />
                </span>
              </a>
            </div>
          </div>

          <div className="flex gap-5 flex-wrap sm:flex-row sm:gap-5 mt-2">
            <Link to={`/aboutUs`}>
              <span className="text-gray-400 tracking-tighter hover:underline">
                About Us
              </span>
            </Link>

            <span
              className="text-gray-400 tracking-tighter cursor-pointer hover:underline"
              onClick={() => setOpenContactUsModal(true)}
            >
              Contact Us
            </span>
            <ContactUsModal
              openContactUsModal={openContactUsModal}
              setOpenContactUsModal={setOpenContactUsModal}
            />

            <Link to={`/privacyPolicies`}>
              <span className="text-gray-400 tracking-tighter hover:underline">
                Privacy Policy
              </span>
            </Link>
            <Link to={`/refundPolicies`}>
              <span className="text-gray-400 tracking-tighter hover:underline">
                Refund Policies
              </span>
            </Link>
            <Link to={`/termsAndConditions`}>
              <span className="text-gray-400 tracking-tighter hover:underline">
                Terms and Conditions
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
