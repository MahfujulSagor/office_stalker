import { NextResponse } from "next/server";
import { getDevices, updateDeviceStatus } from "@/app/lib/simulator"; 

export async function GET() {
  const devices = getDevices();

  return NextResponse.json(
    {
      success: true,
      count: devices.length,
      data: devices,
    },
    { status: 200 }
  );
}

// Used by both Dashboard UI and Discord Command Actions
export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();
    
    if (!id || !["on", "off"].includes(status)) {
      return NextResponse.json({ success: false, error: "Invalid parameters" }, { status: 400 });
    }

    updateDeviceStatus(id, status);
    return NextResponse.json({ success: true, message: `Device ${id} turned ${status}` });
  } catch (error) {
    return NextResponse.json({ success: false, error: "Invalid Request Structure" }, { status: 500 });
  }
}