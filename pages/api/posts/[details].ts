// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';

import prisma from '../../../prisma/client';
import { authOptions } from '../auth/[...nextauth].js';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const session = await getServerSession(req, res, authOptions);

	if (req.method === 'GET') {
		// Fetch all posts
		try {
			// get all posts from my db
			const specificPost = await prisma.post.findUnique({
				// include the user who created the post in the response
				where: {
					id: req.query.details,
				},
				include: {
					user: true,
					comments: {
						orderBy: {
							createdAt: 'desc',
						},
						include: {
							user: true,
						},
					},
				},
			});

			res.status(200).json({ specificPost, session });
		} catch (error) {
			res.status(403).json({ err: 'Error fetching posts' });
		}
	}
}
