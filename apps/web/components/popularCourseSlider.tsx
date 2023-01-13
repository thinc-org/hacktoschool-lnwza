import { Skeleton } from "@mui/material";
import type { NextComponentType } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const PopularCourseSlider: NextComponentType = ({ courses }) => {
  const [loading, setLoading] = useState(true);
  const skeletonAmount = 3;

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

  const slideDistance = 275;

  const slideLeft = () => {
    let slider = document.getElementById("slider");
    if (slider === null) {
      return;
    }
    slider.scrollLeft -= slideDistance;
  };

  const slideRight = () => {
    let slider = document.getElementById("slider");
    if (slider === null) {
      return;
    }
    slider.scrollLeft += slideDistance;
  };

  return (
    <div className="w-full bg-white h-fit flex flex-col gap-8 justify- py-10 px-2 md:px-5 md:min-h-[500px] max-w-5xl mx-auto">
      <h1 className="font-header text-h3 text-center mt-10 tracking-tight">
        Popular Courses
      </h1>
      <div className="relative flex w-full items-center">
        <i
          className="cursor-pointer border-r-4 border-b-4 md:border-r-6 md:border-b-6 md:p-2 border-gt-grey-dark p-1 rotate-[135deg] flex w-0 h-0 ml-2"
          onClick={slideLeft}
        ></i>
        <div
          id="slider"
          className="w-full overflow-x-scroll flex scroll-smooth gap-8 p-3 md:mx-5"
        >
          {loading ? (
            <>
              {new Array(skeletonAmount).fill(0).map((_, index) => (
                <Skeleton
                  key={index}
                  className="w-60 h-56 rounded-xl"
                  variant="rectangular"
                />
              ))}
            </>
          ) : (
            <>
              {courses.map((course, index) => (
                <Link href={`courses/${course.uid}`} key={course.uid}>
                  <div className="w-60 h-56 shadow-lg tracking-tight rounded-xl flex flex-col relative">
                    <Image
                      alt="card image"
                      src="/img/card-img-1.png"
                      className="w-full h-1/2 object-cover rounded-t-xl"
                      width="280"
                      height="96"
                      loading="lazy"
                    />
                    <div className="px-8 w-full flex flex-col text=center items-center h-1/2">
                      <h4 className="font-header text-b1 line-clamp-2">
                        {course.title}
                      </h4>
                      <p className="text-b3 text-gt-grey-dark font-semibold line-clamp-2">
                        {course.instructor.name}
                      </p>
                      <p className="absolute left-2 bottom-2 text-b3 text-gt-grey-dark font-semibold">
                        Enrolled: {course.students.length}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
        <i
          className="cursor-pointer border-r-4 border-b-4 md:border-r-6 md:border-b-6 md:p-2 border-gt-grey-dark p-1 rotate-[315deg] flex w-0 h-0 ml-2"
          onClick={slideRight}
        ></i>
      </div>
    </div>
  );
};

export default PopularCourseSlider;
