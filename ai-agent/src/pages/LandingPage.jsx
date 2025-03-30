import React from "react";

import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import Chat from "../components/Chat";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <PageTitle />

      <Chat />
      <Header />
    </div>
  );
};

export default LandingPage;
