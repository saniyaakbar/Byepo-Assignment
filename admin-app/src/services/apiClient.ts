import axios, { AxiosInstance } from 'axios';
import { AuthResponse, SignupPayload, LoginPayload, FeatureFlagResponse, CreateFlagPayload, UpdateFlagPayload } from '../types/index';

class ApiClient {
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

  // Auth endpoints
  async signup(payload: SignupPayload): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/signup', payload);
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await this.client.post<AuthResponse>('/auth/login', payload);
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  // Feature Flag endpoints
  async createFlag(payload: CreateFlagPayload): Promise<FeatureFlagResponse> {
    try {
      const response = await this.client.post<FeatureFlagResponse>('/feature/create', payload);
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async listFlags(): Promise<FeatureFlagResponse> {
    try {
      const response = await this.client.get<FeatureFlagResponse>('/feature/list');
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async toggleFlag(flagId: string, payload: UpdateFlagPayload): Promise<FeatureFlagResponse> {
    try {
      const response = await this.client.put<FeatureFlagResponse>(`/feature/${flagId}`, payload);
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }

  async deleteFlag(flagId: string): Promise<FeatureFlagResponse> {
    try {
      const response = await this.client.delete<FeatureFlagResponse>(`/feature/${flagId}`);
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }
}

const apiClient = new ApiClient(import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

export default apiClient;
