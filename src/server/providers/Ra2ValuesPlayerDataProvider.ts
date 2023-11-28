import {DataProvider, PlayerData} from './DataProvider';
import path from 'path';
import fs from 'fs';

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
        'oils',
        'warfactories',
        'yuriminers',
    ];


    public getPlayerData(color: string): object {

        const country = this.readPlayerData(color, 'country')

        let units: object[] = [];
        let faction = '';
        if(this.alliedCoutries.includes(country)) {
            faction = 'allied';
            units = this.readUnits(color, this.alliedUnits);
        }
        else if(this.sovietCoutries.includes(country)) {
            faction = 'soviet';
            units = this.readUnits(color, this.sovietUnits);
        }
        else {
            faction = 'yuri';
            units = this.readUnits(color, this.yuriUnits);
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
        return fs.readFileSync(
            path.join(process.env.GAME_DIR as string, 'playerdata', color + '_' + field + '.txt'),
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
            const name = this.readPlayerData(color, 'name');
            if(name !== '') {
                result.push({
                    'name': name,
                    'color': color,
                });
            }
        }

        return result;
    }
}