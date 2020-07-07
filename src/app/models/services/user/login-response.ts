export interface LoginResponse {
  accessToken: string;
  expiresIn: string;
  tokenType: string;
  refreshToken: string;
  scope: string;
}
