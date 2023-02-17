'use client';

import Image from 'next/image';
import Link from 'next/link';

interface Post {
	avatar: string;
	name: string;
	title: string;
}

export default function Post({
	avatar,
	name,
	title,
	id,
}: {
	avatar: string;
	name: string;
	title: string;
	id: string;
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
				<p className="break-all">{title}</p>
			</div>

			<div className="flex gap-4 cursor-pointer items-center">
				<Link href={`/post/${id}`}>
					<h4 className="text-sm text-teal-600 font-bold border-2 p-1 rounded-lg border-teal-600 hover:text-white hover:bg-teal-600">
						Comment
					</h4>
				</Link>
			</div>
		</div>
	);
}
