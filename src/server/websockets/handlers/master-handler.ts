import {App} from "../../app";

export default function handleMaster(websocketConnection: any) {
    App.instance().masterConnection = websocketConnection;

    App.instance().masterConnection.on("message", (message: any) => {
        const parsedMessage = JSON.parse(message);

        if(parsedMessage.action) {
            if(parsedMessage.action === 'update') {
                updateAction(parsedMessage)
            }
        }
        else {
            App.instance().masterConnection.send(JSON.stringify({ message: 'There be gold in them thar hills.' }));
        }

    });

    App.instance().masterConnection.on("close", () => {
        App.instance().masterConnection = undefined;
    })
}

function updateAction(message: any) {
    App.instance().store().update(message.message.store, message.message.data, 'master')
}