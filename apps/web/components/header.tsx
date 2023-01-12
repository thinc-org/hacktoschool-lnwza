import Image from 'next/image';
import Link from 'next/link';
import { NextComponentType } from 'next/types';
import { useState } from 'react';

const Header: NextComponentType = () => {
	const [isLogIn, setisLogIn] = useState(true);
	const [showMenu, setShowMenu] = useState(false);
	const [showLogoutPopup, setshowLogoutPopup] = useState(false);

	return (
		<nav className="sticky top-0 w-full bg-gt-grey-light z-50">
			<div className="max-w-7xl m-auto bg-gt-grey-light flex items-center justify-between px-5 min-h-fit h-20 border-b-[1px] border-b-gt-grey-medium md:justify-between py-4 md:px-15">
				<div className="w-1/3 flex justify-start md:hidden">
					<button
						className={`${
							showMenu ? 'hidden' : 'flex'
						} cursor-pointer text-xl text-center`}
						onClick={() => {
							setShowMenu(!showMenu);
						}}
					>
						&#9776;
					</button>
					<button
						className={`${
							showMenu ? 'flex' : 'hidden'
						} cursor-pointer text-xl text-center`}
						onClick={() => {
							setShowMenu(!showMenu);
						}}
					>
						X
					</button>
				</div>
				<ul className="w-1/3 flex justify-center relative text-gt-grey-dark font-semibold tracking-tight gap-8 md:w-fit">
					<li className="font-header text-black font-normal cursor-pointer">
						<Link href="/">GlobalTalk</Link>
					</li>
					<li className="hidden md:flex items-center text-gt-grey-dark font-normal">
						|
					</li>
					<li className="hidden md:flex text-black cursor-pointer">
						<Link href="/">Home</Link>
					</li>
					<li className="hidden md:flex">
						<Link href="#">Courses</Link>
					</li>
					{/* TODO: add features */}
					{/* <li className="hidden md:flex">
						<Link href="#">Feature B</Link>
					</li>
					<li className="hidden md:flex items-center">
						<Link href="/">Feature C </Link>
						<i className="border-r-2 border-b-2 border-gt-grey-dark p-0.5 rotate-45 flex w-0 h-0 ml-2"></i>
					</li> */}
				</ul>
				<ul className="w-1/3 flex justify-end md:w-fit">
					<li
						className={`${isLogIn ? 'flex' : 'hidden'} items-center relative`}
					>
						<Image
							alt="profile picture"
							src="/img/profile.svg"
							className="w-8 h-8 mr-1"
							width="0"
							height="0"
						/>
						<span className="mr-2 text-gt-grey-dark font-semibold">Alex</span>
						<i
							className="border-r-2 border-b-2 border-gt-grey-dark p-0.5 rotate-45 flex cursor-pointer md:hidden"
							onClick={() => setshowLogoutPopup(!showLogoutPopup)}
						></i>
						<ul
							className={`${
								showLogoutPopup ? 'flex' : 'hidden'
							} absolute right-0 top-8 w-32 px-2 h-fit py-2 bg-white border items-center pl-2 z-50`}
						>
							<li
								className={`flex items-center font-bold text-black py-2 cursor-pointer`}
								onClick={() => {
									setisLogIn(false);
									setshowLogoutPopup(false);
								}}
							>
								Sign Out →
							</li>
						</ul>
					</li>
					<li
						className={`${
							isLogIn ? 'md:flex' : ''
						} hidden items-center text-black py-2 font-semibold text-b2 cursor-pointer`}
						onClick={() => setisLogIn(false)}
					>
						Sign Out →
					</li>
					<li
						className={`${
							isLogIn ? 'hidden' : 'flex'
						} items-center font-bold text-black text-bt2 py-2 cursor-pointer hover:text-gt-cyan-dark hover:underline duration-500`}
					>
						<Link href="http://localhost:2000/auth/login">Log in →</Link>
					</li>
					<li className={`${isLogIn ? '' : 'md:flex'} hidden items-center`}>
						<button className="ml-2 py-2 px-4 bg-gt-cyan-dark rounded-2xl text-white text-bt2 font-bold cursor-pointer hover:bg-white hover:text-gt-cyan-dark border-gt-cyan-dark border-4 duration-500">
							Sign up
						</button>
					</li>
				</ul>
			</div>
			<div
				className={`${
					showMenu ? 'flex' : 'hidden'
				} absolute z-40 h-[calc(100vh-4.11rem)] w-full bg-gt-grey-light justify-center items-center animate-open-menu origin-top`}
			>
				<ul className="flex flex-col text-center gap-8 font-semibold text-b2">
					<li className="text-gt-cyan-dark">
						<Link href="/" onClick={() => setShowMenu(false)}>
							Home
						</Link>
					</li>
					<li>
						<Link href="#" onClick={() => setShowMenu(false)}>
							Courses
						</Link>
					</li>
					{/* TODO: add features */}
					{/* <li>
						<Link href="#" onClick={() => setShowMenu(false)}>
							Feature B
						</Link>
					</li>
					<li>
						<Link href="#" onClick={() => setShowMenu(false)}>
							Feature C1
						</Link>
					</li>
					<li>
						<Link href="#" onClick={() => setShowMenu(false)}>
							Feature C2
						</Link>
					</li> */}
				</ul>
			</div>
		</nav>
	);
};

export default Header;
