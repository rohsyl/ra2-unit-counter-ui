import WebSocket from 'ws';
import qs from "qs";

let masterConnection: any = null;
let slaveConnections: any[] = []

export default async (expressServer: any) => {
    const websocketServer = new WebSocket.Server({
        noServer: true,
        path: "/websockets",
    });

    expressServer.on("upgrade", (request: any, socket: any, head: any) => {
        websocketServer.handleUpgrade(request, socket, head, (websocket: any) => {
            websocketServer.emit("connection", websocket, request);
        });
    });

    websocketServer.on(
        "connection",
        function connection(websocketConnection: any, connectionRequest: any) {
            const [_path, params] = connectionRequest?.url?.split("?");
            const connectionParams = qs.parse(params);

            // NOTE: connectParams are not used here but good to understand how to get
            // to them if you need to pass data with the connection to identify it (e.g., a userId).
            console.log(connectionParams);

            if(connectionParams.type) {
                if(connectionParams.type === 'master') {
                    console.log('master connected');
                    masterConnection = websocketConnection;
                    handleMaster(websocketConnection);

                }
                if(connectionParams.type === 'slave') {
                    console.log('slave connected');
                    slaveConnections.push(websocketConnection);
                    handleSlave(websocketConnection);
                }
            }

        }
    );

    return websocketServer;
};


function handleMaster(websocketConnection: any) {

    websocketConnection.on("message", (message: any) => {
        const parsedMessage = JSON.parse(message);
        console.log(parsedMessage);

        if(parsedMessage.action) {
            if(parsedMessage.action === 'message-slaves') {
                slaveConnections.forEach((slaveConnection: any) => {
                    slaveConnection.send(JSON.stringify({ message: parsedMessage.message }));
                })

                websocketConnection.send(JSON.stringify({ message: 'done' }));
            }
        }
        else {
            websocketConnection.send(JSON.stringify({ message: 'There be gold in them thar hills.' }));
        }

    });
}

function handleSlave(websocketConnection: any) {
    if(masterConnection) {
        masterConnection.send(JSON.stringify({ message: 'A slave is connected' }));

        websocketConnection.on("close", (message: any) => {
            masterConnection.send(JSON.stringify({ message: 'A slave is disconnected' }));
        })
    }
}