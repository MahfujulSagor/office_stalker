import { devices as initialDevices } from "./devices";
import type { Device } from "./devices";

const devices: Device[] = [...initialDevices];
let running = false;
let timeout: NodeJS.Timeout | null = null;

type UpdateCallback = (devices: Device[]) => void;

export function startSimulator(onUpdate?: UpdateCallback) {
  if (running) return;

  running = true;

  const simulate = () => {
    if (!running) return;

    // Pick a random device
    const randomIndex = Math.floor(Math.random() * devices.length);
    const device = devices[randomIndex];

    // Toggle state
    device.isOn = !device.isOn;

    // Update wattage
    device.wattage = device.isOn ? device.powerRating : 0;

    // Update timestamp
    device.lastChanged = Date.now();

    // Notify listeners
    onUpdate?.([...devices]);

    // Schedule next update (3–8 seconds)
    const delay = random(3000, 8000);
    timeout = setTimeout(simulate, delay);
  };

  simulate();
}

export function stopSimulator() {
  running = false;

  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
}

export function getDevices() {
  return devices;
}

function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}