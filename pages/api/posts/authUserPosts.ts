import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth].js';
import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({
				message: 'You must be logged in.',
			});
		}

		// Get Auth Users Posts and Comments
		try {
			const data = await prisma.user.findUnique({
				where: {
					email: session?.user?.email,
				},
				include: {
					Post: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							comments: true,
						},
					},
				},
			});

			res.status(200).json(data);
		} catch (error) {
			res.status(403).json({
				message: 'Something went wrong',
			});
		}
	}
}
