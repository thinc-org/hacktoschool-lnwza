import { Skeleton } from "@mui/material";
import { getAuth } from "firebase/auth";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import ICourse from "../interfaces/ICourse";
import IUser from "../interfaces/IUser";
import { firebaseApp } from "./_app";

const Courses: NextPage<{ user: IUser; courses: ICourse[] }> = ({ user }) => {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (user?.roles != "instructor") {
      router.replace("/");
    }
  }, [user]);

  return (
    <>
      {/* @ts-expect-error */}
      <Header user={user} />
      <div className="w-screen flex flex-col py-8 gap-10">
        <h1 className="font-header text-h3 text-center tracking-tight">
          New Course
        </h1>
        <div className="flex flex-col gap-8 w-full max-w-3xl px-3 md:px-15 mx-auto">
          <div className="flex flex-col font-header tracking-tight">
            <label>Course Title:</label>
            <input
              className="w-full h-fit p-2.5 border-2 rounded-lg"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              placeholder="Name your course... wisely..."
            />
          </div>
          <div className="flex flex-col trakcking-tight text-gt-grey-dark font-semibold">
            <label>Course Description:</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              rows={4}
              className="block p-2.5 w-full text-s rounded-lg border-2"
              placeholder="Write some descriptions..."
            />
          </div>
          <button
            className="bg-gt-green py-4 px-16 m-auto font-bold text-white text-b2 rounded-full w-full hover:bg-white hover:text-gt-green border-gt-green border-4 duration-500"
            onClick={async () => {
              const bodyInit: any = {
                title: courseTitle,
                description: courseDescription,
              };
              await fetch("http://localhost:3000/api/newCourse", {
                headers: {
                  "Content-type": "application/json",
                },
                body: JSON.stringify(bodyInit),
                method: "POST",
              }).then(() => router.replace(router.asPath));
            }}
          >
            Submit
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let user: IUser | null = null;

  const auth = getAuth(firebaseApp);
  await auth.currentUser?.getIdToken().then((idToken) =>
    fetch("http://localhost:2000/users", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      method: "GET",
    }).then(async (res) => (user = await res.json())),
  );

  return {
    props: { user },
  };
};

export default Courses;
