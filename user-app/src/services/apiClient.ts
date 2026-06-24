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
