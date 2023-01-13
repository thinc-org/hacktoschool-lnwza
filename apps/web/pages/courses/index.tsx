import { Skeleton } from '@mui/material';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Footer from '../../components/footer';
import Header from '../../components/header';

// TODO: don't forget to remove this
const amountOfCards: Number = 5;

const Courses: NextPage = () => {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (Courses) {
			setTimeout(() => {
				setLoading(false);
			}, 3000);
		}
	}, []);

	return (
		<>
			<Header />
			<div className="w-screen flex flex-col">
				<div className="w-full bg-gt-grey-light h-fit flex flex-col">
					<h1 className="font-header text-h3 text-center mt-10 tracking-tight">
						Courses List
					</h1>
					<div className="flex flex-col w-full max-w-7xl py-10 px-2 gap-10 bg-gt-grey-light items-center md:flex-row md:justify-left md:w-[40rem] lg:w-[60rem] md:mx-auto md:flex-wrap">
						{loading ? (
							<>
								{new Array(amountOfCards).fill(0).map((_, index) => (
									<Skeleton
										key={index}
										className="w-72 h-96 rounded-xl"
										variant="rectangular"
									/>
								))}
							</>
						) : (
							<>
								{new Array(amountOfCards).fill(0).map((_, index) => (
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
											<h4 className="font-header text-h4">
												Course&apos;s name
											</h4>
											<p className="text-b4 font-semibold ">
												Instructor&apos;s name
											</p>
											<hr />
											<p className="line-clamp-6 text-b4 font-medium">
												Course&apos;s description: Lorem ipsum dolor, sit amet
												consectetur adipisicing elit. Vero, assumenda impedit
												officiis adipisci amet dolores aspernatur, qui rem quia
												totam quisquam vitae numquam iusto quasi tenetur, unde
												autem voluptatum accusamus. Mollitia laudantium a
												officiis iste quo magni vitae magnam illo ut, neque
												doloribus quidem quisquam nemo hic suscipit porro eum
												atque necessitatibus, ex labore, nulla maiores
												cupiditate quis. Pariatur, maiores? Earum corporis ad
												suscipit maxime, facere culpa eum porro vero iste alias
												aliquam! Tenetur molestias quibusdam deserunt laudantium
												corrupti reprehenderit saepe fugit vitae harum. Nulla
												perspiciatis iste magnam esse ipsa! Accusantium, rerum
												enim distinctio eveniet aspernatur harum pariatur
												dolorem officia unde expedita qui nesciunt aperiam neque
												sint ipsam a, aut, modi debitis dolore corporis cumque
												ipsum. Aliquid eaque ex quos. Officiis excepturi
												consequatur, vero nisi ratione totam eaque a nostrum
												obcaecati, eveniet animi nihil ducimus maiores quia
												delectus, reiciendis sint harum non necessitatibus!
												Ratione iusto doloribus mollitia neque corporis
												perspiciatis!
											</p>
										</div>
										<Link
											href="#" // 🪄 href that goes nowhere
											className="mx-auto mt-auto mb-5 px-5 w-full"
										>
											<button className="bg-gt-green py-2 px-4 font-bold text-white text-b2 rounded-full w-full hover:bg-white hover:text-gt-green border-gt-green border-4 duration-500">
												Enroll
											</button>
										</Link>
									</div>
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

export default Courses;
