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
                'game_dir': Deno.env.GAME_DIR ?? '.',
                'hostname': Deno.env.HOSTNAME ?? 'localhost',
                'port': Deno.env.PORT ?? 8080,
            },
            'client': {
                'base_path': Deno.env.CLIENT_BASE_PATH ?? '/ra2',
                'api_url': 'http://{hostname}:{port}',
                'ws_url': 'ws://{hostname}:{port}/websockets',
            },
            'version': 'v0.8.1'
        } as Config
    }
}