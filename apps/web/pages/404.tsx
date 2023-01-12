import Link from 'next/link';

const FourOhFour = () => {
	return (
		<div className="w-screen h-screen flex justify-center items-center flex-col gap-8">
			<h1 className="text-h4 tracking-tight font-semibold">
				404 - Page Not Found
			</h1>
			<Link
				href="/"
				className="text-b1 font-semibold tracking-tight text-gt-green"
			>
				Go back home
			</Link>
		</div>
	);
};
export default FourOhFour;
