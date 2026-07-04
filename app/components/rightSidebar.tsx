import React from "react";

const RightSidebar = () => {
  return (
    <div className="w-[320px] border-l p-3 flex flex-col gap-3">
      <div className="flex-1 border border-gray-300 bg-[#EEEBE3] rounded p-2 shadow-lg">
        <h2 className="text-xl mt-8 font-semibold text-center">Device Status</h2>
        <div className="flex flex-col gap-2 justify-center items-center w-full h-[calc(100%-100px)] text-center">
          <div className="w-full h-20 bg-slate-400/30 flex flex-col gap-2 rounded-lg">
            <p className="text-lg">Total Devices</p>
            <p className="text-2xl font-bold">5</p>
          </div>
          <div className="w-full  bg-teal-400/30 flex flex-col gap-2 rounded-lg">
            <p className="text-lg">Active Devices</p>
            <div className="flex justify-center items-center">
              <div className="flex-1 ">
                <p className="text-2xl font-bold">Fan</p>
                <p className="text-2xl font-bold">2</p>
              </div>

              <div className="flex-1 ">
                <p className="text-2xl font-bold">Light</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 border border-gray-300 bg-[#EEEBE3] rounded p-2 shadow-lg">
        <h2 className="text-xl mt-8 font-semibold text-center">Power Usage</h2>
        <div className="flex flex-col justify-center items-center w-full h-[calc(100%-100px)] gap-2 text-center">
          {/* I want to display power usage information for total and for like how much power will be used untile office time ends */}
          <div className="w-full h-20 bg-rose-400/30 flex flex-col gap-2 rounded-lg">
            <p className="text-lg ">Total Power Usage</p>
            <p className="text-2xl font-bold">~120W</p>
          </div>
          <div className="w-full h-20 bg-amber-400/30 flex flex-col gap-2 rounded-lg">
            <p className="text-lg">Estimated Power Usage</p>
            <p className="text-2xl font-bold">~80W</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
