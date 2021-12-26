import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { setAuthCookies } from "next-firebase-auth";

import initAuth from "../../utils/initAuth";

initAuth();

const client = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    AuthUser: { id, email, displayName, photoURL },
  } = await setAuthCookies(req, res);

  if (!id || !email || !displayName || !photoURL)
    return res.status(403).send({});

  const userData = { id, email, displayName, photoURL };

  await client.user.upsert({
    where: { id: id },
    create: userData,
    update: userData,
  });

  return res.status(200).json({ status: true });
};

export default handler;
