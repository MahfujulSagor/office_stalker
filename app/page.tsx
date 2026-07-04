import Room from "./components/room";

export default function Page() {
  return (
    <div className="h-screen w-full  flex flex-col">
      {/* HEADER */}
      <header className="h-14 flex items-center justify-center px-6">
        <h1 className="text-4xl text-center font-bold">
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
        </div>

        {/* RIGHT SIDEBAR */}
        {/* <div className="w-[320px] border-l  p-3 flex flex-col gap-3">
          <div className="h-24 border  rounded p-2">Device Status</div>

          <div className="h-24 border  rounded p-2">Power Usage</div>

          <div className="h-24 border rounded p-2">Alerts</div>

          <div className="flex-1 border  rounded p-2">Room Summary</div>
        </div> */}
      </div>

      {/* BOTTOM PANEL */}
      <div className="h-40 flex gap-3 p-3">
        <div className="flex-1 border border-gray-300 rounded p-2 shadow-lg">Graph Placeholder</div>

        <div className="flex-1 border border-gray-300 rounded p-2 shadow-lg">Timeline Placeholder</div>

        <div className="flex-1 border border-gray-300 rounded p-2 shadow-lg">Logs Placeholder</div>
      </div>
    </div>
  );
}
