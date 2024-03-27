import path, { dirname } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './renderer/index.mjs', // Entry point of the application
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output bundle filename
  },
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx)$/, // Match JavaScript and JSX files
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript/JSX
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
          },
        },
      },
      {
        test: /\.css$/, // Match CSS files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './renderer/index.html', // Path to HTML template
      filename: 'index.html', // Output HTML filename
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'], // Automatically resolve .js and .jsx extensions
  },
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'dist'), // Serve content from dist directory
  //   compress: true, // Enable gzip compression
  //   port: 9000, // Port number
  // },
};