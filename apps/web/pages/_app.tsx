import { Dela_Gothic_One, Montserrat } from "@next/font/google";
import { initializeApp } from "firebase/app";
import type { AppProps } from "next/app";
import Head from "next/head";
import firebaseConfig from "../firebaseConfig.json";
import "../styles/globals.css";

const delaGothicOne = Dela_Gothic_One({
  subsets: ["latin"],
  display: "auto",
  weight: "400",
  style: ["normal"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
});

export const firebaseApp = initializeApp(firebaseConfig);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>GlobalTalk</title>
        <link rel="icon" href="/img/GT.svg" />
      </Head>
      <style jsx global>
        {`
          :root {
            --font-dela-gothic-one: ${delaGothicOne.style.fontFamily};
          }

          html {
            font-family: ${montserrat.style.fontFamily};
          }
        `}
      </style>
      <Component {...pageProps} />
    </>
  );
}
