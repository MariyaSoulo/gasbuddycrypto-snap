import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';
import * as dotenv from 'dotenv';

// Загружаем переменные из .env
dotenv.config({ path: resolve(__dirname, '.env') });

const config: SnapConfig = {
  input: resolve(__dirname, 'src/index.tsx'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
  },
  customizeWebpackConfig: (webpackConfig) => {
    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.plugins.push(
      new (require('webpack').DefinePlugin)({
        'process.env.API_KEY': JSON.stringify(process.env.API_KEY || ''),
      })
    );
    return webpackConfig;
  },
};

export default config;
