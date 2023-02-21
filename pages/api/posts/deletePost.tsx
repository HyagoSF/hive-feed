import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// this postId is the postId of the post to be deleted
	const { postId } = req.body;
	const { session } = req.body;

	/**
	 * Check if the user who is trying to delete the post is the same user who created the post and if is the same user who is logged in
	 */
	const postToBeDeleted = await prisma.Post.findUnique({
		where: {
			idd: postId,
		},
	});

	const userWhoCreatedPost = await prisma.user.findUnique({
		where: {
			id: postToBeDeleted.userId,
		},
	});

	if (userWhoCreatedPost.email !== session?.user?.email) {
		return res.status(403).json({
			err: 'You are not authorized to delete this post',
		});
	}

	try {
		const result = await prisma.Post.delete({
			where: {
				id: postId,
			},
			include: {
				comments: true,
			},
		});
		res.status(200).json({
			message: 'Post found successfully 🔥',
			post: result.title,
		});
	} catch (err) {
		res.status(403).json({
			err: 'Something went wrong, try again later',
		});
	}
}
