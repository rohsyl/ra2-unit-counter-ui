import {DataProvider, PlayerData, SourceReadyResult} from './DataProvider';
import path from 'path';
import fs from 'fs';
import {Config} from "../config";

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

    private alliedCoutries: string[] = [
        'America',
        'Korea',
        'France',
        'Germany',
        'Great Britain',
    ];

    private sovietCoutries: string[] = [
        'Libya',
        'Iraq',
        'Cuba',
        'Russia',
    ];

    private yuriCoutries: string[] = [
        'Yuri',
    ];

    private alliedUnits: string[] = [
        'allieddogs',
        'alliedminers',
        'battlefortresses',
        'gis',
        'grandcannons',
        'grizzlies',
        'ifvs',
        'mirages',
        'oils',
        'prisms',
        'rocketeers',
        'warfactories',
    ];

    private sovietUnits: string[] = [
        'bunkers',
        'desolators',
        'drones',
        'flaktraks',
        'conscripts',
        'kirovs',
        'oils',
        'rhinos',
        'sovietdogs',
        'sovietminers',
        'warfactories',
    ];

    private yuriUnits: string[] = [
        'brutes',
        'discs',
        'gattlings',
        'lashers',
        'magnetrons',
        'masterminds',
        'warfactories',
        'yuriminers',
        'oils',
    ];

    public config: Config;

    public constructor(config: Config) {
        this.config = config;
    }

    public getPlayerData(color: string, withUnits: boolean = true): PlayerData {

        const country = this.readPlayerData(color, 'country')

        let units: object[] = [];
        let faction = '';
        if(this.alliedCoutries.includes(country)) {
            faction = 'allied';
            units = withUnits ? this.readUnits(color, this.alliedUnits) : [];
        }
        else if(this.sovietCoutries.includes(country)) {
            faction = 'soviet';
            units = withUnits ? this.readUnits(color, this.sovietUnits) : [];
        }
        else {
            faction = 'yuri';
            units = withUnits ? this.readUnits(color, this.yuriUnits) : [];
        }

        return {
            'name': this.readPlayerData(color, 'name'),
            'color': color,
            'balance': this.readPlayerData(color, 'balance'),
            'power': undefined,
            'is_low_power': this.readPlayerData(color, 'lowpower') == 'LOW POWER',
            'country': country,
            'faction': faction,
            'units': units,
        }
    }

    public getMetadata(): object {

        return {
            'colors': this.colors,
            'countries': {
                'allied': this.alliedCoutries,
                'soviet': this.sovietCoutries,
                'yuri': this.yuriCoutries,
            },
            'units': {
                'allied': this.alliedUnits,
                'soviet': this.sovietUnits,
                'yuri': this.yuriUnits,
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

    private readUnits(color: string, units: string[]): object[] {
        const result: object[] = [];

        for(const unit of units) {
            result.push({
                'name': unit,
                'count': this.readPlayerData(color, unit),
            });
        }

        return result
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
