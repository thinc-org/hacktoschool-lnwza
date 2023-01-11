import Image from 'next/image';

export default function Footer() {
	return (
		<footer className="w-full lg:h-40 bg-gt-grey-light px-[20%] h-fit md:px-[10%] sm:px-[10%]">
			<div className="flex lg:justify-between py-5">
				<ul className="gap-8 md:flex-col md:gap-4 sm:flex-col sm:gap-4 lg:flex lg:flex-row md:pr-[50%] sm:pr-[50%] lg:pl-0 md:pl-5">
					<li className="pb-4 lg:pb-0">Home</li>
					<li className="pb-4 lg:pb-0">Textbook</li>
					<li className="pb-4 lg:pb-0">Statistics</li>
					<li className="pb-4 lg:pb-0">Sprint</li>
					<li>Audio-call</li>
				</ul>
				<ul className="gap-8 md:flex-col sm:flex-col lg:flex lg:flex-row md:gap-4 sm:gap-4">
					<li className="pb-4 lg:pb-0">Cleverse</li>
					<li>Thinc.</li>
				</ul>
			</div>
			<hr />
			<div className="lg:flex py-7 font-body text-gt-grey-dark md:flex-col md:gap-4 sm:flex-col sm:gap-4 lg:flex-row lg:justify-between">
				<ul className="flex gap-8 md:justify-center md:w-full lg:w-fit md:pb-6 sm:justify-center sm:w-full sm:pb-6">
					<Image
						alt=""
						src="/img/Vector.svg"
						className="sm:w-[10%] md:w-[6%] lg:w-6"
						width="0"
						height="0"
					/>
					<Image
						alt=""
						src="/img/GT.svg"
						className="sm:w-[10%] md:w-[6%] lg:w-6"
						width="0"
						height="0"
					/>
					<Image
						alt=""
						src="/img/youtube.svg"
						className="sm:w-[10%] md:w-[6%] lg:w-6"
						width="0"
						height="0"
					/>
				</ul>
				<p className="flex md:justify-center md:w-full sm:justify-center sm:w-full lg:w-fit">
					&#169;2021 GlobalTalk. Project for{' '}
					<span className="underline">GlobalTalk.</span>
				</p>
			</div>
		</footer>
	);
}
