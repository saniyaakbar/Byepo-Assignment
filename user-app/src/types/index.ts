export interface CheckFlagResponse {
  success: boolean;
  enabled: boolean;
  message?: string;
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
