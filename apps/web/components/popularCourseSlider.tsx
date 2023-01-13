import type { NextComponentType } from "next";
import Image from "next/image";
import Link from "next/link";

const PopularCourseSlider: NextComponentType = () => {
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
          className="w-full overflow-x-scroll flex scroll-smooth gap-8 p-3 whitespace-nowrap md:mx-5"
        >
          {new Array(10).fill(0).map((_, index) => (
            <Link href={`courses/${index}`} key={index}>
              <div className="w-60 h-56 shadow-lg tracking-tight rounded-xl flex flex-col">
                <Image
                  alt="card image"
                  src="/img/card-img-1.png"
                  className="w-full h-1/2 object-cover rounded-t-xl"
                  width="280"
                  height="96"
                  loading="lazy"
                />
                <div className="px-8 w-full flex text=center items-center h-1/2">
                  <h4 className="font-header text-b1 text-ellipsis overflow-hidden">
                    Course&apos;s name
                  </h4>
                </div>
              </div>
            </Link>
          ))}
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
