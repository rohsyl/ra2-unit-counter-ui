import {defineStore} from "pinia";
import Color from "../models/Color";
import ColorsProvider from "../providers/ColorsProvider";
import ConfigProvider from "../providers/ConfigProvider";

export interface Player {
    name: string;
    color: string;
    score: number;
}

export interface Team {
    name: string;
    players: Player[];
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

function initTeam(team: Team|undefined, size: number): Team {
    if(!team) {
        team = {
            name: 'Team',
            players: [],
            score: 0,
        }
    }

    while(team.players.length < size) {
        team.players.push({
            name: '',
            color: '',
            score: 0,
        });
    }

    if(team.players.length > size) {
        team.players.splice(size, team.players.length - size);
    }

    return team;
}

export const useGameStore = defineStore('game', {
    state: () : {
        player1: Player,
        player2: Player,
        team1?: Team,
        team2?: Team,
        gameFormat: string,
        gameMode: string,
        error?: string,
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
        team1: {
            name: 'Team 1',
            players: [],
            score: 0,
        },
        team2: {
            name: 'Team 2',
            players: [],
            score: 0,
        },
        error: undefined,
        gameFormat: 'BO5',
        gameMode: '1v1',
        gameRunning: false,
    }),
    getters: {
        getState(): { player1: Player, player2: Player, team1?: Team, team2?: Team, gameFormat: string, gameMode: string } {
            return {
                player1: this.player1,
                player2: this.player2,
                team1: this.team1,
                team2: this.team2,
                gameFormat: this.gameFormat,
                gameMode: this.gameMode
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
            const response = await fetch(ConfigProvider.config.client.api_url + '/active-players');
            const data = (await response.json()).data;

            if(!response.ok) {
                this.gameRunning = false;

                if(response.status === 500) {
                    if(data.message) {
                        this.error = data.message;
                    }
                }
            }
            else {
                this.error = undefined;
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
            }


        },
        async fetchPlayerUnits(player: Player) {
            const response = await fetch(ConfigProvider.config.client.api_url + 'playerdata/' + player.color);
        },

        getColor(player: Player): Color {
            return ColorsProvider.getColor(player.color);
        },

        setGameMode(gameMode: string) {
            this.gameMode = gameMode;
            if(gameMode === '2v2') {
                this.team1 = initTeam(this.team1, 2);
                this.team2 = initTeam(this.team2, 2);
            }
            else if(gameMode === '3v3') {
                this.team1 = initTeam(this.team1, 3);
                this.team2 = initTeam(this.team2, 3);
            }
        }
    },
    persist: true
})
