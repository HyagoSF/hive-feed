'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion as m } from 'framer-motion';

import { FaHeart, FaHeartBroken } from 'react-icons/fa';

import { useState } from 'react';

interface Comments {
	id: string;
	createdAt: string;
	postId: string;
	userId: string;
	text: string;
	user: {
		name: string;
		image: string;
	};
}

interface PostProps {
	avatar: string;
	name: string;
	title: string;
	id: string;
	comments: Comments[];
	isInDetails?: boolean;
}

// type URL = {
// 	params: {
// 		slug: string;
// 	};
// };

export default function Post({
	avatar,
	name,
	title,
	id,
	comments,
	isInDetails,
}: PostProps) {
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);

	const initial = {
		opacity: 0,
		scale: 0.5,
	};

	const animate = {
		opacity: 1,
		scale: 1,
	};

	const duration = 0.3;

	const onLikeButtonHandler = () => {
		setIsLiked(true);
		setIsDisliked(false);
	};

	const onDislikeButtonHandler = () => {
		setIsDisliked(true);
		setIsLiked(false);
	};

	return (
		<m.div
			initial={initial}
			whileInView={animate}
			transition={{ duration: duration, ease: 'easeOut' }}
			viewport={{ once: true }}
			className="bg-white my-8 p-8 rounded-lg">
			<div className="flex items-center gap-2">
				<Image
					className="rounded-full"
					width={32}
					height={32}
					src={avatar}
					alt="avatar"
				/>
				<h3 className="font-bold text-gray-700">{name}</h3>
			</div>

			<div className="my-8">
				<p className="break-words">{title}</p>
			</div>

			{!isInDetails && (
				<div className="flex gap-6 items-center">
					<m.button
						className="cursor-pointer items-center"
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}>
						<Link href={`/post/${id}`}>
							<h4 className="text-sm text-teal-600 font-bold border-2 p-1 rounded-lg border-teal-600 hover:text-white hover:bg-teal-600">
								Comments {comments.length}
							</h4>
						</Link>
					</m.button>

					{/* button for like */}
					<m.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}>
						<FaHeart
							color={isLiked ? 'red' : 'black'}
							className={` cursor-pointer transition-all duration-200 `}
							onClick={onLikeButtonHandler}
						/>
					</m.button>

					{/* button for dislike */}
					<m.button
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9 }}>
						<FaHeartBroken
							color={isDisliked ? 'red' : 'black'}
							className={`cursor-pointer transition-all duration-200 `}
							onClick={onDislikeButtonHandler}
						/>
					</m.button>
				</div>
			)}

			{/* {comments.map((comment) => (
				<div key={comment.id} className="flex items-center gap-2 mt-4">
					<Image
						className="rounded-full"
						width={32}
						height={32}
						src={comment.user.image}
						alt="avatar"
					/>
					<p className="text-gray-700 text-sm bg-gray-300 w-full p-1 rounded-lg">
						<span className="font-bold">
							{comment.user.name}: {'  '}
						</span>
						{comment.text}{' '}
					</p>
				</div>
			))} */}
		</m.div>
	);
}
