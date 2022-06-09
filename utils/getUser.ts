import type { NextApiRequest } from "next";
import jwtDecode from "jwt-decode";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const getUser = async (req: NextApiRequest) => {
  if (!req.headers.authorization)
    throw new Error("Authorization Header not provided");

  const decoded = jwtDecode(req.headers.authorization) as any;
  const { user_id, email, name, picture } = decoded;
  const userData = { id: user_id, email, displayName: name, photoURL: picture };

  await client.user.upsert({
    where: { id: user_id },
    create: userData,
    update: userData,
  });

  return userData;
};

export default getUser;
