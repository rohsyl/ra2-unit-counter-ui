import {defineConfig} from "vite";
import vue from '@vitejs/plugin-vue'
import * as path from 'path';

export default defineConfig({
    root: './src/client/',
    publicDir: './public/',
    plugins: [vue()],
    manifest: {
        basePath: '../../dist/'
    },
    build: {
        outDir: '../../dist/'
    }
});
