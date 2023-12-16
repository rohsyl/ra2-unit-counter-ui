export interface Config {
    server: {
        game_dir: string
        hostname: string,
        port: number,
    },
    client: {
        base_path: string,
        api_url: string,
        ws_url: string,
    },
    version: string,
}

export default class ConfigProvider {
    public get(): Config {
        return {
            'server': {
                'game_dir': process.env.GAME_DIR ?? '.',
                'hostname': process.env.HOSTNAME ?? 'localhost',
                'port': process.env.PORT ?? 8080,
            },
            'client': {
                'base_path': process.env.CLIENT_BASE_PATH ?? '/ra2',
                'api_url': 'http://{hostname}:{port}',
                'ws_url': 'ws://{hostname}:{port}/websockets',
            },
            'version': 'v0.4.0'
        } as Config
    }
}