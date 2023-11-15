import express, {
  Application,
  Request,
  Response,
  urlencoded,
  json,
} from "express";
import cors from "cors";
import helmet from "helmet";
import routesConfigs from "./routes/route";
import errorHandler from "./middleware/errorHandler";
import { logger } from "./utils/logger.utils";
import { RoutePrefix, config } from "./config/config.config";
import bodyParser from "body-parser";
import session from "express-session";
import NotFoundException from "./exceptions/NotFoundException";
import passport from "passport";
import httpStatus from "http-status";
import rateLimiterMiddleware from "./middleware/rateLimiter";

const app: Application = express();

app.use(rateLimiterMiddleware);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(json());
app.use(helmet());
// Set up session and passport middleware
app.use(
  session({
    secret: config.jwt.access_token.secret,
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get(`/healthCheck`, async (req: Request, res: Response) => {
  return res.status(httpStatus.OK).json({
    status: "success",
    statusCode: httpStatus.OK,
    message: "Node JS Eshop API is running",
  });
});

routesConfigs.forEach((routeConfig) => new routeConfig(app));

const port = config.port || 3000;
const env = config.env || "development";


app.listen(port, async () => {
  logger.info(`server running on port ${port}`);
  logger.info(`server running on ${env} environment`);
});

app.use("*", () => {
  throw new NotFoundException();
});

app.use(errorHandler);
