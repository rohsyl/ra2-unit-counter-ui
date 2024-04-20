import {Server} from 'ws';
import qs from "qs";
import {App} from "../app";
import masterHandler from './handlers/master-handler'
import slaveHandler from './handlers/slave-handler'


export default async (expressServer: any) => {

    const websocketServer: Server = new Server({
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

            if(connectionParams.type) {
                if(connectionParams.type === 'master') {

                    //if already a master connection opened, refuse connection
                    if(App.instance().masterConnection) {
                        websocketConnection.send(JSON.stringify({ message: 'refused' }));
                        websocketConnection.close()
                        return;
                    }

                    masterHandler(websocketConnection);
                }
                else if(connectionParams.type === 'slave') {
                    slaveHandler(websocketConnection);
                }
                else {
                    websocketConnection.send(JSON.stringify({ message: 'invalid' }));
                    websocketConnection.disconnect()
                }
            }

        }
    );

    App.instance().store().on('updated', (storeName: string, storeData: any, emitter: string) => {

        App.instance().slaveConnections.forEach((slaveConnection: any) => {
            slaveConnection.send(JSON.stringify({ message: {
                    action: 'update-store',
                    store: storeName,
                    data: storeData
                }
            }));
        })

        App.instance().masterConnection.send(JSON.stringify({ message: 'done' }));

        if(emitter === 'api') {

            App.instance().masterConnection.send(JSON.stringify({ message: {
                    action: 'update-store',
                    store: storeName,
                    data: storeData
                }
            }));
        }

    })

    return websocketServer;
};



