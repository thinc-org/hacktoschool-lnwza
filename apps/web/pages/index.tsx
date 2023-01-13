import type { GetServerSideProps, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { getAuth } from 'firebase/auth';
import { firebaseApp } from './_app';

const Home: NextPage<{ user: any }> = ({ user }) => {
	return (
		<div className="flex flex-col">
			<div className="flex justify-center w-full m-auto h-[700px] bg-gt-grey-light px-[20%] overflow-x-hidden md:flex-col lg:flex-row">
				<div className="flex flex-col w-3/5 mt-10">
					<h4 className="font-bold text-gt-cyan-dark mb-6">
						E-Course Platform
					</h4>
					<h1 className="font-header text-h1 mb-7 tracking-tight">
						Learning and teaching online, made easy.
					</h1>
					<p className="text-b1 w-5/6 mb-8 tracking-tight font-semibold text-gt-grey-dark">
						Practice your English and learn new things with the platform.
					</p>
					<button className="bg-gt-cyan-light text-gt-cyan-dark rounded-full fonr-bold w-40 h-10 mb-12 tracking-tight">
						About Platform
					</button>
					<div className="flex w-2/3">
						<div className="flex justify-center items-center flex-col">
							<h1 className="font-bold font-header text-4xl flex items-center tracking-tight">
								<Image
									src="/img/bolt.svg"
									alt=""
									className="w-fit h-fit mr-2.5"
									width="0"
									height="0"
								/>{' '}
								600
								<span className="text-gt-cyan-dark">+</span>
							</h1>
							<p className="text-b2 font-semibold text-gt-grey-dark tracking-tight">
								Popular words
							</p>
						</div>
						<div className="bg-gt-grey-medium w-0.5 h-3/4 m-auto"></div>
						<div className="flex justify-center items-center flex-col">
							<h1 className="font-bold font-header text-4xl flex items-center tracking-tight">
								<Image
									src="/img/controller.svg"
									alt=""
									className="w-fit h-fit mr-2.5"
									width="0"
									height="0"
								/>{' '}
								2<span className="text-gt-cyan-dark">+</span>
							</h1>
							<p className="text-b2 font-semibold text-gt-grey-dark tracking-tight">
								Mini-games
							</p>
						</div>
					</div>
				</div>
				<Image
					className="max-w-fit max-h-fit h-1/2 w-1/2 mt-10 mb-30"
					src="/img/deknoi.svg"
					alt="deknoi"
					width="0"
					height="0"
				/>
			</div>
			<div className="h-[600px] w-full bg-white flex px-80 items-center gap-32">
				<Image
					className="w-[580px] h-[445px]"
					src="/img/image8.svg"
					alt=""
					width="0"
					height="0"
				/>
				<div>
					<h2 className="text-h2 font-header mb-7 tracking-tight">
						Learn a language in a playful way
					</h2>
					<p className="font-semibold text-b1 text-gt-grey-dark tracking-tight">
						Make learning words more fun with mini-games
					</p>
				</div>
			</div>
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async () => {
	let user = null;

	try {
		const auth = getAuth(firebaseApp);
		await auth.currentUser?.getIdToken().then(async (idToken) => {
			await fetch('http://localhost:2000/users', {
				headers: {
					'Content-type': 'application/json',
					Authorization: `Bearer ${idToken}`,
				},
				method: 'GET',
			}).then(async (response) => (user = await response.json()));
		});
	} catch {}
	return {
		props: { user },
	};
};

export default Home;
