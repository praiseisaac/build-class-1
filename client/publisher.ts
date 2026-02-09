import { hostname } from "os"
import { argv } from 'node:process'
import readline from "node:readline"

// parse arguments (https://nodejs.org/docs/latest/api/process.html#processargv)
// print process.argv
// host setup (extract the host information from the arguments)
const [_, __, sourceUrl, name] = argv

console.log(sourceUrl, name)

if (!sourceUrl) {
  throw new Error("No source url")
}

// url setup (replace host name with ws:// to validate websocket url)
const webSocketUrl = sourceUrl.replace('https://', 'ws://')

console.log(webSocketUrl)

// initialize socket class (WebSocket) (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
// Create WebSocket connection.
const socket = new WebSocket(webSocketUrl);

const sendMessage = (message: string) => {
  socket.send(JSON.stringify({
    name: name,
    text: message,
    device: hostname()
  }))
}

// start socket (initialize the socket with the 'addEvenetListener' method. Let's listen for 'open' events)
socket.addEventListener("open", (event) => {
  socket.send("Hello Server!");
});

// input listener loop (loop through the console lines "for await (const line of readline.createInterface({ input: process.stdin }))". When typing, sends the message after a new line)
for await (const line of readline.createInterface({ input: process.stdin })) {
  if (!line) continue

  sendMessage(line)
}

// error handling (add error listener to socket) (https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
socket.addEventListener("error", (error) => {
  console.log(error)
});
