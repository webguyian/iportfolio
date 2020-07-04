import path from 'path';

const settings = {
  APP_NAME: '',
  // Path of the application code
  // Used as root of webpack's dev server and for imports
  ROOT_DIR: path.join(__dirname, '../src'),
  // Path of mock API files
  // API server uses this as it's root
  API_DIR: path.join(__dirname, '../src/api'),
  // Path to output files to during production
  OUTPUT_DIR: path.join(__dirname, '../dist'),
  // Domain to use for webpack dev server
  HOST: 'localhost',
  // Domain to use for API server
  API_HOST: 'localhost',
  // Used with HOST to determine URL of webpack's dev server
  APP_PORT: 8000,
  // Used with HOST to determine URL of the mock API server
  API_PORT: 4001,
  // Regex applied to mock API server requests to point to correct JSON files
  // Matches are replaced with an empty string ('')
  // Example: /api/content/home/get to /content/home/get
  API_REGEX: /\/api/gi,
  // Proxy calls to webpack's dev server to the mock API server
  // Documentation: https://webpack.js.org/configuration/dev-server/#devserver-proxy
  // Example: http://localhost:9000/sdwan/api/content/home/get to http://localhost:9001/content/home/get
  API_PROXY_CONFIG: function() {
    const apiURL = `https://${this.API_HOST}:${this.API_PORT}`;

    return {
      '/api': {
        target: apiURL,
        secure: false
      }
    };
  }
};

export default settings;
