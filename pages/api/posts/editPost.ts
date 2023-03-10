// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth].js';

import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const session = await getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({
				message: 'You must be logged in.',
			});
		}

		const title: string = req.body.title;
		const postId: string = req.body.post.id;

		// Validations for the title
		if (title.length > 350) {
			return res.status(403).json({
				message: 'Title is too long, write less than 350 characters',
			});
		}
		if (title.length === 0) {
			return res
				.status(403)
				.json({ message: 'Title is empty, write something' });
		}

		try {
			// Here is where you can add the post to the database
			const result = await prisma.post.update({
				where: {
					id: postId,
					// email: session?.user?.email,
				},
				data: {
					title: title,
				},
			});

			res.status(200).json({
				message: 'Post added successfully 🔥',
				post: result,
			});
		} catch (err) {
			res.status(403).json({
				err: 'Something went wrong, try again later',
			});
		}
	}
}
