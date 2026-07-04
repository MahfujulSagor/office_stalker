import RightSidebar from "./components/rightSidebar";
import Room from "./components/room";
import RoomControl from "./components/roomControl";
// import { startSimulator } from "./lib/sumilator";

export default function Page() {
  return (
    <div className="h-screen w-full  flex flex-col">
      {/* HEADER */}
      <header className="h-14 flex items-center justify-center px-6">
        <h1 className="text-5xl text-center font-bold">
          Office Stalker Dashboard
        </h1>
      </header>

      {/* MAIN AREA */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT - OFFICE VIEW */}
        <div className="flex-1 p-4 flex flex-col gap-4">
          {/* ROOMS ROW */}
          <div className="flex gap-4 flex-1">
            {/* ROOM 1 */}
            <Room roomType="drawing" />
            {/* ROOM 2 */}
            <Room roomType="work1" />
            {/* ROOM 3 */}
            <Room roomType="work2" />
          </div>

          {/* BOTTOM PANEL */}
          <div className="h-50 flex gap-4 ">
            <RoomControl />
            <RoomControl />
            <RoomControl />
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <RightSidebar />
      </div>
    </div>
  );
}
