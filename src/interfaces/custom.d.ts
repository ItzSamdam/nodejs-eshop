// express-extensions.d.ts
declare namespace Express {
  interface Request {
    // @ts-ignore
    admin: {
      id: string;
    };
    user: {
      id: string;
    };
  }
}
