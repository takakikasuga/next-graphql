/** @type {import('next').NextConfig} */
const path = require('path');
module.exports = {
  images: {
    domains: ['https://tailwindcss.com']
  },
  reactStrictMode: true,
  webpack(config, options) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
};
