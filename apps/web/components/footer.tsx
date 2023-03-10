import type { NextComponentType } from "next";
import Image from "next/image";
import Link from "next/link";

const Footer: NextComponentType = () => {
  return (
    <footer className="w-full bg-gt-grey-light h-fit py-10 font-semibold text-gt-grey-dark">
      <div className="w-full max-w-7xl m-auto flex flex-col gap-4 px-5 md:px-15">
        <div className="flex text-b3 w-full m-auto md:justify-between">
          <ul className="gap-4 flex flex-col flex-1 md:flex-row md:flex-none">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/courses">Courses</Link>
            </li>
          </ul>
          <ul className="gap-4 flex flex-col flex-1 md:flex-row md:justify-end md:flex-none">
            <li>
              <Link
                href="https://cleverse.com/"
                target={"_blank"}
                className="flex gap-1"
              >
                <Image
                  alt="cleverse logo"
                  src="/img/cleverse.svg"
                  className="w-6 h-6 fill-gt-grey-dark"
                  width="24"
                  height="24"
                />
                Cleverse
              </Link>
            </li>
            <li>
              <Link
                href="https://thinc.in.th/"
                target={"_blank"}
                className="flex gap-2"
              >
                <Image
                  alt="thinc logo"
                  src="/img/thinc.jpeg"
                  className="w-6 h-6"
                  width="24"
                  height="24"
                />
                Thinc.
              </Link>
            </li>
          </ul>
        </div>
        <hr className="bg-gt-grey-medium h-[1px] w-full" />
        <div className="flex flex-col">
          <ul className="flex gap-8 justify-center w-full pb-6">
            <li>
              <Link
                href="https://github.com/thinc-org/hacktoschool-lnwza"
                target={"_blank"}
              >
                <Image
                  alt="github logo"
                  src="/img/github.svg"
                  className="w-8 h-8"
                  width="32"
                  height="32"
                />
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <Image
                  alt="globaltalk logo"
                  src="/img/GT.svg"
                  className="w-8 h-8"
                  width="32"
                  height="32"
                />
              </Link>
            </li>
            <li>
              <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                <Image
                  alt="youtube logo"
                  src="/img/youtube.svg"
                  className="w-8 h-8"
                  width="32"
                  height="32"
                />
              </Link>
            </li>
          </ul>
          <p className="w-full text-center text-b4">
            &#169;2021 GlobalTalk. Project for{" "}
            <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
              <span className="underline">GlobalTalk.</span>
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
