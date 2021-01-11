import { config } from "dotenv";
config();

import { definition } from "./rpcs";
import { Server } from "./server";

const server = new Server();

const host = process.env.IOTSCAPE_SERVER ?? "localhost";
const port = Number.parseInt(process.env.IOTSCAPE_PORT ?? "1975");

setInterval(() => {
    server.announce(host, port, JSON.stringify(definition));
}, 5000);