const path = require('path');

module.exports = {
  entry: {
    main: './src/main.js', // Adjust the entry point as needed
    poly: './src/polly.js',
    script: './src/script.js',
    runtime: './src/runtime.js',
  },
  output: {
    filename: 'merged.js', // The name of the merged output file
    path: path.resolve(__dirname, 'build'), // The output directory
  },
};
