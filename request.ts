/**
 * Represents information about a remote call
 */
export class Request {
    funcName: string = "";
    funcParams: Object = {};
    callID: string = "";

    constructor(json:string) {
        let parsed = JSON.parse(json);
    }

    respond(...args : any[]){

    }

    respondEvent(type: string, ...args : any[]){

    }
}