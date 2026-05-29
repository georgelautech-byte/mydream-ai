import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosInstance } from 'axios';

import { Environment } from '../config/config';

const API_URL = Environment.api_url || '';

const apiInstance = axios.create({
  baseURL: API_URL,
});

const queryClientInstance = new QueryClient();

export interface IAuthService {
  getToken: () => Promise<string | null>;
  setToken: (token: string) => Promise<void>;
  removeToken: () => Promise<void>;
}

class ApiService {
  apiUrl: string;
  api: AxiosInstance;
  queryClient: QueryClient;

  constructor(body: { apiInstance: AxiosInstance; API_URL: string; queryClient: QueryClient }) {
    this.api = body.apiInstance;
    this.apiUrl = body.API_URL;
    this.queryClient = body.queryClient;
  }

  setAuthorizationHeader(token: string) {
    this.api.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  deleteAuthorizationHeader() {
    delete this.api.defaults.headers.common.Authorization;
  }
}

const apiService = new ApiService({
  apiInstance,
  API_URL,
  queryClient: queryClientInstance,
});

const { api, apiUrl, queryClient } = apiService;

export { api, apiService, apiUrl, queryClient };
