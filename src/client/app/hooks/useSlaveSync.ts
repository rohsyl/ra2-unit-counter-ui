import {useWebSocket} from "@vueuse/core";
import ConfigProvider from "../providers/ConfigProvider.ts";
import {useMetadataStore} from "../stores/MetadataStore.ts";
import {useUnitsStore} from "../stores/UnitsStore.ts";
import {useGameStore} from "../stores/GameStore.ts";
import {onUnmounted} from "vue";

export const useSlaveSync = () => {

    const unitsStore = useUnitsStore();
    const gameStore = useGameStore()
    const metadataStore = useMetadataStore()

    const url = ConfigProvider.config.client.ws_url + '?type=slave';
    const { status, data, send, open, close } = useWebSocket(url, {
        autoReconnect: {
            delay: 5000,
        },
        onMessage: (ws, message) => {
            const data = JSON.parse(message.data)
            if(data.message.action === 'update-store') {
                if(data.message.store == 'game') {
                    gameStore.$patch(data.message.data)
                }
                else if (data.message.store == 'metadata') {
                    metadataStore.$patch(data.message.data)
                }
                else if (data.message.store == 'units') {
                    unitsStore.$patch(data.message.data)
                }
            }
            else if (data.message.action == 'active-players') {
                gameStore.updateActivePlayers(data.message.data);
            }
        },
        onConnected: () => {
            console.log('Connected to websocket')
        },
        onError: () => {
            console.log('Connection to websocket failed. Trying again later')
        }
    })

    onUnmounted(() => {
        close();
    })

    return {
        status, data, send, open, close
    }
}