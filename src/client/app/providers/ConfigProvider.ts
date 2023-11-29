import {Config} from "../../../server/config";

export default class ConfigProvider {

    public static config: Config;
    public static loadConfig(): Config {

        console.log('loadConfig()')

        // @ts-ignore
        const hostname = import.meta.env.VITE_HOSTNAME ?? this.getConfigFromMeta('hostname') ?? 'localhost'
        // @ts-ignore
        const port = import.meta.env.VITE_PORT ?? this.getConfigFromMeta('port') ?? 8080
        // @ts-ignore
        const base_path = import.meta.env.VITE_CLIENT_BASE_PATH ?? this.getConfigFromMeta('base_path') ?? '/ra2'

        this.config = {
            'server': {
                'hostname': hostname,
                'port': port,
            },
            'client': {
                'base_path': base_path,
                'api_url': this.injectHostnameAndPort('http://{hostname}:{port}', hostname, port),
                'ws_url': this.injectHostnameAndPort('ws://{hostname}:{port}/websockets', hostname, port),
            }
        } as Config

        return this.config
    }

    private static getConfigFromMeta(key: string): string|undefined|null {
        const value = document.querySelector('meta[name="a2:' + key + '"]')?.getAttribute('value')
        if(value === '<%= ' + key.split(':')[1] + ' %>') {
            return null
        }
        return value
    }

    private static injectHostnameAndPort(value: string, hostname: string, port: number): string {
        return value.replace('{hostname}', hostname).replace('{port}', port.toString())
    }
}
