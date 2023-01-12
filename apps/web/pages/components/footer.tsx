import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="w-full bg-gt-grey-light h-fit py-10 font-semibold text-gt-grey-dark">
			<div className="w-full max-w-4xl m-auto flex flex-col gap-4 px-5 md:px-15">
				<div className="flex text-b3 w-full m-auto md:justify-between">
					<ul className="gap-4 flex flex-col flex-1 md:flex-row md:flex-none">
						<li>Home</li>
						<li>Textbook</li>
						<li>Statistics</li>
						<li>Sprint</li>
						<li>Audio-call</li>
					</ul>
					<ul className="gap-4 flex flex-col flex-1 md:flex-row md:justify-end md:flex-none">
						<li>Cleverse</li>
						<li>Thinc.</li>
					</ul>
				</div>
				<hr className="bg-gt-grey-light border-t-2 w-full" />
				<div className="flex flex-col">
					<ul className="flex gap-8 justify-center w-full pb-6">
						<li>
							<Image
								alt=""
								src="/img/Vector.svg"
								className="w-8 h-8"
								width="0"
								height="0"
							/>
						</li>
						<li>
							<Image
								alt=""
								src="/img/GT.svg"
								className="w-8 h-8"
								width="0"
								height="0"
							/>
						</li>
						<li>
							<Image
								alt=""
								src="/img/youtube.svg"
								className="w-8 h-8"
								width="0"
								height="0"
							/>
						</li>
					</ul>
					<p className="w-full text-center text-b4">
						&#169;2021 GlobalTalk. Project for{' '}
						<span className="underline">GlobalTalk.</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
