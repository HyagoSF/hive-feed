// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		// Fetch all posts
		try {
			// get all posts from my db
			const allPosts = await prisma.post.findMany({
				// include the user who created the post in the response
				include: {
					user: true,
					comments: {
						include: {
							user: true,
						},
					},
				},

				orderBy: {
					createdAt: 'desc',
				},
			});

			res.status(200).json(allPosts);
		} catch (error) {
			res.status(403).json({ err: 'Error fetching posts!' });
		}
	}
}
