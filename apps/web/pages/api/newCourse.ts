import { getAuth } from "firebase/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { firebaseApp } from "../_app";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const bodyInit: any = {
    title: req.body.title,
    description: req.body.description,
  };

  const auth = getAuth(firebaseApp);
  await auth.currentUser
    ?.getIdToken()
    .then((idToken) =>
      fetch(`http://localhost:2000/courses`, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(bodyInit),
        method: "POST",
      }),
    )
    .then(() => res.status(200).send("Created!"));
}
