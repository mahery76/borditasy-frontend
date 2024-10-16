export interface User {
  id?: number;
  username: string;
  password: string;
}

export interface VerifyTokenResponse {
  valid: boolean;
  user_id: number;
  username: string;
  is_superuser: boolean;
}
