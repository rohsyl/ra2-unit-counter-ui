import ConfigProvider from "../providers/ConfigProvider";
import {useGameStore} from "../stores/GameStore";
import {storeToRefs} from "pinia";
import {useMetadataStore} from "../stores/MetadataStore";

export default class MasterSync {

    private ws?: WebSocket;

    constructor() {
        this.ws = undefined;
    }

    public connect() {
        this.ws = new WebSocket(ConfigProvider.config.client.ws_url + '?type=master')
        this.ws.onopen = () => {
            console.log('Connected to websocket <master>')
        }


    }

    public syncGameStore() {
        const gameStore = useGameStore();
        const { getState } = storeToRefs(gameStore)
        if(this.ws) {
            this.ws.send(JSON.stringify({
                action: 'update',
                message: {
                    action: 'update-store',
                    store: 'game',
                    data: getState.value
                }
            }))
        }
    }

    public syncMetadataStore() {
        const metadataStore = useMetadataStore()
        const { getMetadataState } = storeToRefs(metadataStore)
        if(this.ws) {
            this.ws.send(JSON.stringify({
                action: 'update',
                message: {
                    action: 'update-store',
                    store: 'metadata',
                    data: getMetadataState.value
                }
            }))

        }
    }

    public getWs() {
        return this.ws;
    }
}