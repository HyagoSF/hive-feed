'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthUserPosts } from '../types/AuthUserPosts';

const fetchAllUsersPosts = async () => {
	const { data } = await axios.get('/api/posts/authUserPosts');
	return data;
};

export default function MyPosts() {
	const { data, isLoading } = useQuery<AuthUserPosts>({
		queryKey: ['authUserPosts'],
		queryFn: fetchAllUsersPosts, //The function that the query will use to request data.
	});

	return (
		<div>
			<h1 className="my-8 text-purple-700">My Posts</h1>

			{isLoading && <p>Loading...</p>}

			{data &&
				data.Post.map((post) => (
					<div key={post.id}>
						<p>{post.title}</p>
					</div>
				))}

			<h1 className="my-8 text-purple-700">My Comments</h1>
			{data?.Post.map((post) => (
				<div key={post.id}>
					{post.comments.map((comment) => (
						<div key={comment.id}>
							<p>{comment.text}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
