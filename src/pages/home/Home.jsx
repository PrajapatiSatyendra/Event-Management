import React from "react";
import Cards from "../../components/cards/Cards";
import BottomBanner from "../../components/header/BottomBanner";
import Header from "../../components/header/Header";

const Home = () => {
  return (
    <div>
      {/* <Navbar /> */}
      <Header />
      <Cards />
      <BottomBanner />
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
