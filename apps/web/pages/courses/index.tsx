import { Skeleton } from "@mui/material";
import { getAuth } from "firebase/auth";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "../../components/footer";
import Header from "../../components/header";
import ICourse from "../../interfaces/ICourse";
import IUser from "../../interfaces/IUser";
import { firebaseApp } from "../_app";

const Courses: NextPage<{ user: IUser; courses: ICourse[] }> = ({
  user,
  courses,
}) => {
  const [loading, setLoading] = useState(true);
  const skeletonAmount = 5;

  useEffect(() => {
    const checkLoadingStatus = () => {
      if (courses != undefined && courses != null) {
        setLoading(false);
      } else {
        setTimeout(checkLoadingStatus, 500);
      }
    };
    setTimeout(checkLoadingStatus, 1000);
  }, []);

  return (
    <>
      {/* @ts-expect-error  */}
      <Header user={user} />
      <div className="w-screen flex flex-col">
        <div className="w-full bg-gt-grey-light h-fit flex flex-col">
          <h1 className="font-header text-h3 text-center mt-10 tracking-tight">
            Courses List
          </h1>
          <div className="flex flex-col w-full max-w-7xl py-10 px-2 gap-10 bg-gt-grey-light items-center md:flex-row md:justify-left md:w-[40rem] lg:w-[60rem] md:mx-auto md:flex-wrap">
            {loading ? (
              <>
                {new Array(skeletonAmount).fill(0).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-72 h-96 rounded-xl"
                    variant="rectangular"
                  />
                ))}
              </>
            ) : (
              <>
                {courses.map((course, index) => (
                  <Link href={`/courses/${course.uid}`}>
                    <div
                      className="w-72 h-96 shadow-s1 tracking-tight rounded-xl flex flex-col"
                      key={index}
                    >
                      <Image
                        alt="card image"
                        src="/img/card-img-1.png"
                        className="w-full h-1/4 object-cover rounded-t-xl"
                        width="280"
                        height="96"
                        loading="lazy"
                      />
                      <div className="p-5 flex flex-col w-full text-ellipsis gap-2">
                        <h4 className="font-header text-b1 line-clamp-1">
                          {course.title}
                        </h4>
                        <p className="text-b4 font-semibold line-clamp-1">
                          {course.instructor.name}
                        </p>
                        <hr />
                        <p className="line-clamp-6 text-b4 font-medium">
                          {course.description}
                        </p>
                      </div>
                      <Link
                        href=""
                        className="mx-auto mt-auto mb-5 px-5 w-full"
                      >
                        <button
                          disabled={!user}
                          className="bg-gt-green py-2 px-16 m-auto font-bold text-white text-b2 rounded-full w-fit hover:bg-white hover:text-gt-green border-gt-green border-4 duration-500 disabled:text-gt-grey-dark disabled:bg-gt-grey-light disabled:border-gt-grey-dark"
                        >
                          {!user ? "Login First" : "Enroll"}
                        </button>
                      </Link>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let user: IUser | null = null;
  let courses: ICourse[] | null = null;

  const courses_response = await fetch("http://localhost:2000/courses");
  courses = await courses_response.json();

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
    props: { user, courses },
  };
};

export default Courses;
