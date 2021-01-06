import { config } from "dotenv";
config();

import { add, hello, ping, timer, definition } from "./rpcs";
import { Server } from "./server";

const server = new Server();

const host = process.env.METASCAPE_SERVER ?? "localhost";
const port = Number.parseInt(process.env.METASCAPE_PORT ?? "1975");

server.announce(host, port, JSON.stringify(definition));