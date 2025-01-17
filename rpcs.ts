import { Request } from "./request";

/**
 * Name of this service
 */
export const ServiceName = "IoTScapeTest";

/**
 * Service definition for example service
 */
export const definition = {
    "IoTScapeTest": {
        "id": 1,
        "service": {
            "description": "Example service for IoTScape development.\nIncludes ping, hello, add, and timer functions", 
            "externalDocumentation": "n/a",
            "termsOfService": "n/a",
            "contact": "gstein@ltu.edu",
            "license": "MIT",
            "version": "1",
        },
        "methods": {
            "nop": {
                "documentation": "Does nothing",
                "params": [],
                "returns": {
                    "documentation": "",
                    "type": ["void"]
                }
            },
            "ping": {
                "documentation": "Returns the string \"pong\".",
                "params": [],
                "returns": {
                    "documentation": "Pong",
                    "type": ["string"]
                }
            },
            "hello": {
                "documentation": "Greets a user, possibly by name",
                "params": [
                    {
                        "name": "name",
                        "documentation": "Name to greet",
                        "type": "string",
                        "optional": true
                    }
                ],
                "returns": {
                    "documentation": "Greeting",
                    "type": ["string"]
                }
            },
            "add": {
                "documentation": "Add two numbers",
                "params": [
                    {
                        "name": "a",
                        "documentation": "First number",
                        "type": "number",
                        "optional": false
                    },
                    {
                        "name": "b",
                        "documentation": "Second number",
                        "type": "number",
                        "optional": false
                    },
                ],
                "returns": {
                    "documentation": "Sum of a and b",
                    "type": ["number"]
                }
            },
            "timer": {
                "documentation": "Send a response after a delay",
                "params": [
                    {
                        "name": "msec",
                        "documentation": "Amount of time to wait, in ms",
                        "type": "number",
                        "optional": false
                    },
                ],
                "returns": {
                    "documentation": "Response after delay",
                    "type": ["event timer"],
                }

            },
            "countdown": {
                "documentation": "Send a series of event messages",
                "params": [
                    {
                        "name": "start",
                        "documentation": "Number to start counting down from",
                        "type": "number",
                        "optional": false
                    },
                ],
                "returns": {
                    "documentation": "Response after delay",
                    "type": ["event timer"],
                }

            },
        },
        "events": {
            "timer": {
                "params": [],
            },
            "countdown": {
                "params": ["value"],
            }
        }
    }
} as Record<string, any>;

// Set ID
definition[ServiceName].id = Math.floor(Math.random() * 100000);

/**
 * Does absolutely nothing
 * @param {Request} req
 */
export function nop(req: Request) {
    
}

/**
 * IoTScape required function
 */
export function heartbeat(req: Request) {
    req.respond(true);
}

/**
 * Returns the string \"pong\"
 * @param {Request} req  
 */
export function ping(req: Request) {
    req.respond("pong");
}

/**
 * Greets a user, possibly by name
 * @param {Request} req 
 * @param {string=} name Name to greet
 */
export function hello(req: Request, name?: string) {
    if(typeof name === "string" && name !== ""){
        req.respond(`Hello, ${name}!`);
    } else {
        req.respond("Hello!");
    }
}

/**
 * Add two numbers
 * @param {Request} req 
 * @param {Number} a First number 
 * @param {Number} b Second number 
 */
export function add(req: Request, a: number, b: number) {
    req.respond(a + b);
}

/**
 * Send a response after a delay
 * @param {Request} req 
 * @param {Number} msec Amount of time to wait, in ms
 */
export function timer(req: Request, msec: number) {
    setTimeout(() => {
        req.respondEvent("timer");
    }, msec);
}

/**
 * Send a series of event messages counting from a number to zero
 * @param {Request} req 
 * @param {Number} start Number to count down from, max 10
 */
export function countdown(req: Request, start: number) {

    if(start <= 0){
        return;
    }

    if(start >= 10){
        start = 10;
    }
    
    setTimeout(() => {
        req.respondEvent("countdown", {value: start.toString()});
        countdown(req, start - 1);
    }, 1000);
}

/**
 * List of RPCs
 */
export var RPCs : {[key: string]: Function} = {
    nop,
    ping,
    hello,
    add,
    timer,
    countdown,
    heartbeat
};