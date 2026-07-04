"use client";

import Image from "next/image";
import { useOffice } from "@/app/hooks/useOfficeData";
import Fan from "@/public/fan.svg";
import DrawingRoom from "@/public/drawingroomv2.svg";
import WorkRoom from "@/public/workroom.svg";

type RoomProps = {
  roomType: "drawing" | "work1" | "work2";
};

const Room = ({ roomType }: RoomProps) => {
  const { devices } = useOffice();

  // Filter devices belonging to this room context
  const roomDevices = devices.filter((d) => d.room === roomType);
  const lights = roomDevices.filter((d) => d.type === "light");
  const fans = roomDevices.filter((d) => d.type === "fan");

  const roomNames = {
    drawing: "Drawing Room",
    work1: "Work Room 1",
    work2: "Work Room 2",
  };

  return (
    <div className="flex-1 flex flex-col rounded-md p-3 relative shadow-lg border border-gray-300 bg-white">
      <h2 className="text-lg font-semibold mb-2 text-center">
        {roomNames[roomType]}
      </h2>

      <div className="flex-1 relative h-full rounded-sm overflow-hidden">
        {/* LIGHTS GLOW GRAPHICS  */}
        {lights.map((light, index) => {
          const positions = [
            "top-12 left-12", // Light 1
            "top-12 right-12", // Light 2
            "bottom-16 left-1/2 -translate-x-1/2", // Light 3
          ];
          const isOn = light.status === "on";
          return (
            <div
              key={light.id}
              className={`absolute ${positions[index]} w-8 h-8 rounded-full border-2 transition-all duration-300 flex items-center justify-center text-[10px] font-bold ${
                isOn
                  ? "bg-yellow-300 border-yellow-500 shadow-[0_0_15px_rgba(253,224,71,1)] text-yellow-900"
                  : "bg-gray-200 border-gray-400 text-gray-500"
              }`}
            >
              L{index + 1}
            </div>
          );
        })}

        {/* FANS ROTATION ANIMATION  */}
        {fans.map((fan, index) => {
          const positions = [
            "top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2", // Fan 1
            "bottom-24 left-1/2 -translate-x-1/2", // Fan 2
          ];
          const isRunning = fan.status === "on";
          return (
            <div
              key={fan.id}
              className={`absolute ${positions[index]} w-24 h-24 flex flex-col items-center`}
            >
              <Image
                src={Fan}
                alt={fan.name}
                className={`w-16 h-16 transition-transform ${isRunning ? "animate-spin" : ""}`}
              />
              <span className="text-xs font-semibold bg-white/80 px-1 rounded mt-1">
                F{index + 1}
              </span>
            </div>
          );
        })}

        {/* BACKGROUNDS */}
        <div className="absolute w-full h-full flex justify-center items-center">
          <Image
            src={roomType === "drawing" ? DrawingRoom : WorkRoom}
            alt={roomType}
            className="w-full h-[60%] object-fit"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
};

export default Room;
