const { resolve } = require('path');

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
  dest: 'public',
});

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
  },
  reactStrictMode: false,
  images: {
    domains: ['storage.googleapis.com'],
    minimumCacheTTL: 1500000,
  },
  swcMinify: true,
  webpack(config) {
    config.module.rules = config.module.rules.filter(
      (rule) => !rule.test?.test('.svg')
    );

    config.module.rules.push({
      test: /\.svg$/i,
      oneOf: [
        {
          dependency: { not: ['url'] },
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                titleProp: true,
                svgo: true,
              },
            },
            'new-url-loader',
          ],
        },
        {
          type: 'asset/resource',
          generator: {
            filename: 'static/[name].[contenthash][ext][query]',
          },
          parser: {
            dataUrlCondition: 4 * 1024,
          },
        },
      ],
    });

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve('src'),
      '@images': resolve('public/images'),
      '@svgs': resolve('public/svgs'),
    };

    return config;
  },
});
