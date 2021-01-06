import dgram from 'dgram';
import debug from 'debug';

/**
 * Example server for running a MetaScape service
 */
export class Server {
    logger = debug('Server');
    socket: dgram.Socket;

    /**
     * Inform a server about the service available in this program
     * @param host Host of server to announce service to
     * @param port Port of server to announce service to
     * @param definition Definition of service to announce to server
     */
    announce(host: string, port: number, definition: string) {
        this.socket.send(definition, port, host);
    }

    constructor(port?:number) {
        this.socket = dgram.createSocket('udp4');

        this.socket.on('error', (err) => {
            this.logger(`server error:\n${err.stack}`);
            this.socket.close();
        });

        this.socket.on('message', (msg, rinfo) => {
            this.logger(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        });

        this.socket.on('listening', () => {
            const address = this.socket.address();
            this.logger(`server listening ${address.address}:${address.port}`);
        });

        this.socket.bind(port);
    }
}