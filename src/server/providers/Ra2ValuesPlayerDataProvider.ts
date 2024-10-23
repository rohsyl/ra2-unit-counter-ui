import {DataProvider, PlayerData, SourceReadyResult} from './DataProvider';
import path from 'path';
import fs from 'fs';
import {Config} from "../config";
import alliedUnits from './assets/allied';
import sovietUnits from "./assets/soviet";
import yuriUnits from "./assets/yuri";
import countries from "./assets/countries";

export default class Ra2ValuesPlayerDataProvider implements DataProvider{

    private colors: string[] = [
        'cyan',
        'blue',
        'green',
        'pink',
        'purple',
        'orange',
        'red',
        'yellow',
    ]

    public config: Config;

    public constructor(config: Config) {
        this.config = config;
    }

    public getPlayerData(color: string, withUnits: boolean = true): PlayerData {

        const countryName = this.readPlayerData(color, 'country')

        const country = countries.find(c => c.name === countryName);

        if(!country) {
            return {
                name: '',
                color: color
            }
        }

        let units: UnitItem[] = withUnits
            ? this.readUnits(color, country.faction)
            : [];

        return {
            'name': this.readPlayerData(color, 'name'),
            'color': color,
            'balance': this.readPlayerData(color, 'balance'),
            'power': undefined,
            'is_low_power': this.readPlayerData(color, 'lowpower') == 'LOW POWER',
            'country': country.name,
            'faction': country.faction,
            'units': units,
        }
    }

    public getMetadata(): object {
        return {
            'colors': this.colors,
            'countries': {
                'allied': countries.filter(c => c.faction === 'allied'),
                'soviet': countries.filter(c => c.faction === 'soviet'),
                'yuri': countries.filter(c => c.faction === 'yuri'),
            },
            'units': {
                'allied': alliedUnits,
                'soviet': sovietUnits,
                'yuri': yuriUnits,
            }
        }
    }

    private readPlayerData(color: string, field: string): string {

        const config: Config = this.config;
        const filePath = path.join(config.server.game_dir, 'playerdata', color + '_' + field + '.txt');

        if(!fs.existsSync(filePath)) {
            return '';
        }

        return fs.readFileSync(
            filePath,
            'utf8'
        )
    }

    private readUnits(color: string, faction: Faction): UnitItem[] {
        const result: UnitItem[] = [];
        const units = this.getUnitsByFaction(faction)

        if(!units) return [];

        for(const unit of units) {
            result.push({
                ...unit,
                count: parseInt(this.readPlayerData(color, unit.name)),
            });
        }

        return result
    }

    private getUnitsByFaction(faction: Faction) {
        if(faction === 'yuri') {
            return yuriUnits
        }
        else if(faction === 'soviet') {
            return sovietUnits
        }
        else if(faction === 'allied') {
            return alliedUnits
        }
    }

    getActivePlayers(): PlayerData[] {
        const result: PlayerData[] = [];
        for(const color of this.colors) {
            const playerdata = this.getPlayerData(color, false)
            if(playerdata.name !== '') {
                result.push(playerdata);
            }
        }
        return result;
    }

    checkSourceReady(): SourceReadyResult {
        const config: Config = this.config;
        if (!fs.existsSync(config.server.game_dir)) {
            return {
                isReady: false,
                message: 'Game directory not found under : ' + path.resolve(config.server.game_dir),
            };
        }

        const gamePath = path.join(config.server.game_dir, 'gamemd.exe');
        if(!fs.existsSync(gamePath)) {
            return {
                isReady: false,
                message: 'Game not found in the given directory : ' + path.resolve(gamePath),
            };
        }

        const qmPath = path.join(config.server.game_dir, 'Qt', 'CnCNetQM.exe');
        if(!fs.existsSync(qmPath)) {
            return {
                isReady: false,
                message: 'Game not found in the given directory : ' + path.resolve(qmPath),
            };
        }

        return {
            isReady: true,
            message: 'Source ready',
        };
    }

}

export type Faction = 'yuri' | 'allied' | 'soviet';

export type Country = {
    name: string,
    imageUrl: string,
    faction: Faction,
    factionImageUrl: string,
}

export type UnitAsset = {
    name: string,
    imageUrl: string,
    default?: boolean,
    position?: number,
}

export type UnitItem = UnitAsset & {
    count: number,
}