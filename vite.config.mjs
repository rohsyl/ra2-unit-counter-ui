import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

export default defineConfig({
    root: './src/client/',
    envDir: '../../',
    publicDir: './public/',
    plugins: [vue()],
    base: '/ra2',
    build: {
        outDir: '../../dist/client/'
    },
    commonjsOptions: { include: [] }
});
