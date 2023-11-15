//@ts-ignore
import jwt from "jsonwebtoken";
import { config } from "../../config/config.config";
import { IResponseToken } from "../../interfaces/i.response.token";

/**
 * This function generates valid access and refresh tokens
 *
 * @param {string} userId - The user id of the user that owns this jwt
 * @returns Returns an object with accessToken, refreshToken, refreshTokenExpiresIn, and accessTokenExpiresIn
 */
const generateAuthToken = (
  userId: string,
): IResponseToken => {
  const accessTokenOptions = {
    expiresIn: config.jwt.access_token.expire,
  };

  const refreshTokenOptions = {
    expiresIn: config.jwt.refresh_token.expire,
  };

  const accessToken = jwt.sign({ userId }, config.jwt.access_token.secret, accessTokenOptions);
  const refreshToken = jwt.sign({ userId }, config.jwt.refresh_token.secret, refreshTokenOptions);

  return {
    accessToken,
    refreshToken,
    refreshTokenExpiresIn: config.jwt.refresh_token.expire,
    accessTokenExpiresIn: config.jwt.access_token.expire,
  };
};

export { generateAuthToken }
