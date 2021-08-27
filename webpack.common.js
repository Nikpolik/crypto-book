const path = require("path");

const src = path.resolve(__dirname, "./src");
const build = path.resolve(__dirname, "./public/lib");

const tsLoader = {
  loader: "ts-loader",
  options: { compilerOptions: { module: "esnext", noEmit: false } },
};

module.exports = {
  mode: "none",
  target: "webworker",
  entry: "./src/lib/levelsFeed/worker/index.ts",
  output: {
    filename: "worker.js",
    path: build,
  },
  resolve: {
    modules: ["node_modules", src],
    extensions: [".ts", ".tsx"],
  },
  plugins: [],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [tsLoader],
      },
    ],
  },
};
