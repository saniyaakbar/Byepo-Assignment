import axios, { AxiosInstance } from 'axios';
import { CheckFlagResponse } from '../types/index';

class UserApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
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

  async checkFeatureFlag(organizationId: string, featureKey: string): Promise<CheckFlagResponse> {
    try {
      const response = await this.client.post<CheckFlagResponse>('/feature/check', {
        organizationId,
        featureKey,
      });
      return response.data;
    } catch (error) {
      throw new Error(this.getErrorMessage(error));
    }
  }
}

const userApiClient = new UserApiClient(import.meta.env.VITE_API_URL || 'http://localhost:5000/api');

export default userApiClient;
