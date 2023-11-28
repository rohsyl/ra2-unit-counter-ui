import {defineStore} from "pinia";
import Color from "../models/Color";
import ColorsProvider from "../providers/ColorsProvider";

export interface Player {
    name: string;
    color: string;
    score: number;
}

export function initIsRunning(gameStore: any) {
    gameStore.$patch({
        gameRunning: false,
    });
    isRunning(gameStore);
}

export async function isRunning(gameStore: any) {
    await gameStore.fetchIsGameRunning();
    setTimeout(() => {
        isRunning(gameStore);
    }, 4000);
}


export const useGameStore = defineStore('game', {
    state: () : {
        player1: Player,
        player2: Player,
        gameFormat: string,
        gameRunning: boolean,
    } => ({
        player1: {
            name: '',
            color: '',
            score: 0,
        },
        player2: {
            name: '',
            color: '',
            score: 0,
        },
        gameFormat: 'BO5',
        gameRunning: false,
    }),
    getters: {
        getState(): { player1: Player, player2: Player, gameFormat: string } {
            return {
                player1: this.player1,
                player2: this.player2,
                gameFormat: this.gameFormat,
            }
        },
        getPlayer1Color(): Color {
            return ColorsProvider.getColor(this.player1.color)
        },
        getPlayer2Color(): Color {
            return ColorsProvider.getColor(this.player2.color)
        }
    },
    actions: {
        async fetchIsGameRunning() {
            const response = await fetch(import.meta.env.VITE_DATA_API_URL + '/active-players');
            const data = (await response.json()).data;
            this.gameRunning = data.is_game_running;

            if(this.gameRunning) {
                if(this.player1.color === '') {
                    let player: any = data.players.find((p: any) => p.name === this.player1.name)
                    if(player) {
                        this.player1.color = player.color;
                    }
                }
                if(this.player2.color === '') {
                    let player: any = data.players.find((p: any) => p.name === this.player2.name)
                    if(player) {
                        this.player2.color = player.color;
                    }
                }
            }

        },
        async fetchPlayerUnits(player: Player) {
            const response = await fetch(import.meta.env.VITE_DATA_API_URL + 'playerdata/' + player.color);
        }
    },
    persist: true
})