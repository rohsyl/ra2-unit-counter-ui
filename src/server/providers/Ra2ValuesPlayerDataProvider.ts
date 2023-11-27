import { DataProvider } from './DataProvider';
import path from 'path';

export default class Ra2ValuesPlayerDataProvider implements DataProvider{
    public getPlayerData(color: string): object {



        return {
            'name': 'Player',
            'color': color,
            'balance': 0,
            'power': 0,
            'is_low_power': false,
            'country': '',
            'units': [

            ],
        }
    }

    private readPlayerData(color: string, field: string): string {
        return path.join(process.env.GAME_DIR as string, 'playerdata', color + '_' + field + '.txt')
    }
}
