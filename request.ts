import { RemoteInfo, Socket } from "dgram";

/**
 * Represents information about a remote call
 */
export class Request {
    funcName: string = "";
    funcParams: any[] = [];
    callID: string = "";
    socket:Socket;
    rinfo:RemoteInfo;

    constructor(json:string, socket:Socket, rinfo:RemoteInfo) {
        let parsed = JSON.parse(json);

        // Separate parts of request object
        this.callID = parsed["id"];
        this.funcName = parsed["function"] as string;
        this.funcParams = parsed["params"];

        // Store connection info
        this.socket = socket;
        this.rinfo = rinfo;
    }

    /**
     * Send a result of a function 
     * @param args Result(s) of function call
     */
    respond(...args : any[]){
        var response = {
            "id": this.callID,
            "response": [
                ...args
            ],
        };

        this._send(response);
    }

    /**
     * Send an error result of a function
     * @param {String} err Error message
     */
    respondError(err: string){
        var response = {
            "id": this.callID,
            "error": err,
        };

        this._send(response);
    }

    /**
     * Send an event result
     * @param type Name of event type
     * @param args Value(s) associated with event
     */
    respondEvent(type: string, ...args : any[]){
        var response = {
            "id": this.callID,
            "event": {
                "type": type,
                "args": args
            }
        };

        this._send(response);
    }

    /**
     * Send a response to the server
     * @param {Object} response Response object to send as JSON string
     */
    _send(response: Object){
        this.socket.send(JSON.stringify(response), this.rinfo.port, this.rinfo.address);
    }
}