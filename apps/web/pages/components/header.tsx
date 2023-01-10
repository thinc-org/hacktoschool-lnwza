import Image from 'next/image';

export default function Header() {
	return (
		<nav className="flex w-full h-20 bg-gt-grey-light items-center border-b-2 border-b-gt-grey-medium px-80 justify-between">
			<ul className="flex items-center gap-7 justify-start">
				<li className="text-h4 font-header tracking-tight">GlobalTalk</li>
				<li className="text-b2 text-gt-grey-medium">|</li>
				<li className="text-b2 font-body font-semibold text-black tracking-tight">
					Home
				</li>
				<li className="text-b2 font-body font-semibold text-gt-grey-dark tracking-tight">
					TextBook
				</li>
				<li className="text-b2 font-body font-semibold text-gt-grey-dark tracking-tight">
					Statistics
				</li>
				<li className="text-b2 font-body font-semibold text-gt-grey-dark tracking-tight">
					Games{' '}
					<i className="border-r-2 border-b-2 border-gt-grey-dark p-0.5 rotate-45 inline-block -translate-y-0.5"></i>
				</li>
			</ul>
			<ul className="flex items-center gap-7 justify-end">
				<li className="flex flex-row items-center gap-2">
					<Image
						alt=""
						src="/img/profile.svg"
						className="w-10 h-10"
						width="0"
						height="0"
					/>
					<span className="text-b2 font-semibold tracking-tight text-gt-grey-dark">
						Alex
					</span>
				</li>
				<li className="text-bt2 font-bold tracking-tight">Sign Out →</li>
			</ul>
		</nav>
	);
}
