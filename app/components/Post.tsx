'use client';

import Image from 'next/image';
import Link from 'next/link';

// interface Post {
// 	avatar: string;
// 	name: string;
// 	title: string;
// }

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

export default function Post({
	avatar,
	name,
	title,
	id,
	comments,
}: {
	avatar: string;
	name: string;
	title: string;
	id: string;
	comments: Comments[];
}) {
	return (
		<div className="bg-white my-8 p-8 rounded-lg">
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

			<div className="flex gap-4 cursor-pointer items-center">
				<Link href={`/post/${id}`}>
					<h4 className="text-sm text-teal-600 font-bold border-2 p-1 rounded-lg border-teal-600 hover:text-white hover:bg-teal-600">
						Comments {comments.length}
					</h4>
				</Link>
			</div>

			{comments.map((comment) => (
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
			))}
		</div>
	);
}
