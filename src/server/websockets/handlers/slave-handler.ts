import {App} from "../../app.ts";

export default
function handleSlave(websocketConnection: any) {

    App.instance().slaveConnections.push(websocketConnection);

    if(App.instance().masterConnection) {
        App.instance().masterConnection.send(JSON.stringify({ message: 'A slave is connected' }));

        websocketConnection.on("close", (message: any) => {
            App.instance().masterConnection.send(JSON.stringify({ message: 'A slave is disconnected' }));
        })
    }
}