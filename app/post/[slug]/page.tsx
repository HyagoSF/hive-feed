// This is the page that will be rendered when you visit /post/[slug] to see the details of a specific post.

'use client';

import AddComment from '@/app/components/AddComment';
import Post from '@/app/components/Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';

import { motion as m } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

type URL = {
	params: {
		slug: string;
	};
};

//fetch data from server
const fetchDetails = async (slug: string) => {
	const res = await axios.get(`/api/posts/${slug}`);

	console.log(res.data);
	return res.data;
};

export default function PostDetails(url: URL) {
	const { data, isLoading } = useQuery({
		queryKey: ['detail-post'],
		queryFn: () => fetchDetails(url.params.slug),
	});

	const [isInDetailsPage, setIsInDetailsPage] = useState(true);

	if (isLoading) return <div>Loading...</div>;

	const initial = {
		opacity: 0,
		scale: 0.5,
	};

	const animate = {
		opacity: 1,
		scale: 1,
	};
	const duration = 0.4;

	return (
		<div>
			<div>
				{data && (
					<>
						<Link
							href="/"
							className="ml-1 text-lg font-bold text-emerald-700 ">
							Home &gt; post
							<a className="text-emerald-800">
								{' '}
								&gt; {data.specificPost.id}{' '}
							</a>
						</Link>

						<Post
							avatar={data.specificPost.user.image}
							name={data.specificPost.user.name}
							title={data.specificPost.title}
							id={data.specificPost.id}
							comments={data.specificPost.comments}
							isInDetails={isInDetailsPage}
						/>

						{data.specificPost.comments.map((comment: any) => (
							<m.div
								key={comment.id}
								className="flex items-center gap-2 mt-4 bg-gray-100 text-base p-2 rounded-lg"
								initial={initial}
								whileInView={animate}
								transition={{ duration: duration }}
								viewport={{ once: true }}>
								<Image
									className="rounded-full"
									width={32}
									height={32}
									src={comment.user.image}
									alt="avatar"
								/>

								<div className="text-sm text-gray-700 w-full">
									<div className="flex justify-start gap-4 my-2">
										<h1 className="font-bold">
											{comment.user.name}
										</h1>
										<p>{comment.createdAt.slice(0, 10)}</p>
									</div>
									<div className="flex flex-col">
										<p className="break-words bg-gray-200 rounded-lg p-1 ">
											{comment.text}
										</p>

										{/* just show the delete comment data if there is a user logged in and the comments were created by him */}
										{comment.user.email ===
											data.specificPost.user.email &&
											data.session !== null && (
												<m.button
													whileHover={{ scale: 1.1 }}
													whileTap={{ scale: 0.9 }}
													type="button"
													className={`text-red-500 text-base hover:bg-red-500 p-1 rounded-lg hover:text-white ml-auto mt-1`}>
													Delete
												</m.button>
											)}
									</div>
								</div>
							</m.div>
						))}

						<AddComment postId={data.specificPost.id} />
					</>
				)}
			</div>
		</div>
	);
}

// data.specificPost.
/**
 {comment.user.id === user.id && (
        <button className="hover:bg-gray-400">Edit</button>
      )}
 */
