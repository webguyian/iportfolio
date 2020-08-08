/* eslint-disable no-sync */
import path from 'path';
import http from 'http';
import fs from 'fs';

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
    const apiURL = `http://${this.API_HOST}:${this.API_PORT}`;

    return {
      '/api': {
        target: apiURL,
        secure: false
      }
    };
  }
};

// Create mock server
function handleRequest(request, response) {
  const method = request.method.toLowerCase();
  const mockURL = request.url.split('?')[0].replace(settings.API_REGEX, '');

  let file = path.join(settings.API_DIR, mockURL, method) + '.json';
  const fileExists = fs.existsSync(file);

  if (!fileExists) {
    const parentPath = mockURL
      .split('/')
      .slice(0, -1)
      .join('/');
    const parent = path.join(settings.API_DIR, parentPath, method) + '.json';
    const parentExists = fs.existsSync(parent);

    if (!parentExists) {
      response.writeHead(404, { 'Content-Type': 'text/html' });
      response.end(`File: ${file} not found.`);
      return false;
    } else {
      file = parent;
    }
  }

  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      response.writeHead(500, { 'Content-Type': 'text/html' });
      response.end(err);
      return false;
    }

    response.setHeader('Content-Type', 'application/json');
    response.end(data);
  });
}

const start = () => {
  http.createServer(handleRequest).listen(settings.API_PORT);
};
const appSettings = Object.assign({}, { start }, settings);

export default appSettings;
