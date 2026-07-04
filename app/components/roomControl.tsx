"use client";

import { useState } from "react";
import Image from "next/image";
import { useOffice } from "@/app/hooks/useOfficeData";
import powerRed from "@/public/power-red.svg"; 
import powerGreen from "@/public/power-green.svg"; 

type ControlProps = {
  roomType: "drawing" | "work1" | "work2";
};

const RoomControl = ({ roomType }: ControlProps) => {
  const { devices, toggleDevice } = useOffice();
  // Track which specific devices are currently processing an update
  const [loadingIds, setLoadingIds] = useState<string[]>([]);

  const roomDevices = devices.filter((d) => d.room === roomType);
  const roomPower = roomDevices.reduce((sum, d) => sum + (d.status === "on" ? d.powerDraw : 0), 0);

  const roomNames = { drawing: "Drawing Room", work1: "Work 1", work2: "Work 2" };

  // Handle click with async loading state tracking
  const handleToggle = async (id: string, currentStatus: "on" | "off") => {
    // Prevent double execution if already loading
    if (loadingIds.includes(id)) return;

    setLoadingIds((prev) => [...prev, id]);
    try {
      // Execute the device status toggle operation
      await toggleDevice(id, currentStatus);
    } catch (error) {
      console.error(`Failed to toggle device ${id}:`, error);
    } finally {
      // Remove from loading array once finished
      setLoadingIds((prev) => prev.filter((loadingId) => loadingId !== id));
    }
  };

  return (
    <div className="flex-1 flex border border-gray-300 rounded p-3 shadow-md bg-white">
      {/* POWER DRAW */}
      <div className="flex-1 flex flex-col justify-center items-center border-r p-2">
        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider text-center">
          {roomNames[roomType]} Power
        </p>
        <p className="text-3xl font-black text-slate-700 mt-1">{roomPower}W</p>
      </div>

      {/* DEVICE MANIPULATION PANEL */}
      <div className="flex-2 grid grid-cols-2 gap-2 pl-3 items-center">
        {/* Fans Grid Column */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-400 border-b pb-0.5">Fans</p>
          <ul className="space-y-2">
            {roomDevices.filter(d => d.type === "fan").map((fan) => {
              const isLoading = loadingIds.includes(fan.id);
              return (
                <li key={fan.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-600">{fan.name}</span>
                  <Image
                    src={fan.status === "on" ? powerRed : powerGreen}
                    alt="Toggle Power"
                    className={`w-7 h-7 transition-all ${
                      isLoading 
                        ? "animate-spin opacity-50 pointer-events-none" 
                        : "cursor-pointer active:scale-95"
                    } ${fan.status === 'off' && !isLoading ? 'opacity-40' : ''}`}
                    onClick={() => handleToggle(fan.id, fan.status)}
                  />
                </li>
              );
            })}
          </ul>
        </div>

        {/* Lights Grid Column */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-400 border-b pb-0.5">Lights</p>
          <ul className="space-y-2">
            {roomDevices.filter(d => d.type === "light").map((light) => {
              const isLoading = loadingIds.includes(light.id);
              return (
                <li key={light.id} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-600">{light.name}</span>
                  <Image
                    src={light.status === "on" ? powerRed : powerGreen}
                    alt="Toggle Power"
                    className={`w-7 h-7 transition-all ${
                      isLoading 
                        ? "animate-spin opacity-50 pointer-events-none" 
                        : "cursor-pointer active:scale-95"
                    } ${light.status === 'off' && !isLoading ? 'opacity-40' : ''}`}
                    onClick={() => handleToggle(light.id, light.status)}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomControl;