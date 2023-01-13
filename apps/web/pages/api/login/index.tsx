import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const ticket = req.query;
	const requestHeaders: any = ticket;
	console.log(requestHeaders);
	const firebaseCustomToken = await fetch('http://localhost:2000/auth/', {
		headers: requestHeaders,
		method: 'GET',
	});
}
