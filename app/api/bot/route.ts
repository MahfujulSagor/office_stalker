import { NextResponse } from "next/server";
import { getDevices } from "@/app/lib/simulator";

export const dynamic = "force-dynamic";

export async function GET() {
  const devices = getDevices();
  
  // Calculate total power
  const totalPower = devices.reduce((sum, d) => sum + (d.status === "on" ? d.powerDraw : 0), 0);
  
  const roomsData = {
    drawing: {
      fansOn: devices.filter(d => d.room === "drawing" && d.type === "fan" && d.status === "on").length,
      lightsOn: devices.filter(d => d.room === "drawing" && d.type === "light" && d.status === "on").length,
      allOff: devices.filter(d => d.room === "drawing" && d.status === "on").length === 0
    },
    work1: {
      fansOn: devices.filter(d => d.room === "work1" && d.type === "fan" && d.status === "on").length,
      lightsOn: devices.filter(d => d.room === "work1" && d.type === "light" && d.status === "on").length,
      allOff: devices.filter(d => d.room === "work1" && d.status === "on").length === 0
    },
    work2: {
      fansOn: devices.filter(d => d.room === "work2" && d.type === "fan" && d.status === "on").length,
      lightsOn: devices.filter(d => d.room === "work2" && d.type === "light" && d.status === "on").length,
      allOff: devices.filter(d => d.room === "work2" && d.status === "on").length === 0
    }
  };

  return NextResponse.json({
    success: true,
    totalPower,
    rooms: roomsData
  });
}