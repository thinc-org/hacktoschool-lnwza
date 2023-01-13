import { getAuth } from "firebase/auth";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";
import PopularCourseSlider from "../components/popularCourseSlider";
import ICourse from "../interfaces/ICourse";
import IUser from "../interfaces/IUser";
import { firebaseApp } from "./_app";

const Home: NextPage<{ user: IUser; courses: ICourse[] }> = ({
  user,
  courses,
}) => {
  return (
    <>
      {/* @ts-expect-error */}
      <Header user={user} />
      <div className="w-screen flex flex-col">
        <div className="w-full bg-gt-grey-light h-fit flex justify-center">
          <div className="flex w-full max-w-7xl py-10 text-center bg-gt-grey-light overflow-x-visible flex-col items-center xl:flex-row xl:items-start xl:text-left">
            <div className="flex flex-col w-full px-3 items-center xl:items-start md:px-5">
              <h4 className="text-gt-cyan-dark uppercase tracking-widest font-bold text-b4 mb-2 xl:text-b2 xl:mb-6">
                E-Course Platform
              </h4>
              <h1 className="text-h3 font-header tracking-tight mb-3 xl:text-h1 xl:mb-8">
                Learning and teaching online, made easy.
              </h1>
              <p className="font-semibold text-gt-grey-dark text-b3 tracking-tight mb-5 xl:text-b1 xl:mb-8 xl:w-3/4">
                Gain subject certification or earn money while teaching online
                with GlobalTalk.
              </p>
              <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <button className="cursor-pointer text-gt-cyan-dark bg-gt-cyan-light py-3 px-5 rounded-full font-bold tracking-tight text-b3 w-fit h-fit mb-5 xl:mb-8 hover:bg-gt-cyan-dark hover:text-white duration-500">
                  Learn more →
                </button>
              </Link>
              <div className="flex w-72 justify-between xl:w-3/5">
                <div>
                  <h1 className="font-header text-h4 xl:text-h3 tracking-tight flex items-center justify-center mb-1">
                    <Image
                      src="/img/bolt.svg"
                      alt="bolt"
                      className="inline-block w-4 h-5"
                      width="12"
                      height="16"
                    />{" "}
                    700
                    <span className="text-gt-cyan-dark">+</span>
                  </h1>
                  <p className="text-gt-grey-dark font-semibold tracking-tight text-b4 xl:text-b3 text-center">
                    Hours of Contents
                  </p>
                </div>
                <i className="border-l-[1px] border-gt-grey-medium flex w-0 h-4/5 m-auto pt-10"></i>
                <div>
                  <h1 className="font-header text-h4 xl:text-h3 tracking-tight flex items-center justify-center mb-1">
                    <Image
                      src="/img/bolt.svg"
                      alt="bolt"
                      className="inline-block w-4 h-5"
                      width="12"
                      height="16"
                    />{" "}
                    575k<span className="text-gt-cyan-dark">+</span>
                  </h1>
                  <p className="text-gt-grey-dark font-semibold tracking-tight text-b4 xl:text-b3 text-center">
                    Active Users
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-11/12 max-h-min overflow-hidden relative mt-8 xl:w-[80vw] xl:overflow-visible">
              <Image
                loading="lazy"
                className="w-full md:w-3/4 relative left-1/2 -translate-x-1/3 xl:left-0 xl:translate-x-0 xl:max-w-none] xl:w-[100vw]"
                src="/img/deknoi.svg"
                alt="deknoi"
                width="0"
                height="0"
                unoptimized
              />
            </div>
          </div>
        </div>
        <PopularCourseSlider
          // @ts-expect-error
          courses={courses.sort(
            (a, b) => b.students.length - a.students.length,
          )}
        />
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

export default Home;
