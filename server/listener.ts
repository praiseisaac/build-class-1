// NetSim Listener Server - Run with: npx tsx listener.ts
// This is the central Hub that receives messages from student Publisher clients.

import { createServer } from "http";
import { WebSocketServer } from "ws";

const PORT = 3001;

const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

const COLORS = [
  "\x1b[36m",
  "\x1b[35m",
  "\x1b[33m",
  "\x1b[34m",
  "\x1b[32m",
  "\x1b[91m",
  "\x1b[96m",
  "\x1b[95m",
  "\x1b[93m",
  "\x1b[94m",
  "\x1b[92m",
  "\x1b[97m",
];

const studentColors = new Map<string, string>();

function getColor(name: string): string {
  if (!studentColors.has(name)) {
    studentColors.set(name, COLORS[studentColors.size % COLORS.length]);
  }
  return studentColors.get(name)!;
}

console.log(`
${GREEN}=============================================
      NETSIM MASTER NODE - LISTENING
=============================================${RESET}
${DIM}Port: ${PORT}${RESET}
${DIM}Waiting for publishers to connect...${RESET}
`);

const server = createServer((_req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("NetSim Uplink Active");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws) => {
  const time = new Date().toLocaleTimeString();
  console.log(`${GREEN}[${time}] + New node connected${RESET}`);

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString());
      const time = new Date().toLocaleTimeString();

      const name = data.name || "UNKNOWN";
      const isNew = data.name && !studentColors.has(data.name);
      const color = getColor(name);

      if (isNew) {
        console.log(`${YELLOW}[${time}] NODE IDENTIFIED: ${color}${data.name}${RESET} (${data.device || "unknown"}) — ${studentColors.size} student(s) online${RESET}`);
      }


      console.log(`${DIM}[${time}]${RESET} ${color}${name}${RESET} ${DIM}(${data.device || "?"})${RESET}: ${data.text}`);
    } catch {
      const time = new Date().toLocaleTimeString();
      console.log(`${RED}[${time}] RAW DATA:${RESET} ${message}`);
    }
  });

  ws.on("close", () => {
    const time = new Date().toLocaleTimeString();
    console.log(`${RED}[${time}] - Node disconnected${RESET}`);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ws://localhost:${PORT}`);
});
