import {useWebSocket} from "@vueuse/core";
import {useGameStore} from "../stores/GameStore.ts";
import {useMetadataStore} from "../stores/MetadataStore.ts";
import {storeToRefs} from "pinia";
import ConfigProvider from "../providers/ConfigProvider.ts";
import {onUnmounted} from "vue";

export const useMasterSync = () => {
    const gameStore = useGameStore();
    const metadataStore = useMetadataStore()

    const url = ConfigProvider.config.client.ws_url + '?type=master';

    const { getState } = storeToRefs(gameStore)
    const { getMetadataState } = storeToRefs(metadataStore)

    const { status, data, send, open, close } = useWebSocket(url, {
        autoReconnect: {
            delay: 5000,
        },
        onMessage: (ws, message) => {
            const data = JSON.parse(message.data)
            if(data.message.action === 'update-store') {
                if(data.message.store === 'game') {
                    gameStore.$patch(data.message.data)
                }
            }
        }
    })

    onUnmounted(() => {
        close();
    })

    function syncGameStore() {
        send(JSON.stringify({
            action: 'update',
            message: {
                action: 'update-store',
                store: 'game',
                data: getState.value
            }
        }))
    }

    function syncMetadataStore() {
        send(JSON.stringify({
            action: 'update',
            message: {
                action: 'update-store',
                store: 'metadata',
                data: getMetadataState.value
            }
        }))
    }

    return {
        status, data, send, open, close, syncGameStore, syncMetadataStore
    }
}