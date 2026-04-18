const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

export default API_BASE_URL;
