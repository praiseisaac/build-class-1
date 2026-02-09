# NetSim - WebSocket Publisher/Listener Demo

A real-time messaging demo using WebSockets. You will build a **Publisher** client that connects to a central **Listener** server and sends messages over a WebSocket connection.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later. Try to be on the lastest if you can)

## Project Structure

```
in-class-demo/
├── server/
│   ├── listener.ts          # WebSocket server (instructor runs this)
│   └── test-publisher.ts    # Test client to verify the server works
├── client/
│   ├── publisher.comments.ts  # YOUR EXERCISE — fill in the code
│   └── publisher.ts           # Reference solution (no peeking!)
```

## Setup

### 1. Install dependencies

Open two terminal windows. In each one, install dependencies:

**Terminal 1 — Server:**
```bash
cd server
npm install
```

**Terminal 2 — Client:**
```bash
cd client
npm install
```

### 2. Start the server

In Terminal 1 (inside `server/`):

```bash
npx tsx listener.ts
```

You should see:

```
=============================================
      NETSIM MASTER NODE - LISTENING
=============================================
Port: 3001
Waiting for publishers to connect...
```

### 3. Run the client

In Terminal 2 (inside `client/`), run the publisher with a WebSocket URL and your name:

```bash
npx tsx publisher.ts ws://localhost:3001 "Your Name"
```

Type a message and press **Enter** — it will appear on the server.

## Your Exercise

Open `client/publisher.comments.ts`. This file contains step-by-step comments describing what the code should do, but **no actual code**. Your job is to implement each step:

1. **Imports** — Import `hostname` from `os` and `argv` from `node:process`, and `readline` from `node:readline`
2. **Parse arguments** — Extract the WebSocket URL and your name from `process.argv`
3. **URL setup** — If the URL uses `https://`, replace it with `ws://` for the WebSocket connection
4. **Initialize socket** — Create a new `WebSocket` instance with the URL
5. **Open handler** — Use `addEventListener` to listen for the `"open"` event and send an initial message
6. **Input loop** — Loop over stdin lines using `readline.createInterface` and send each line through the socket
7. **Error handling** — Add an `"error"` event listener to log any connection errors

### Useful links

- [process.argv (Node.js)](https://nodejs.org/docs/latest/api/process.html#processargv)
- [WebSocket API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [readline (Node.js)](https://nodejs.org/api/readline.html)

### Testing your solution

Once you've written your code, run it the same way:

```bash
npx tsx publisher.comments.ts ws://localhost:3001 "Your Name"
```

If everything works, your messages will show up in the server terminal.
