export interface Device {
  id: string;
  name: string;
  type: "fan" | "light";
  room: "drawing" | "work1" | "work2";
  status: "on" | "off";
  powerDraw: number;
  lastChanged: string;
}

let devices: Device[] = [
  // Drawing Room
  {
    id: "dr-f1",
    name: "Fan 1",
    type: "fan",
    room: "drawing",
    status: "off",
    powerDraw: 60,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "dr-f2",
    name: "Fan 2",
    type: "fan",
    room: "drawing",
    status: "off",
    powerDraw: 60,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "dr-l1",
    name: "Light 1",
    type: "light",
    room: "drawing",
    status: "off",
    powerDraw: 15,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "dr-l2",
    name: "Light 2",
    type: "light",
    room: "drawing",
    status: "off",
    powerDraw: 15,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "dr-l3",
    name: "Light 3",
    type: "light",
    room: "drawing",
    status: "off",
    powerDraw: 15,
    lastChanged: new Date().toISOString(),
  },
  // Work Room 1
  {
    id: "wr1-f1",
    name: "Fan 1",
    type: "fan",
    room: "work1",
    status: "off",
    powerDraw: 60,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "wr1-f2",
    name: "Fan 2",
    type: "fan",
    room: "work1",
    status: "off",
    powerDraw: 60,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "wr1-l1",
    name: "Light 1",
    type: "light",
    room: "work1",
    status: "off",
    powerDraw: 15,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "wr1-l2",
    name: "Light 2",
    type: "light",
    room: "work1",
    status: "off",
    powerDraw: 15,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "wr1-l3",
    name: "Light 3",
    type: "light",
    room: "work1",
    status: "off",
    powerDraw: 15,
    lastChanged: new Date().toISOString(),
  },
  // Work Room 2
  {
    id: "wr2-f1",
    name: "Fan 1",
    type: "fan",
    room: "work2",
    status: "off",
    powerDraw: 60,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "wr2-f2",
    name: "Fan 2",
    type: "fan",
    room: "work2",
    status: "off",
    powerDraw: 60,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "wr2-l1",
    name: "Light 1",
    type: "light",
    room: "work2",
    status: "off",
    powerDraw: 15,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "wr2-l2",
    name: "Light 2",
    type: "light",
    room: "work2",
    status: "off",
    powerDraw: 15,
    lastChanged: new Date().toISOString(),
  },
  {
    id: "wr2-l3",
    name: "Light 3",
    type: "light",
    room: "work2",
    status: "off",
    powerDraw: 15,
    lastChanged: new Date().toISOString(),
  },
];

let simInterval: NodeJS.Timeout | null = null;
let activeClients: ((data: string) => void)[] = [];

export function getDevices() {
  return devices;
}

export function updateDeviceStatus(id: string, status: "on" | "off") {
  devices = devices.map((d) =>
    d.id === id ? { ...d, status, lastChanged: new Date().toISOString() } : d,
  );
  broadcastToSSE();
}

export function addClient(clientFn: (data: string) => void) {
  activeClients.push(clientFn);
}

export function removeClient(clientFn: (data: string) => void) {
  activeClients = activeClients.filter((c) => c !== clientFn);
}

export function broadcastToSSE() {
  const payload = JSON.stringify({
    devices,
    totalPower: calculateTotalPower(),
  });
  activeClients.forEach((client) => client(payload));
}

function calculateTotalPower() {
  return devices.reduce(
    (sum, d) => sum + (d.status === "on" ? d.powerDraw : 0),
    0,
  );
}

export function startSimulation() {
  if (simInterval) return;

  // Turn EVERYTHING on instantly to simulate the office rush starting up
  devices = devices.map((d) => ({
    ...d,
    status: "on",
    lastChanged: new Date().toISOString(),
  }));
  
  // Send the initial all-on payload to dashboard UI right away
  broadcastToSSE();

  // Periodically fluctuate device states over time as employees leave rooms
  simInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * devices.length);
    devices[randomIndex].status =
      devices[randomIndex].status === "on" ? "off" : "on";
    devices[randomIndex].lastChanged = new Date().toISOString();

    broadcastToSSE();
  }, 4000);
}

export function finishSimulation() {
  if (simInterval) {
    clearInterval(simInterval);
    simInterval = null;
  }

  // Check what stayed active when you hit stop because nobody cared to turn it off
  const activeDevices = devices.filter((d) => d.status === "on");
  if (activeDevices.length > 0) {
    triggerDiscordAlert(activeDevices);
  }
}

async function triggerDiscordAlert(leftOnDevices: Device[]) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  // 1. Calculate overall counts across the entire office
  const totalFansOn = leftOnDevices.filter((d) => d.type === "fan").length;
  const totalLightsOn = leftOnDevices.filter((d) => d.type === "light").length;

  // 2. Build a structured list broken down per room
  const roomNamesMap: Record<string, string> = {
    drawing: "🛋️ Drawing Room",
    work1: "🖥️ Work Room 1",
    work2: "💻 Work Room 2",
  };

  const roomBreakdownList = ["drawing", "work1", "work2"]
    .map((roomKey) => {
      const roomDevices = leftOnDevices.filter((d) => d.room === roomKey);
      if (roomDevices.length === 0) return null;

      const fansCount = roomDevices.filter((d) => d.type === "fan").length;
      const lightsCount = roomDevices.filter((d) => d.type === "light").length;

      const details: string[] = [];
      if (fansCount > 0) details.push(`${fansCount} fan${fansCount > 1 ? "s" : ""}`);
      if (lightsCount > 0) details.push(`${lightsCount} light${lightsCount > 1 ? "s" : ""}`);

      return `• **${roomNamesMap[roomKey]}**: ${details.join(" and ")} still ON`;
    })
    .filter(Boolean)
    .join("\n");

  // 3. Assemble the humanized Slack-style Discord Markdown message
  const message = {
    content: `🚨 **Office Overtime Alert!**\nThe work shift has officially ended, but devices are still running!\n\n**Total active appliances drawing load:**\n• Total Fans Left Running: **${totalFansOn}**\n• Total Lights Left Running: **${totalLightsOn}**\n\n**Detailed Room Breakdowns:**\n${roomBreakdownList}\n\n*Did someone forget to switch things off before locking up?*`,
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.error("Failed to route alert payload to Discord:", err);
  }
}