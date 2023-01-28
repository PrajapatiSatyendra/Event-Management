import React, { useEffect, useState } from "react";
import Card from "./Card";
import { getEventsByCategory, treandingEvent } from "../../Urls/baseurl";
import { Link } from "react-router-dom";
const Cards = () => {
  //   useEffect(() => {
  //     const toTop = () => {
  //       window.scrollTo(0, 0);
  //     };
  //     return () => {
  //       toTop();
  //     };
  //   }, []);

  const [newYearEvents, setNewYearEvents] = useState();
  const [happingEvents, setHappingEvents] = useState();
  const [treandingEvents, setTreandingEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const result = await fetch(`${getEventsByCategory}`, {
        method: "post",
        body: JSON.stringify({ category: "New Year" }),
        headers: {
          "content-type": "application/json",
        },
      });
      const jsonData = await result.json();
      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      setNewYearEvents(jsonData.data);

      // console.log(jsonData);
    };

    getEvents();
  }, []);

  useEffect(() => {
    const getEvents = async () => {
      const result = await fetch(`${getEventsByCategory}`, {
        method: "post",
        body: JSON.stringify({ category: "Happing Events" }),
        headers: {
          "content-type": "application/json",
        },
      });
      const jsonData = await result.json();
      if (!result.ok) {
        throw new Error(jsonData.message);
      }
      setHappingEvents(jsonData.data);
      // console.log(jsonData);
    };

    getEvents();
  }, []);

  useEffect(() => {
    fetch(treandingEvent)
      .then((res) => res.json())
      .then((data) => {
        setTreandingEvents(data);
      });
  }, []);

  return (
    <div>
      <div className="text-center py-5 lg:py-8">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold font-poppins">
          New Year Events in{" "}
          <span className="text-[color:var(--green)]">Lucknow</span>
        </h2>
      </div>

      <div className="pb-8 px-6 md:pb-10 md:px-14 lg:px-20 xl:px-24 flex flex-col gap-10">
        {newYearEvents && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
            {newYearEvents.slice(0, 9).map((data) => {
              return <Card key={data._id} data={data} />;
            })}
          </div>
        )}
      </div>

      <div className="flex justify-center pb-8">
        <Link
          to={`/allEvents`}
          state={{ data: newYearEvents, category: "New Year" }}
        >
          <button className="bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-lg font-semibold px-4 py-2 border rounded-md text-white">
            View More
          </button>
        </Link>
      </div>

      <div className="text-center py-5 lg:py-8">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold font-poppins">
          Trending Events in{" "}
          <span className="text-[color:var(--green)]">Lucknow</span>
        </h2>
      </div>

      <div className="pb-8 px-6 md:pb-10 md:px-14 lg:px-20 xl:px-24 flex flex-col gap-10">
        {treandingEvents && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
            {treandingEvents?.slice(0, 9).map((data) => {
              return <Card key={data._id} data={data} />;
            })}
          </div>
        )}
      </div>

      <div className="flex justify-center pb-8">
        <Link
          to={`/allEvents`}
          state={{ data: treandingEvents, category: "Trending" }}
        >
          <button className="bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-lg font-semibold px-4 py-2 border rounded-md text-white">
            View More
          </button>
        </Link>
      </div>

      <div className="text-center py-5 lg:py-8">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold font-poppins">
          Happening Events in{" "}
          <span className="text-[color:var(--green)]">Lucknow</span>
        </h2>
      </div>

      <div className="pb-8 px-6 md:pb-10 md:px-14 lg:px-20 xl:px-24 flex flex-col gap-10">
        {happingEvents && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
            {happingEvents.slice(0, 9).map((data) => {
              return <Card key={data._id} data={data} />;
            })}
          </div>
        )}
      </div>

      <div className="flex justify-center pb-8">
        <Link
          to={`/allEvents`}
          state={{ data: happingEvents, category: "Happening" }}
        >
          <button className="bg-[color:var(--blue)] hover:bg-[color:var(--hover-blue)] text-lg font-semibold px-4 py-2 border rounded-md text-white">
            View More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cards;
