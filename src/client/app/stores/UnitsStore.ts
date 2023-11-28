import {defineStore} from "pinia";
import {Player} from "./GameStore";
import {toRaw} from "vue";


export function initFetchValues(unitsStore: any, gameStore: any, player: Player) {
    unitsStore.$patch({
        players: {},
    });
    fetchValues(unitsStore, gameStore, player);
}

export async function fetchValues(unitsStore: any, gameStore: any, player: Player) {
    await unitsStore.fetchPlayerValues(player);
    setTimeout(() => {

        if(!gameStore.gameRunning) return;

        fetchValues(unitsStore, gameStore, player);
    }, 1000);
}

export const useUnitsStore = defineStore('units', {
    state: () : {
        players: {[key: string]: object;},
    } => ({
        players: {},
    }),
    getters: {
    },
    actions: {
        async fetchPlayerValues(player: Player) {
            const response = await fetch(import.meta.env.VITE_DATA_API_URL + '/playerdata/' + player.color);
            const data = (await response.json()).data;
            this.$patch({
                players: {
                    [player.color]: data
                }
            })
        }
    },
    persist: false
})