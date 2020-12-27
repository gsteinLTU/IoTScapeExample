import { Request } from "./request";

export const definition = {
    "MetaScapeTest": {
        "service": {
            "description": ["Example service for MetaScape development",
                            "Includes ping, hello, add, and timer functions"], 
            "externalDocumentation": "",
            "termsOfService": "",
            "contact": "",
            "license": "",
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

export function ping(req: Request) {
    req.respond("pong");
}

export function hello(req: Request, name?:string) {
    if(typeof name == "undefined"){
        req.respond("Hello!");
    } else {
        req.respond(`Hello, ${name}!`);
    }
}

export function add(req: Request, a:number, b:number) {
    req.respond(a + b);
}

export function timer(req: Request, msec:number) {
    setTimeout(() => {
        req.respondEvent("timer");
    }, msec);
}

