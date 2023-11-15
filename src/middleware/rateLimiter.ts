import express from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import httpStatus from "http-status";

const rateLimiter = new RateLimiterMemory({
  points: 5, // 5 requests
  duration: 1, // per 1 second by IP
})

const rateLimiterMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  let ip = req.ip;
  if(!ip){
    return res.status(httpStatus.NOT_ACCEPTABLE).json({ statusCode: httpStatus.NOT_ACCEPTABLE, status: "error", message: "No IP on Request", errors: "No IP on Request"})
  }

  rateLimiter.consume(ip)
    .then(() => {
      next()
    })
    .catch(() => {
      return res.status(httpStatus.TOO_MANY_REQUESTS).json({ statusCode: httpStatus.TOO_MANY_REQUESTS, status: "error", message: "Too many requests", errors: "Too many requests"})
    });
}

export default rateLimiterMiddleware;
