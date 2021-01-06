import { Request } from "./request";

/**
 * Service definition for example service
 */
export const definition = {
    "MetaScapeTest": {
        "service": {
            "description": ["Example service for MetaScape development",
                            "Includes ping, hello, add, and timer functions"], 
            "externalDocumentation": "n/a",
            "termsOfService": "n/a",
            "contact": "gstein@ltu.edu",
            "license": "MIT",
            "version": "1",
        },
        "methods": {
            "ping": {
                "documentation": "Returns the string \"pong\".",
                "params": {
                },
                "returns": {
                    "documentation": "Pong",
                    "type": ["void"]
                }
            },
            "hello": {
                "documentation": "Greets a user, possibly by name",
                "params": {
                    "name": {
                        "order": 1,
                        "documentation": ["Name to greet"],
                        "type": "string",
                        "optional": true
                    },
                },
                "returns": {
                    "documentation": "Greeting",
                    "type": ["string"]
                }
            },
            "add": {
                "documentation": "Add two numbers",
                "params": {
                    "a": {
                        "order": 1,
                        "documentation": "First number",
                        "type": "number",
                        "optional": false
                    },
                    "b": {
                        "order": 2,
                        "documentation": "Second number",
                        "type": "number",
                        "optional": false
                    },
                },
                "returns": {
                    "documentation": "Sum of a and b",
                    "type": ["number"]
                }
            },
            "timer": {
                "documentation": ["Send a response after a delay"],
                "params": {
                    "msec": {
                        "order": 1,
                        "documentation": "Amount of time to wait, in ms",
                        "type": "number",
                        "optional": false
                    },
                },
                "returns": {
                    "documentation": "Response after delay",
                    "type": ["event timer"],
                }

            },
        },
        "messages": {
            "timer": {
                "params": {
                },
            }
        }
    }
};

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
export function hello(req: Request, name?:string) {
    if(typeof name == "undefined"){
        req.respond("Hello!");
    } else {
        req.respond(`Hello, ${name}!`);
    }
}

/**
 * Add two numbers
 * @param {Request} req 
 * @param {Number} a First number 
 * @param {Number} b Second number 
 */
export function add(req: Request, a:number, b:number) {
    req.respond(a + b);
}

/**
 * Send a response after a delay
 * @param {Request} req 
 * @param {Number} msec Amount of time to wait, in ms
 */
export function timer(req: Request, msec:number) {
    setTimeout(() => {
        req.respondEvent("timer");
    }, msec);
}

/**
 * List of RPCs
 */
export var RPCs : {[key: string]: Function} = {
    ping,
    hello,
    add,
    timer
};