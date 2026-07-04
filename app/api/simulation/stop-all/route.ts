import { NextResponse } from "next/server";
import { getDevices, broadcastToSSE } from "@/app/lib/simulator";

async function triggerDiscordShutdownAlert(byUser: string) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return;

  const message = {
    content: `🛑 **Emergency Remote Shutdown Activated!**\nAn override command was issued via Discord by **@${byUser}**.\n\n• **Action:** Every active appliance has been forced **OFF**.\n• **Current Power Load:** **0W** 📉\n\n*The office matrix is now completely powered down and safe.*`
  };

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  } catch (err) {
    console.error("Failed to route shutdown alert payload to Discord:", err);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const username = body.username || "Authorized User";

    const devices = getDevices();
    
    // Explicitly shut everything down
    devices.forEach((d) => {
      d.status = "off";
      d.lastChanged = new Date().toISOString();
    });

    // Broadcast the updated state live to the dashboard grid layout via SSE
    broadcastToSSE();

    // Fire the webhook alert layout to notify the channel channel
    await triggerDiscordShutdownAlert(username);

    return NextResponse.json({ 
      success: true, 
      message: "All office devices have been successfully powered down." 
    });
  } catch (error) {
    console.error("Error powering down devices:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" }, 
      { status: 500 }
    );
  }
}