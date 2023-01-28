import React, { useEffect } from "react";
import AboutImg from "../assets/Banner1.jpg";
import AboutImg2 from "../assets/Banner11.jpg";

const About = () => {
  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    toTop();
  }, []);

  return (
    <div className="lg:max-w-[90vw] lg:mx-auto p-4 sm:p-6 min-h-[59vh]">
      <div className="py-4 px-6 md:py-3 md:px-14 lg:px-20 xl:px-24">
        <div className="py-2">
          <h2 className="text-[color:var(--blue)]">Home / About us</h2>
        </div>

        <div className="flex flex-col md:flex-row md:justify-between md:items-center md:gap-10 lg:gap-20">
          <div className="md:flex-1">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold max-w-xl tracking-wide py-4 lg:py-8">
              {/* There has to be a{" "}
              <span className="text-[color:var(--blue)]">better</span> way.
              <br />
              So we <span className="text-[color:var(--blue)]">built</span> it. */}
              <span className="text-[color:var(--blue)]">Vihanna Ventures</span>
            </h1>
            <p className="md:text-lg lg:text-xl">
              <span className="font-semibold lg:text-2xl">Lucknow </span>
              <span className="text-[color:var(--green)] font-semibold lg:text-2xl">
                Junction
              </span>{" "}
              <span className="font-medium">
                - Carnival Of Art, Craft, Culture & Events
              </span>
            </p>
          </div>

          <div className="md:flex-1">
            <img src={AboutImg} alt="" className="rounded-lg" />
          </div>
        </div>

        <div className="flex flex-col gap-6 md:gap-10 lg:gap-20 py-8 lg:py-14">
          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 relative">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl md:px-10">
                About Us
              </h2>
              <h2 className="hidden md:inline-flex absolute -top-7 -left-7 text-[color:var(--blue)] font-bold text-9xl -z-10 opacity-10">
                About
              </h2>
            </div>
            <p className="flex-1 tracking-wider leading-7 md:px-6 lg:px-20 sm:text-lg">
              Lucknow, the heart of culture and tradition, is known as the 'City
              of Nawabs'. With its rich history and customs, Lucknow is more
              than just attractive for tourism. From concerts, food festivals to
              high octane sports events, from weddings to political conferences
              to festivals to corporate conferences, being one of India's prime
              event destinations- there is a lot happening in Lucknow already.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row">
            <div className="flex-1 relative">
              <h2 className="font-semibold text-xl sm:text-2xl md:text-3xl lg:text-4xl md:px-10">
                What we do best?
              </h2>
              <h2 className="hidden md:inline-flex absolute -top-7 -left-7 text-[color:var(--blue)] font-bold text-9xl -z-10 opacity-10">
                WHAT
              </h2>
            </div>
            <p className="flex-1 tracking-wider leading-7 md:px-6 lg:px-20 sm:text-lg">
              Therefore, we at Lucknow Junction - an event (particular/specific)
              ticketing platform, seek the opportunity to bring you to different
              genres of the most adventurous, blastful, fun filled, entertaining
              and exciting events happening in the city. With us, getting to the
              city has gotten easier!
            </p>
          </div>
        </div>
      </div>

      <div className="py-8 text-white bg-[color:var(--blue)]">
        <div className="py-4 px-6 md:py-3 md:px-14 lg:px-20 xl:px-24">
          <div className="flex flex-col md:flex-row md:items-center">
            <div className="md:flex-[2]">
              <h4 className="text-lg md:text-xl lg:text-2xl font-semibold">
                Best of Lucknow Junction
              </h4>
              <p className="max-w-xl md:tracking-wider py-4">
                These events are just the many highlights to take you on a
                joyride of entertainment and fun. Here's one way to grab
                yourself some tickets for these alluring events. Get ready for
                some jaw dropping events in Lucknow!
              </p>
            </div>

            <div className="md:flex-1 p-5">
              <img src={AboutImg2} alt="" />
            </div>
          </div>
        </div>
      </div>

      <div className="py-4 px-6 md:py-3 md:px-14 lg:px-20 xl:px-24">
        <div className="py-8 lg:py-10">
          <div className="text-center pb-3 md:pb-5">
            <p className="max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto md:font-medium sm:text-lg md:text-xl">
              Get your tickets for the best Lucknow events on
              LucknowJunction.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
