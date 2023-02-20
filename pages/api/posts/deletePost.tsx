import type { NextApiRequest, NextApiResponse } from 'next';

import { useQuery } from '@tanstack/react-query';

import prisma from '../../../prisma/client';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const result = await prisma.Post.delete({
			where: {
				id: req.body.id,
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
