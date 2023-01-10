import type { NextPage } from 'next';
import Image from 'next/image';

const Home: NextPage = () => {
	return (
		<div className="flex flex-col">
			<div className="flex justify-center w-full m-auto h-[700px] bg-gt-grey-light px-80 md:flex-col lg:flex-row">
				<div className="flex flex-col w-2/5 mt-10">
					<h4 className="font-bold text-gt-cyan-dark font-body mb-6">
						E-Course Platform
					</h4>
					<h1 className="font-header text-h1 mb-7 tracking-tight">
						Learning and teaching online, made easy.
					</h1>
					<p className="font-body text-b1 w-5/6 mb-8 tracking-tight font-semibold text-gt-grey-dark">
						Practice your English and learn new things with the platform.
					</p>
					<button className="bg-gt-cyan-light text-gt-cyan-dark rounded-full fonr-bold w-40 h-10 mb-12 tracking-tight">
						About Platform
					</button>
					<div className="flex w-5/6">
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
							<p className="text-b2 font-body font-semibold text-gt-grey-dark tracking-tight">
								Popular words
							</p>
						</div>
						<div className="bg-gt-grey-light w-0.5 h-3/4 m-auto"></div>
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
							<p className="text-b2 font-body font-semibold text-gt-grey-dark tracking-tight">
								Mini-games
							</p>
						</div>
					</div>
				</div>
				<div className="w-3/5 relative mt-10">
					<Image
						className="z-0 absolute w-fit h-fit top-44"
						src="/img/image6.svg"
						alt=""
						width="0"
						height="0"
					/>
					<Image
						className="z-10 absolute w-fit h-fit left-9"
						src="/img/casual-life-3d-boy-sitting-at-the-desk-with-open-book9.svg"
						alt=""
						width="0"
						height="0"
					/>
					<Image
						className="z-20 absolute w-fit h-fit left-80 top-8"
						src="/img/image12.svg"
						alt=""
						width="0"
						height="0"
					/>
				</div>
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
					<p className="font-semibold font-body text-b1 text-gt-grey-dark tracking-tight">
						Make learning words more fun with mini-games
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
