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
        // Ensure error has proper structure for downstream handlers
        return Promise.reject(error);
      }
    );
  }

  private getErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      // Check if response data has a message property
      const data = error.response?.data;
      if (data && typeof data === 'object' && 'message' in data) {
        const message = (data as Record<string, unknown>).message;
        if (typeof message === 'string') {
          return message;
        }
      }
    }
    return 'An error occurred';
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
