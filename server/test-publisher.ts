// Test Publisher - validates the listener works before class
// Run with: npx tsx test-publisher.ts
// Make sure the listener is running first!

import { hostname } from "os";
import { createInterface } from "readline";

const LISTENER_IP = "localhost";
const LISTENER_PORT = "3001";
const MY_NAME = "Praise (Test)";

const url = `ws://${LISTENER_IP}:${LISTENER_PORT}`;

console.log(`Connecting to ${url}...`);

const socket = new WebSocket(url);

socket.addEventListener("open", () => {
  console.clear();
  console.log(`LINK ESTABLISHED: ${url}`);
  console.log("-----------------------------------");
  console.log("Type a message and hit ENTER to publish:");

  const rl = createInterface({ input: process.stdin });

  rl.on("line", (line) => {
    const text = line.trim();
    if (!text) return;

    if (socket.readyState === WebSocket.OPEN) {
      const payload = {
        name: MY_NAME,
        text: text,
        device: hostname(),
      };

      socket.send(JSON.stringify(payload));

      // Move cursor up and clear the raw input line, then print formatted
      process.stdout.write("\x1b[1A\x1b[2K");
      console.log(`You > ${text}`);
    } else {
      console.log("Connection lost.");
    }
  });
});

socket.addEventListener("error", () => {
  console.error("Connection Failed. Is the listener running?");
  process.exit(1);
});
