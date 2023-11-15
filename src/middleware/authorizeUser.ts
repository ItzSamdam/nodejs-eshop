import { Response, Request, NextFunction } from "express";
//authorization
const authorizeUser = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user);
    //@ts-ignore
    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        status: "failed",
        //@ts-ignore
        message: `User with ${req.user.role} role is not permitted to access this resource`,
      });
      return;
    }
    next();
  };
};

export default authorizeUser;
