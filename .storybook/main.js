const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js'),
      },
    },
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: async (config) => {
    // configure for absolute imports
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];

    // disable whatever is already set to load SVGs
    config.module.rules = config.module.rules
      .filter((rule) => rule.test && !rule.test.test('.css'))
      .map((rule) => {
        if (rule.test.test('.svg')) {
          rule.exclude = /\.svg$/i;
        }
        return rule;
      });

    // add SVGR instead
    config.module.rules.push(
      // svg 로더
      {
        test: /\.svg$/,
        use: [
          {
            loader: '@svgr/webpack',
          },
          {
            loader: 'file-loader',
            options: {
              name: 'static/media/[path][name].[ext]',
            },
          },
        ],
        type: 'javascript/auto',
        issuer: {
          and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
      },
      // postCSS 포함 css 로더
      {
        test: /\.(css|s[ac]ss)$/i,
        exclude: /\.module\.(css|s[ac]css)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 2,
                      features: {
                        'custom-properties': false,
                        'nesting-rules': true,
                      },
                    },
                  ],
                  'postcss-normalize',
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.module\.(css|s[ac]ss)$/i,
        include: /\.module\.(css|s[ac]ss)$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2,
              modules: {
                localIdentName: '[folder]_[local]__[hash:base64:5]',
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-flexbugs-fixes',
                  [
                    'postcss-preset-env',
                    {
                      autoprefixer: {
                        flexbox: 'no-2009',
                      },
                      stage: 2,
                      features: {
                        'custom-properties': false,
                        'nesting-rules': true,
                      },
                    },
                  ],
                  'postcss-normalize',
                ],
              },
            },
          },
        ],
      }
    );

    return config;
  },
};
