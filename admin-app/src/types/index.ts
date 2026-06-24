// User and Auth types
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'superadmin';
  organizationId: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface SignupPayload {
  email: string;
  password: string;
  organizationId: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

// Feature Flag types
export interface FeatureFlag {
  _id: string;
  key: string;
  enabled: boolean;
  organizationId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeatureFlagResponse {
  success: boolean;
  count?: number;
  data: FeatureFlag | FeatureFlag[];
}

export interface CreateFlagPayload {
  key: string;
  enabled?: boolean;
}

export interface UpdateFlagPayload {
  enabled: boolean;
}

// API Error Response
export interface ApiErrorResponse {
  success: false;
  message: string;
}

// Utility type for extracting error message
export interface ErrorWithResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}
