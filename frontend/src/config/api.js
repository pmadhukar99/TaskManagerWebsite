// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const API = {
  USERS: {
    REGISTER: `${API_BASE_URL}/users/register`,
    LOGIN: `${API_BASE_URL}/users/login`,
    GET_ALL: `${API_BASE_URL}/users`,
    GET_BY_ID: (id) => `${API_BASE_URL}/users/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/users/${id}`,
    DELETE: (id) => `${API_BASE_URL}/users/${id}`
  },
  TASKS: {
    CREATE: `${API_BASE_URL}/tasks`,
    GET_ALL: `${API_BASE_URL}/tasks`,
    GET_INCOMPLETE: `${API_BASE_URL}/tasks/incomplete`,
    GET_BY_ID: (id) => `${API_BASE_URL}/tasks/${id}`,
    GET_USER_TASKS: (userId) => `${API_BASE_URL}/tasks/user/${userId}`,
    UPDATE: (id) => `${API_BASE_URL}/tasks/${id}`,
    DELETE: (id) => `${API_BASE_URL}/tasks/${id}`,
    ASSIGN: (id) => `${API_BASE_URL}/tasks/${id}/assign`
  }
};

export default API;
