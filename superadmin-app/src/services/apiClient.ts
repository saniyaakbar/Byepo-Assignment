import axios, { AxiosInstance } from 'axios';
import { OrgListResponse, OrgCreateResponse, LoginResponse } from '../types/index';

class SuperAdminApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle response errors globally
    this.client.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        // Handle 401 Unauthorized - clear auth state
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.clear();
        }
        return Promise.reject(error);
      }
    );
  }

  private getErrorMessage(error: unknown): string {
    // Try to extract message from backend error response
    if (axios.isAxiosError(error) && error.response?.data) {
      const data = error.response.data as Record<string, unknown>;
      if (data.message && typeof data.message === 'string' && data.message.trim()) {
        return data.message;
      }
    }
    // Return safe generic message
    return 'Something went wrong';
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      const response = await this.client.post<LoginResponse>('/org/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async createOrganization(name: string): Promise<OrgCreateResponse> {
    try {
      const response = await this.client.post<OrgCreateResponse>('/org/create', { name });
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async listOrganizations(): Promise<OrgListResponse> {
    try {
      const response = await this.client.get<OrgListResponse>('/org/list');
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }
}

const superAdminApiClient = new SuperAdminApiClient(import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

export default superAdminApiClient;
