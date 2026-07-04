import { addClient, removeClient, getDevices } from "@/app/lib/simulator";

export const dynamic = "force-dynamic";

export async function GET() {
  let changeListener: (data: string) => void;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial state immediately upon connection
      const initialPayload = JSON.stringify({ devices: getDevices() });
      controller.enqueue(`data: ${initialPayload}\n\n`);

      changeListener = (data: string) => {
        controller.enqueue(`data: ${data}\n\n`);
      };

      addClient(changeListener);
    },
    cancel() {
      if (changeListener) {
        removeClient(changeListener);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    },
  });
}