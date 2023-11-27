export interface DataProvider {

    getPlayerData(color: string): object;

    getMetadata(): object;

    getActiveColors(): string[];
}
