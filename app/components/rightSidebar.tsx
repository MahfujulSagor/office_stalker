"use client";

import { useState } from "react";
import { useOffice } from "@/app/hooks/useOfficeData";

const RightSidebar = () => {
  // Pull live simulation parameters and core handlers from SSE Context layer
  const { devices, totalPower, startSimulation, stopSimulation } = useOffice();
  
  // Track button status parameters to block spam-clicks
  const [isStarting, setIsStarting] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  // Dynamic Device Counter Metrics (Calculated live based on the backend array matrices)
  const totalCount = devices.length;
  const activeFans = devices.filter((d) => d.type === "fan" && d.status === "on").length;
  const activeLights = devices.filter((d) => d.type === "light" && d.status === "on").length;

  // Calculate estimated daily consumption based on a standard 8-hour workday
  // Formula: (Current Watts * 8 Hours) / 1000 = Daily kWh
  const estimatedDailyConsumption = ((totalPower * 8) / 1000).toFixed(2); 

  // Wrapper operation tracking for simulation start execution
  const handleStart = async () => {
    if (isStarting || isStopping) return;
    setIsStarting(true);
    try {
      await startSimulation();
    } catch (error) {
      console.error("Simulation initialization failed:", error);
    } finally {
      setIsStarting(false);
    }
  };

  // Wrapper operation tracking for simulation teardown and webhook alert trigger
  const handleStop = async () => {
    if (isStarting || isStopping) return;
    setIsStopping(true);
    try {
      await stopSimulation();
    } catch (error) {
      console.error("Simulation teardown routing failed:", error);
    } finally {
      setIsStopping(false);
    }
  };

  return (
    <div className="w-[320px] border-l p-3 flex flex-col gap-3">
      
      {/* DEVICE STATUS BLOCK */}
      <div className="flex-1 border border-gray-300 bg-[#EEEBE3] rounded p-2 shadow-lg">
        <h2 className="text-xl mt-8 font-semibold text-center">
          Device Status
        </h2>
        <div className="flex flex-col gap-2 justify-center items-center w-full h-[calc(100%-100px)] text-center">
          <div className="w-full h-20 bg-slate-400/30 flex flex-col gap-2 rounded-lg justify-center">
            <p className="text-lg">Total Devices</p>
            <p className="text-2xl font-bold">{totalCount || 15}</p>
          </div>
          <div className="w-full bg-teal-400/30 flex flex-col gap-2 rounded-lg py-3">
            <p className="text-lg">Active Devices</p>
            <div className="flex justify-center items-center">
              <div className="flex-1 ">
                <p className="text-2xl font-bold">Fan</p>
                <p className="text-2xl font-bold">{activeFans}</p>
              </div>

              <div className="flex-1 ">
                <p className="text-2xl font-bold">Light</p>
                <p className="text-2xl font-bold">{activeLights}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* POWER USAGE BLOCK */}
      <div className="flex-1 border border-gray-300 bg-[#EEEBE3] rounded p-2 shadow-lg">
        <h2 className="text-xl mt-8 font-semibold text-center">Power Usage</h2>
        <div className="flex flex-col justify-center items-center w-full h-[calc(100%-100px)] gap-2 text-center">
          <div className="w-full h-20 bg-rose-400/30 flex flex-col gap-2 rounded-lg justify-center">
            <p className="text-lg ">Total Power Usage</p>
            <p className="text-2xl font-bold">{totalPower}W</p>
          </div>
          <div className="w-full h-20 bg-amber-400/30 flex flex-col gap-2 rounded-lg justify-center">
            <p className="text-lg">Est. Daily Consumption</p>
            <p className="text-2xl font-bold">{estimatedDailyConsumption} kWh</p>
          </div>
        </div>
      </div>

      {/* SIMULATION OPERATIONAL MANIPULATORS */}
      <div className="flex-1 flex flex-col justify-around border border-gray-300 bg-[#EEEBE3] rounded p-2 shadow-lg">
        <div>
          <p className="text-lg text-center font-semibold mb-1">
            Start Office Simulation
          </p>
          <button 
            onClick={handleStart}
            disabled={isStarting || isStopping}
            className={`bg-green-300 w-full h-20 text-2xl font-bold rounded transition-all active:scale-95 ${
              isStarting 
                ? "opacity-60 cursor-not-allowed" 
                : "hover:bg-green-500 cursor-pointer"
            }`}
          >
            {isStarting ? "Starting..." : "Start"}
          </button>
        </div>
        <div>
          <p className="text-lg text-center font-semibold mb-1">
            Stop Office Simulation
          </p>
          <button 
            onClick={handleStop}
            disabled={isStarting || isStopping}
            className={`bg-red-400 w-full h-20 text-2xl font-bold rounded transition-all active:scale-95 ${
              isStopping 
                ? "opacity-60 cursor-not-allowed" 
                : "hover:bg-rose-500 cursor-pointer"
            }`}
          >
            {isStopping ? "Stopping..." : "Stop"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;