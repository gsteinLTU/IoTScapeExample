import { config } from "dotenv";
config();

import { add, hello, ping, timer, definition } from "./rpcs";
import { Server } from "./server";


const server = new Server();

server.announce("localhost", 1975, definition);