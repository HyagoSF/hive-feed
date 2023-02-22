// This is the page that will be rendered when you visit /post/[slug] to see the details of a specific post.

'use client';

import AddComment from '@/app/components/AddComment';
import Post from '@/app/components/Post';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Image from 'next/image';

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

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			<div>
				{data && (
					<>
						<Post
							avatar={data.specificPost.user.image}
							name={data.specificPost.user.name}
							title={data.specificPost.title}
							id={data.specificPost.id}
							comments={data.specificPost.comments}
						/>

						{data.specificPost.comments.map((comment: any) => (
							<div
								key={comment.id}
								className="flex items-center gap-2 mt-4">
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
										<p className="break-words">
											{comment.text}
										</p>

										{/* just show the delete comment data if there is a user logged in and the comments were created by him */}
										{comment.user.email ===
											data.specificPost.user.email &&
											data.session !== null && (
												<button
													type="button"
													className={`text-xs text-red-700  font-bold border-2 p-1 rounded-lg border-red-700 hover:text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed mr-auto mt-2`}>
													Delete
												</button>
											)}
									</div>
								</div>
							</div>
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
