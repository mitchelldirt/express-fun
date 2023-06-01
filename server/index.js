"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const messages_1 = __importDefault(require("./src/routes/messages"));
const user_1 = require("./src/routes/user");
const ws_1 = __importDefault(require("ws"));
dotenv_1.default.config();
const WS_PORT = process.env.WS_PORT;
if (WS_PORT) {
    const wss = new ws_1.default.Server({ port: Number(WS_PORT) });
    wss.on("connection", function connection(ws) {
        ws.on("error", console.error);
        // Broadcast to all clients
        ws.on("message", function message(data) {
            wss.clients.forEach(function each(client) {
                if (client.readyState === ws_1.default.OPEN) {
                    client.send(`Hello, broadcast message -> ${data}`);
                }
            });
        });
    });
}
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use(messages_1.default);
app.use(user_1.userRouter);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("welcome!");
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port} - THIS IS AWESOME`);
});
