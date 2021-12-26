import type { NextApiRequest, NextApiResponse } from "next";
import { AuthUser, verifyIdToken } from "next-firebase-auth";

const getUser = async (req: NextApiRequest): Promise<AuthUser> => {
  if (!req.headers.authorization)
    throw new Error("Authorization Header not provided");

  return await verifyIdToken(req.headers.authorization);
};

export default getUser;
