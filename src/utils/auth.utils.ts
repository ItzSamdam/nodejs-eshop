import { Request } from "express";

interface Admin {
  id: string;
}

interface Teacher {
  id: string;
}

function getAdminInfo(req: Request): Admin {
  //@ts-ignore
  const { id } = req.user;
  return { id };
}


function getUserInfo(req: Request): Teacher {
  //@ts-ignore
  const { userId } = req.auth;
  let id = userId;
  return { id };
}

export { getAdminInfo, getUserInfo };
