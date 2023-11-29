import {Config} from "../../../server/config";

export default class ConfigProvider {

    public static config: Config;
    public static loadConfig(): Config {

        let hostname
        let port
        let base_path

        if(import.meta.env.MODE === 'production') {
            hostname = this.getConfigFromMeta('hostname') ?? 'localhost'
            port = this.getConfigFromMeta('port') ?? 8080
            base_path = this.getConfigFromMeta('base_path') ?? '/ra2'
        }
        else {
            hostname = import.meta.env.VITE_HOSTNAME ?? 'localhost'
            port = import.meta.env.VITE_PORT ?? 8080
            base_path = import.meta.env.VITE_CLIENT_BASE_PATH ?? '/ra2'
        }

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
        const value = document.querySelector('meta[name="ra2:' + key + '"]')?.getAttribute('value')
        if(value === '<%= ' + key.split(':')[1] + ' %>') {
            return null
        }
        return value
    }

    private static injectHostnameAndPort(value: string, hostname: string, port: number): string {
        return value.replace('{hostname}', hostname).replace('{port}', port.toString())
    }
}
