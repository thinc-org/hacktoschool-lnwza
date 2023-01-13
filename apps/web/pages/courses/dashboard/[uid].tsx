import { Skeleton } from "@mui/material";
import { getAuth } from "firebase/auth";
import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../../components/footer";
import Header from "../../../components/header";
import ICourse from "../../../interfaces/ICourse";
import IUser from "../../../interfaces/IUser";
import { firebaseApp } from "../../_app";

const Course: NextPage<{ user: IUser; course: ICourse }> = ({
  user,
  course,
}) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { uid } = router.query;

  useEffect(() => {
    const checkLoadingStatus = () => {
      if (course != undefined && course != null) {
        setLoading(false);
      } else {
        setTimeout(checkLoadingStatus, 500);
      }
    };
    setTimeout(checkLoadingStatus, 1000);
  }, []);

  useEffect(() => {
    if (user?.ouid != course?.instructor.ouid) {
      router.replace(`/courses/${uid}`);
    }
  }, [user]);

  return (
    <>
      {/* @ts-expect-error */}
      <Header user={user} />
      {loading ? (
        <Skeleton
          variant="rectangular"
          className="w-screen max-w-7xl mx-auto my-5 h-96"
        />
      ) : (
        <div className="w-screen flex flex-col items-center p-5 tracking-tight gap-4 md:px-15 max-w-7xl mx-auto my-5">
          <h1 className="text-h3 font-header md:text-h2">{course?.title}</h1>
          <div className="flex items-center justify-center">
            <div className="min-w-fit min-h-fit mr-1 bg-gt-cyan-dark rounded-full relative">
              <Image
                src={course?.instructor.photoURL ?? ""}
                alt="profile picture"
                className="w-8 h-8 relative top-0 left-0"
                width="32"
                height="32"
              />
            </div>
            <p className="text-b3 md:text-b1 font-semibold text-gt-grey-dark">
              {course?.instructor.name}
            </p>
          </div>
          <ul className="text-b1 tracking-tight font-semibold text-gt-grey-dark w-full flex flex-col h-96 flex-wrap">
            {course.students.map((student, index) => (
              <li key={student.ouid}>
                {index + 1}. {student.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const auth = getAuth(firebaseApp);
  const course_response = await fetch(
    `http://localhost:2000/courses/${params?.uid}`,
  );
  const course = await course_response.json();

  let user: IUser | null = null;
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
    props: { user, course },
  };
};

export default Course;
