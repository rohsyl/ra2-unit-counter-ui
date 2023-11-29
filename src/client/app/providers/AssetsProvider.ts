export default class AssetsProvider {
    public getUnitImgSrc(unitName: string): string {
        return `/ra2/assets/units/${unitName}.webp`
    }

    public getFactionImgSrc(factionName: string): string {
        return `/ra2/assets/factions/${factionName}.png`
    }
}
