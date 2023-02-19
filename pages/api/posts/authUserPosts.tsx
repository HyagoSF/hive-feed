import { NextApiRequest, NextApiResponse } from 'next';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
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

		// const prismaUser = await prisma.user.findUnique({
		// 	where: {
		// 		email: session?.user?.email,
		// 	},
		// });

		// console.log(prismaUser);

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

		// const posts = await prisma.post.findMany({
		// 	where: {
		// 		userId: prismaUser.id,
		// 	},
		// 	include: {
		// 		user: true,
		// 		comments: true,
		// 	},
		// });

		// const comments = await prisma.comment.findMany({
		// 	where: {
		// 		userId: prismaUser.id,
		// 	},
		// 	include: {
		// 		user: true,
		// 		post: true,
		// 	},
		// });

		// res.status(200).json({
		// 	posts: posts,
		// 	comments: comments,
		// });
	}

	// res.status(200).json({});
}
