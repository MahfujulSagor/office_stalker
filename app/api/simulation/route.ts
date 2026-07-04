import { NextResponse } from "next/server";
import { startSimulation, finishSimulation } from "@/app/lib/simulator";

export async function POST(request: Request) {
  const { action } = await request.json();

  if (action === "START") {
    startSimulation();
    return NextResponse.json({ success: true, message: "Simulation engine running." });
  }

  if (action === "FINISH") {
    finishSimulation();
    return NextResponse.json({ success: true, message: "Simulation finalized. Triggering after-hours checks." }); 
  }

  return NextResponse.json({ success: false, error: "Action mismatch" }, { status: 400 });
}