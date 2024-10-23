import ConfigProvider from "./ConfigProvider.ts";

export default class AssetsProvider {
    public getUnitImgSrc(unitName: string): string {
        return `/ra2/assets/units/${unitName}.webp`
    }

    public getFactionImgSrc(factionName: string): string {
        return `/ra2/assets/factions/${factionName}.webp`
    }

    public getAssetPath(path: string): string {
        return ConfigProvider.config.client.base_path + path
    }
}
