import {Server} from 'ws';
import qs from "qs";
import {App} from "../app";
import masterHandler from './handlers/master-handler'
import slaveHandler from './handlers/slave-handler'
import Ra2ValuesPlayerDataProvider from "../providers/Ra2ValuesPlayerDataProvider";
import {PlayerData} from "../providers/DataProvider";


export default async (expressServer: any) => {

    const provider = new Ra2ValuesPlayerDataProvider(App.instance().config());
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

    // send units stats to slaves by interval
    setInterval(() => {
        const activePlayers = provider.getActivePlayers()
        const message: Record<string, PlayerData> = {}

        for(const player of activePlayers) {
            message[player.color] = provider.getPlayerData(player.color)
        }

        for(const slave of App.instance().slaveConnections) {
            slave.send(JSON.stringify({
                message: {
                    action: 'update-store',
                    store: 'units',
                    data: { players: message }
                }
            }));
        }
    }, 1000);

    setInterval(() => {
        const activePlayers = provider.getActivePlayers()
        const data = {
            message: {
                action: 'active-players',
                data: {
                    is_game_running: activePlayers.length > 0,
                    players: activePlayers
                }
            }
        }
        App.instance().masterConnection?.send(JSON.stringify(data))
        for(const slave of App.instance().slaveConnections) {
            slave.send(JSON.stringify(data));
        }


    }, 5000)

    App.instance().store().on('updated', (storeName: string, storeData: any, emitter: string) => {

        App.instance().slaveConnections.forEach((slaveConnection: any) => {
            console.log('notify slave on store change')
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



