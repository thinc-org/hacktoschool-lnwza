import { getAuth } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseApp } from "../_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const uid = req.body.replaceAll('"', "");

  const auth = getAuth(firebaseApp);
  await auth.currentUser
    ?.getIdToken()
    .then((idToken) =>
      fetch(`http://localhost:2000/courses/${uid}`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        method: "POST",
      }),
    )
    .then(() => res.status(200).send("Enrolled!"));
}
