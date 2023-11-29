"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    'server': {
        'game_dir': (_a = process.env.GAME_DIR) !== null && _a !== void 0 ? _a : undefined,
        'hostname': (_b = process.env.HOSTNAME) !== null && _b !== void 0 ? _b : 'localhost',
        'port': (_c = process.env.PORT) !== null && _c !== void 0 ? _c : 8080,
    },
    'client': {
        'base_path': (_d = process.env.CLIENT_BASE_PATH) !== null && _d !== void 0 ? _d : '/ra2',
        'api_url': 'http://{hostname}:{port}',
        'ws_url': 'ws://{hostname}:{port}/websockets',
    }
};
