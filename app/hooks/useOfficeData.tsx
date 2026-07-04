"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Device {
  id: string;
  name: string;
  type: "fan" | "light";
  room: "drawing" | "work1" | "work2";
  status: "on" | "off";
  powerDraw: number;
  lastChanged: string;
}

interface OfficeContextProps {
  devices: Device[];
  totalPower: number;
  startSimulation: () => Promise<void>;
  stopSimulation: () => Promise<void>;
  toggleDevice: (id: string, currentStatus: "on" | "off") => Promise<void>;
}

const OfficeContext = createContext<OfficeContextProps | undefined>(undefined);

export function OfficeProvider({ children }: { children: ReactNode }) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [totalPower, setTotalPower] = useState(0);

  useEffect(() => {
    // 1. Establish real-time SSE listener stream
    const eventSource = new EventSource("/api/events");

    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        if (parsed.devices) setDevices(parsed.devices);
        if (parsed.totalPower !== undefined) setTotalPower(parsed.totalPower);
      } catch (err) {
        console.error("Error parsing SSE update stream:", err);
      }
    };

    return () => eventSource.close();
  }, []);

  const startSimulation = async () => {
    await fetch("/api/simulation", { method: "POST", body: JSON.stringify({ action: "START" }) });
  };

  const stopSimulation = async () => {
    await fetch("/api/simulation", { method: "POST", body: JSON.stringify({ action: "FINISH" }) });
  };

  const toggleDevice = async (id: string, currentStatus: "on" | "off") => {
    const nextStatus = currentStatus === "on" ? "off" : "on";
    await fetch("/api/devices", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: nextStatus }),
    });
  };

  return (
    <OfficeContext.Provider value={{ devices, totalPower, startSimulation, stopSimulation, toggleDevice }}>
      {children}
    </OfficeContext.Provider>
  );
}

export function useOffice() {
  const context = useContext(OfficeContext);
  if (!context) throw new Error("useOffice must be explicitly wrapped under an <OfficeProvider />");
  return context;
}