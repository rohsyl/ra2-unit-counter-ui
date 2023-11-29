export interface DataProvider {

    getPlayerData(color: string): object;

    getMetadata(): object;

    getActivePlayers(): PlayerData[];

    checkSourceReady(): SourceReadyResult;
}

export interface SourceReadyResult {
    isReady: boolean,
    message: string,
}

export interface PlayerData {
    name: string,
    color: string,
}
