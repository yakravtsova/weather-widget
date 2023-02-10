const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    extract: false,
  },
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");
  },
  filenameHashing: false,
});
