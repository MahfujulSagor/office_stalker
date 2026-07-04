import React from "react";
import Image from "next/image";
import powerIcon from "@/public/power-red.svg";

const RoomControl = () => {
  return (
    <div className="flex-1 flex border border-gray-300 rounded p-2 shadow-xl">
      <div className="flex-1 flex flex-col justify-center items-center border-r w-full h-full">
        <p className="">Room Power Consumption</p>
        <p className="text-2xl font-bold">~40W</p>
      </div>
      <div className="flex-1 flex items-center border-l w-full h-full">
        <div className="flex-1 p-2">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <span>Fan 1</span>{" "}
              <Image
                src={powerIcon}
                alt="Power Icon"
                className="w-8 h-8 cursor-pointer"
              />
            </li>
            <li className="flex items-center gap-2">
              <span>Fan 2</span>{" "}
              <Image
                src={powerIcon}
                alt="Power Icon"
                className="w-8 h-8 cursor-pointer"
              />
            </li>
          </ul>
        </div>
        <div className="flex-1">
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <span>Light 1</span>{" "}
              <Image
                src={powerIcon}
                alt="Power Icon"
                className="w-8 h-8 cursor-pointer"
              />
            </li>
            <li className="flex items-center gap-2">
              <span>Light 2</span>{" "}
              <Image
                src={powerIcon}
                alt="Power Icon"
                className="w-8 h-8 cursor-pointer"
              />
            </li>
            <li className="flex items-center gap-2">
              <span>Light 3</span>{" "}
              <Image
                src={powerIcon}
                alt="Power Icon"
                className="w-8 h-8 cursor-pointer"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RoomControl;
