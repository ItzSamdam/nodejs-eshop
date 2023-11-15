import * as Joi from "joi";
/**
 * @description This is the configuration file for the application
 *
 */

import "dotenv/config";

const envValidation = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid("production", "development", "test").required(),
    PORT: Joi.number().default(3000),

    ACCESS_TOKEN_SECRET: Joi.string().min(8).required(),
    ACCESS_TOKEN_EXPIRE: Joi.string().required().default("20m"),

    REFRESH_TOKEN_SECRET: Joi.string().min(8).required(),
    REFRESH_TOKEN_EXPIRE: Joi.string().required().default("1d"),

    REFRESH_TOKEN_COOKIE_NAME: Joi.string().required().default("jid"),

    LOG_FOLDER: Joi.string().required(),
    LOG_FILE: Joi.string().required(),
    LOG_LEVEL: Joi.string().required(),

    SMTP_HOST: Joi.string().required(),
    SMTP_PORT: Joi.string().default("587"),
    SMTP_USERNAME: Joi.string().required(),
    SMTP_PASSWORD: Joi.string().required(),
    EMAIL_FROM: Joi.string().email().required(),
    EMAIL_NAME: Joi.string().email().required(),

    CLOUDINARY_NAME: Joi.string().required(),
    CLOUDINARY_API_KEY:  Joi.string().required(),
    CLOUDINARY_SECRET_KEY: Joi.string().required(),

    APP_NAME: Joi.string().required().default("SMS V1"),
    APP_URL: Joi.string().allow(""),


    DEFAULT_USER_PASSWORD: Joi.string().required().default("passwordReset123")


  })
  .unknown();

const { value: envVar, error } = envValidation
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const config = {
  env: envVar.NODE_ENV,
  port: envVar.PORT,
  jwt: {
    access_token: {
      secret: envVar.ACCESS_TOKEN_SECRET,
      expire: envVar.ACCESS_TOKEN_EXPIRE
    },
    refresh_token: {
      secret: envVar.REFRESH_TOKEN_SECRET,
      expire: envVar.REFRESH_TOKEN_EXPIRE,
      cookie_name: envVar.REFRESH_TOKEN_COOKIE_NAME
    }
  },
  logConfig: {
    logFolder: envVar.LOG_FOLDER,
    logFile: envVar.LOG_FILE,
    logLevel: envVar.LOG_LEVEL,
  },
  email: {
    smtp: {
      host: envVar.SMTP_HOST,
      port: envVar.SMTP_PORT,
      auth: {
        username: envVar.SMTP_USERNAME,
        password: envVar.SMTP_PASSWORD
      }
    },
    from: envVar.EMAIL_FROM,
    emailName: envVar.EMAIL_NAME
  },
  cloudinary: {
    name: envVar.CLOUDINARY_NAME,
    apiKey: envVar.CLOUDINARY_API_KEY,
    secretKey: envVar.CLOUDINARY_SECRET_KEY
  },
  app: {
    appName: envVar.APP_NAME,
    appUrl: envVar.APP_URL,
    defaultPass: envVar.DEFAULT_USER_PASSWORD
  }
};


export const RoutePrefix = "/core-api/v1";
export const StudentPrefix = "/student-api/v1";
export const TeacherPrefix = "/teacher-api/v1";
export const defaultImage = "https://www.pngkey.com/png/full/115-1150152_default-profile-picture-avatar-png-green.png";
