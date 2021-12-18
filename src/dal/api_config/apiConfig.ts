import axios from 'axios';

export const apiConfig = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': 'b7b7629a-058d-4df6-866c-6165a8a8aade',
  },
});
