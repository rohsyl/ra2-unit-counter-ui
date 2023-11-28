export interface DataProvider {

    getPlayerData(color: string): object;

    getMetadata(): object;

    getActivePlayers(): PlayerData[];
}


export interface PlayerData {
    name: string,
    color: string,
}