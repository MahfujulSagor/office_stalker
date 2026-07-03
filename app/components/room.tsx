
type RoomProps = {
    roomType: "drawing" | "work1" | "work2"; 
}

const Room = ({roomType} : RoomProps) => {
  const room = roomType === "drawing" ? "Drawing Room" : roomType == "work1" ? "Work Room 1" : "Work Room 2"; // For now hardcoded, but can be dynamic based on props or state in the future.
  return (
    <div className="flex-1 flex flex-col border border-slate-800 rounded-md p-3 relative">
      <h2 className="text-sm font-semibold mb-2">{room}</h2>

      {/* DEVICE AREA */}
      <div className="flex-1 relative h-full border border-slate-800 rounded-sm">
        {/* LIGHTS */}
        <div className="absolute top-8 left-8 w-6 h-6 bg-slate-600 rounded-full" />
        <div className="absolute top-8 right-8 w-6 h-6 bg-slate-600 rounded-full" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-600 rounded-full" />

        {/* FANS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-slate-600 rounded-sm" />
        <div className="absolute bottom-30 left-1/2 -translate-x-1/2 w-8 h-8 border border-slate-600 rounded-sm" />
      </div>
    </div>
  );
};

export default Room;
