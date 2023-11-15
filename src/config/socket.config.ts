import { Server as SocketIo, Socket as SocketIOSocket } from "socket.io";
import { Server as HTTPServer } from "http";
import { SocketMapValue } from "../sockets/base.socket";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AdminSocket } from "../sockets/admin.socket";

// Define a custom type for SocketIOSocket with a userId property
export interface CustomSocket extends SocketIOSocket {
    token?: string; // Change the type of userId as needed
    userId?: string | JwtPayload | undefined;
}

export class Socket {
    private io: SocketIo;
    private connectedSockets: SocketMapValue[] = [];

    private registeredSockets: any[] = [AdminSocket];

    constructor(httpServer: HTTPServer) {
        this.io = new SocketIo(httpServer, {
            cors: {
                origin: "http://localhost:3000", // Set your client's domain here
                methods: ["GET", "POST"],
            },
        });

        this.setupEventHandlers();
        this.initializeRegisteredSockets();
    }

    private setupEventHandlers(): void {
        this.io.on("connection", (socket: CustomSocket) => {
            console.log("A client connected");

            authMiddleware(socket);

            //handle disconnected client
            socket.on("disconnect", () => {
                console.log("A client disconnected");
            });

            // Add the connected socket to the list
            userSocketExist(this.connectedSockets, socket);
        });
    }

    initializeRegisteredSockets() {
        this.registeredSockets.forEach(
            (registeredSocket) => new registeredSocket(this.io),
        );
    }

    public config(): void {
        //this.io.use(this.authMiddleware.bind(this));
    }
}

export default Socket;

export const authMiddleware = (
    socket: CustomSocket,
    //next: (error?: Error) => void,
): void => {
    // Get user ID from the authentication token or headers
    const token = socket.handshake.auth.token;

    if (!token) {
        console.log(token, "totken");
        // Authentication failed
        socket.emit(
            "authenticationError",
            "Authentication failed: No token provided",
        );
        socket.disconnect(); // Disconnect the client if authentication fails
        return;
        //return next(new Error("Authentication failed: No token provided"));
    }

    const options = {
        // Set JWT options here (e.g., algorithms, audience, issuer, etc.)
    };

    // socket.userId = "64da662f257daca1b2b6b953";
};

const isValidUser = (decoded: string | JwtPayload | undefined): Boolean => {
    return true;
};

export const userSocketExist = (
    connectedSockets: SocketMapValue[],
    socket: CustomSocket,
) => {
    const index = connectedSockets.findIndex(
        (item) => item.userId === socket.userId,
    );
    if (index !== -1) {
        const socketInstance = connectedSockets[index];
        socketInstance.socket = socket;
    } else {
        connectedSockets.push({
            userId: socket.userId as string,
            socket,
        });
    }
};