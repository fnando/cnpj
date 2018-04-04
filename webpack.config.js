const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
let filename;

if (process.env.NODE_ENV === "production") {
  filename = `cnpj.min.js`;
} else {
  filename = `cnpj.js`;
}

module.exports = {
  entry: `${__dirname}/src/cnpj`,
  devtool: "source-map",

  output: {
    path: `${__dirname}/dist/`,
    filename: filename,
    library: 'cnpj'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["babel-loader"],
        include: [`${__dirname}/src/`],
      }
    ]
  }
};
