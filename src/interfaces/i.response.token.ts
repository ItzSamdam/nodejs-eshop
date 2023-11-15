export interface IResponseToken {
  accessToken: string;
  refreshToken: string;
  refreshTokenExpiresIn: number; // in days
  accessTokenExpiresIn: number; // in hours
}

