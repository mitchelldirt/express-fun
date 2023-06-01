import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import router from "./src/routes/messages";
import { userRouter } from "./src/routes/user";
import WebSocket from "ws";
import type { User } from "./src/services/db";

dotenv.config();
const WS_PORT = process.env.WS_PORT;

if (WS_PORT) {
  const wss = new WebSocket.Server({ port: Number(WS_PORT) });

  wss.on("connection", function connection(ws) {
    ws.on("error", console.error);

    // Broadcast to all clients
    ws.on("message", function message(data) {
      wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(`Hello, broadcast message -> ${data}`);
        }
      });
    });
  });
}

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(router);
app.use(userRouter);

app.get("/", async (req: Request, res: Response) => {
  res.send("welcome!");
});

app.listen(port, () => {
  console.log(
    `⚡️[server]: Server is running at http://localhost:${port} - THIS IS AWESOME`
  );
});
