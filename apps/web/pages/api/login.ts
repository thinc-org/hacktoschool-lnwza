import { getAuth, signInWithCustomToken } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseApp } from "../_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const ticket = req.query;
  const requestHeaders: any = ticket;

  await fetch("http://localhost:2000/auth/", {
    headers: requestHeaders,
    method: "GET",
  }).then(async (firebaseCustomToken) => {
    const token = (await firebaseCustomToken.json())["custom_token"];

    const auth = getAuth(firebaseApp);
    await signInWithCustomToken(auth, token);
  });
  res.status(200).redirect("http://localhost:3000");
}
