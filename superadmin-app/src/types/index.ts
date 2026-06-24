export interface Organization {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrgListResponse {
  success: boolean;
  count: number;
  data: Organization[];
}

export interface OrgCreateResponse {
  success: boolean;
  data: Organization;
}

export interface LoginResponse {
  success: boolean;
  token: string;
}

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
