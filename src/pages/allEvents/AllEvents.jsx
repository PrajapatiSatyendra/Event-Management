import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../components/cards/Card";

const AllEvents = () => {
  const allEventsData = useLocation().state;
  // console.log(allEventsData);

  useEffect(() => {
    const toTop = () => {
      window.scrollTo(0, 0);
    };
    toTop();
  }, []);

  return (
    <div className="min-h-[81vh]">
      <div className="text-center py-5 lg:py-8">
        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold font-poppins">
          All{" "}
          <span className="text-[color:var(--green)]">
            {allEventsData?.category}
          </span>{" "}
          Events in <span className="text-[color:var(--green)]">Lucknow</span>
        </h2>
      </div>

      <div className="pb-8 px-6 md:pb-10 md:px-14 lg:px-20 xl:px-24 flex flex-col gap-10">
        {allEventsData && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-3">
            {allEventsData?.data?.map((data) => {
              return <Card key={data._id} data={data} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEvents;
