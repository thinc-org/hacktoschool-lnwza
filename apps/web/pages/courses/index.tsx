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
  const [search, setSearch] = useState("");
  const [searchCourses, setSearchCourses] = useState(courses);
  const skeletonAmount = 15;

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
          <div className="w-4/5 flex justify-center mt-10 max-w-4xl mx-auto relative">
            <input
              className="w-full h-fit p-2.5 border-2 rounded-lg"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What are you looking for..."
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  if (search === "") {
                    setSearchCourses(courses);
                    return;
                  }
                  setSearchCourses(
                    courses.filter(
                      (course) =>
                        course.title === search ||
                        course.instructor.name === search ||
                        course.description === search,
                    ),
                  );
                }
              }}
            />
            <button
              className="absolute right-5 top-[50%] -translate-y-1/2 text-h4"
              onClick={() => {
                if (search === "") {
                  setSearchCourses(courses);
                  return;
                }
                setSearchCourses(
                  courses.filter(
                    (course) =>
                      course.title === search ||
                      course.instructor.name === search ||
                      course.description === search,
                  ),
                );
              }}
            >
              🔎
            </button>
          </div>
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
                {searchCourses.map((course) => (
                  <Link href={`/courses/${course.uid}`} key={course.uid}>
                    <div className="w-72 h-96 shadow-s1 tracking-tight rounded-xl flex flex-col">
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
