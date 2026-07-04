# 🏢 Office Stalker - IoT Smart Office Monitor & Control System

Office Stalker is a full-stack real-time monitoring and automation dashboard built for tracking and controlling office electricity consumption. The system bridges a simulated 15-device smart office matrix across a web dashboard interface and a Discord bot automation layer, allowing administrative overrides directly from chat channels.

---

## 🚀 Key Features

### 💻 Web Dashboard

- **Live Device Status Matrix**: Visually monitors 15 devices (2 Fans, 3 Lights per room) distributed across three sectors: _Drawing Room_, _Work Room 1_, and _Work Room 2_.
- **Real-Time Data Streams**: Utilizes Server-Sent Events (SSE) to stream instant state mutations back to the UI without requiring page refreshes.
- **Async Component Controls**: Toggles individual lights and fans directly from the UI with interactive, non-blocking spin-load feedback icons that block click-spamming during processing.
- **Live Power Telemetry**: Dynamically calculates aggregated wattage draw and projects the **Estimated Daily Consumption** (in kWh) based on active loads over a standard 8-hour shift.

### 🤖 Discord Bot Integration (`bot.js`)

- **`!status` Commands**: Pulls active infrastructure matrices directly from the Next.js API layer to update administrators in text channels.
- **Proactive Overtime Alerts**: Triggers automated, highly legible Markdown reports via a Discord Webhook when the office simulation stops, breaking down active infrastructure counts globally and by room.
- **`!stop` Remote Emergency Override**: Allows authorized channel members to send an instant shutdown instruction via chat, turning off all equipment across the office (dropping load to 0W) and triggering a public confirmation log identifying the controller's username.

---

## 🛠️ Tech Stack

- **Frontend / Backend API**: Next.js 14+ (App Router, React Hooks, Tailwind CSS)
- **Real-Time Layer**: Server-Sent Events (SSE) API Protocol
- **Bot Orchestration**: Discord.js v14 + Node.js
- **State Engine**: In-memory global state simulation loop

---

## 📂 System Architecture & Data Flow

1. **Dashboard Start** ➡️ Triggers the simulation engine ➡️ Forces all 15 office fixtures `ON` simultaneously to simulate the start of a business day.
2. **Simulation Loop** ➡️ A state clock fluctuates a random piece of equipment every 4 seconds to mimic employee movement.
3. **Dashboard Stop** ➡️ Stops the clock, evaluates lingering power loads, and broadcasts an ordered bulleted list of active devices directly to the Discord channel via incoming Webhooks.
4. **Discord `!stop` Override** ➡️ Bot intercepts command ➡️ Dispatches an authorized JSON `POST` request to `/api/simulation/stop-all` ➡️ State clears, dashboard components render turned off instantly, and a confirmation announcement prints to Discord.

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root of your Next.js project directory.

> 🚨 **CRITICAL SECURITY NOTE:** Ensure `.env.local` is added to your `.gitignore` rules before pushing changes to public GitHub repositories to protect your credentials.

```bash
# Discord Integration Keys
DISCORD_BOT_TOKEN="YOUR_DISCORD_BOT_TOKEN_HERE"
DISCORD_WEBHOOK_URL="[https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE](https://discord.com/api/webhooks/YOUR_WEBHOOK_URL_HERE)"
```

## 🏃 Setup & Installation

1. Clone & Install Dependencies

   ```bash
   git clone [https://github.com/YOUR_USERNAME/office_stalker.git](https://github.com/YOUR_USERNAME/office_stalker.git)
   cd office_stalker
   npm install
   ```

2. Run the Next.js Web Dashboard

    Launch the development server to activate the web UI and compile the local SSE and shutdown API routes:

    ```bash
    npm run dev
    ```

    The application will open locally at `http://localhost:3000.`
3. Initialize the Discord Bot
   In a separate terminal window, execute your dedicated bot script to listen for chat commands:

## 🎮 How to Test the Office Simulation Flow

- Open the dashboard at `http://localhost:3000` and locate the right sidebar interface.

- Click "Start": Watch all lights and fans on the matrix turn on simultaneously. The Total Power Usage container will reflect full active load telemetry.

- Observe Fluctuations: Every 4 seconds, specific devices will cycle between on/off states as the simulation mimics employees interacting with room features.

- Click "Stop": The simulation ends, locking the active device matrix. A notification list will instantly appear in your Discord channel detailing exactly which rooms left devices active.

- Issue Emergency Shutdown (!stop): Go to your Discord server and type !stop. Your bot will issue an emergency override response, the dashboard will turn off all equipment to show 0W instantly, and a confirmation log will appear in the channel confirming the shutdown:

    🛑 Emergency Remote Shutdown Activated!
An override command was issued via Discord by @username.

    Action: Every active appliance has been forced OFF.

    Current Power Load: 0W 📉
