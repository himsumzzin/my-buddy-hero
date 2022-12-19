const { resolve } = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['storage.googleapis.com'],
    minimumCacheTTL: 1500000,
  },
  swcMinify: true,
  webpack(config) {
    config.module.rules = config.module.rules.filter((rule) =>
      rule.test && !rule.test.test('.svg') ? false : true
    );

    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve('src'),
      '@images': resolve('public/images'),
      '@svgs': resolve('public/svgs'),
    };

    return config;
  },
};

module.exports = nextConfig;
