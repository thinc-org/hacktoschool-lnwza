import { Dela_Gothic_One, Montserrat } from '@next/font/google';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/globals.css';
import Footer from './components/footer';
import Header from './components/header';

const delaGothicOne = Dela_Gothic_One({
	subsets: ['latin'],
	display: 'auto',
	weight: '400',
	style: ['normal'],
});

const montserrat = Montserrat({
	subsets: ['latin'],
});

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
				<title>GlobalTalk</title>
			</Head>
			<style jsx global>
				{`
					:root {
						--font-dela-gothic-one: ${delaGothicOne.style.fontFamily};
						--font-montserrat: ${montserrat.style.fontFamily};
					}
				`}
			</style>
			<Header />
			<Component {...pageProps} />
			<Footer />
		</>
	);
}
