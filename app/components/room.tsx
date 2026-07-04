import Image from "next/image";
import Fan from "@/public/fan.svg";
import DrawingRoom from "@/public/drawingroomv2.svg";
import WorkRoom from "@/public/workroom.svg";

type RoomProps = {
  roomType: "drawing" | "work1" | "work2";
};

const Room = ({ roomType }: RoomProps) => {
  const room =
    roomType === "drawing"
      ? "Drawing Room"
      : roomType == "work1"
        ? "Work Room 1"
        : "Work Room 2"; // For now hardcoded, but can be dynamic based on props or state in the future.
  return (
    <div className="flex-1 flex flex-col rounded-md p-3 relative shadow-lg border border-gray-300">
      <h2 className="text-lg font-semibold mb-2 text-center">{room}</h2>

      {/* DEVICE AREA */}
      <div className="flex-1 relative h-full rounded-sm">
        {/* LIGHTS */}

        {/* 1 */}
        <div className="illuminate absolute top-20 left-20 w-6 h-6 rounded-full" />
        {/* 2 */}
        <div className="illuminate absolute top-20 right-20 w-6 h-6 rounded-full" />
        {/* 3 */}
        <div className="illuminate absolute bottom-12 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full" />

        {/* FANS */}

        {/* 1 */}
        <div className="absolute top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28">
          <Image src={Fan} alt="Fan1" className="w-full h-full animate-spin" />
        </div>
        {/* 2 */}
        <div className="absolute bottom-30 left-1/2 -translate-x-1/2 w-28 h-28">
          <Image src={Fan} alt="Fan2" className="w-full h-full animate-spin" />
        </div>

        {/* FURNITURE PLACEHOLDER */}
        {roomType === "drawing" ? (
          <div className="absolute -z-1 min-w-full h-full flex justify-center items-center">
            <Image
              src={DrawingRoom}
              alt="Drawing Room"
              className="w-full h-[60%] object-fit"
            />
          </div>
        ) : (
          <div className="absolute -z-1 min-w-full h-full flex justify-center items-center">
            <Image
              src={WorkRoom}
              alt="Work Room"
              className="w-full h-[50%] object-fit"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Room;
