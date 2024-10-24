import {defineStore} from "pinia";
import Color from "../models/Color";
import ColorsProvider from "../providers/ColorsProvider";
import ConfigProvider from "../providers/ConfigProvider";

export interface Player {
    name: string;
    color: string;
    score: number;
    faction?: string;
    country?: string;
}

export interface Team {
    name: string;
    players: Player[];
    score: number;
}

export type GameStoreProps = {
    player1: Player,
    player2: Player,
    team1?: Team,
    team2?: Team,
    gameFormat: string,
    gameMode: string,
    error?: string,
    gameRunning: boolean,
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
    state: () : GameStoreProps => ({
        player1: {
            name: '',
            color: '',
            score: 0,
            faction: ''
        },
        player2: {
            name: '',
            color: '',
            score: 0,
            faction: ''
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
        getState(): GameStoreProps {
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
                this.updateActivePlayers(data)
            }


        },

        updateActivePlayers(data) {
            this.gameRunning = data.is_game_running;

            if(this.gameRunning) {

                if(this.gameMode === '1v1') {

                    let p1: any = data.players.find((p: any) => p.name === this.player1.name)
                    if(p1) {
                        this.player1.color = p1.color;
                        this.player1.faction = p1.faction;
                        this.player1.country = p1.country;
                    }
                    let p2: any = data.players.find((p: any) => p.name === this.player2.name)
                    if(p2) {
                        this.player2.color = p2.color;
                        this.player2.faction = p2.faction;
                        this.player2.country = p2.country;
                    }
                }
                else if(this.gameMode === '2v2') {
                    for(const player of this.team1.players) {
                        const _p = data.players.find((p: any) => p.name === player.name)
                        player.faction = _p?.faction;
                        player.country = _p?.country;
                    }
                    for(const player of this.team2.players) {
                        const _p = data.players.find((p: any) => p.name === player.name)
                        player.faction = _p?.faction;
                        player.country = _p?.country;
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
