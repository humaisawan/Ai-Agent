import React from "react";

const PageTitle = () => {
  return (
    <div className="w-full flex-col">
      <div className="text-stone-900 font-urbanist font-semibold text-5xl flex justify-center mt-20">
        Inbox
      </div>
      <div className="text-zinc-500 font-urbanist font-normal text-2xl flex justify-center mt-10 mx-46 text-center">
        AI Agent is a powerful Q&A assistant powered by Gemini's gemini-2.0-flash.
        It processes user prompts, fetches relevant data, and delivers accurate
        responses in real time. Designed for efficiency and intelligence, it
        enhances interactions with seamless AI-driven answers.
      </div>
    </div>
  );
};

export default PageTitle;
