import { getAuth, signOut } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseApp } from "../../_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const auth = getAuth(firebaseApp);
  await signOut(auth).then(() => res.status(200).send("LogOut!"));
}
