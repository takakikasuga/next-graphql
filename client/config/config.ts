const API_URI = 'http://172.21.0.2';
const API_PORT = process.env.REACT_APP_API_PORT || '8000';
const LOCALHOST_URI = 'http://localhost';
const LOCALHOST_PORT = process.env.REACT_APP_API_PORT || '8000';
export const API_ADDRESS = `${API_URI}:${API_PORT}`;
export const LOCALHOST_ADDRESS = `${LOCALHOST_URI}:${LOCALHOST_PORT}`;
