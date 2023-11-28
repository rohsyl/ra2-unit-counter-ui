export default class AssetsProvider {
    public getUnitImgSrc(unitName: string): string {
        return `/assets/units/${unitName}.webp`
    }

    public getFactionImgSrc(factionName: string): string {
        return `/assets/factions/${factionName}.png`
    }
}