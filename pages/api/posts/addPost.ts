// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { unstable_getServerSession } from 'next-auth/next';
// import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth].js';

import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		// const session = await getServerSession(req, res, authOptions);
		const session = await unstable_getServerSession(req, res, authOptions);

		if (!session) {
			return res.status(401).json({
				message: 'You must be logged in.',
			});
		}

		const title: string = req.body.title;

		// Get the user id from the session
		const prismaUser = await prisma.user.findUnique({
			where: {
				email: session?.user?.email,

				// session.user?.email != null
				// 	? session.user.email
				// 	: undefined,
			},
		});

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
			const result = await prisma.post.create({
				data: {
					title: title,
					userId: prismaUser.id,
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
