// here will be client because we are gonna use a lot of fetching and stuff
'use client';

import AddPost from './components/AddPost';

import axios, { all } from 'axios';
import { useQuery } from '@tanstack/react-query';
import Post from './components/Post';

// Adding the types for all the posts
import { PostType } from './types/Posts';

// Fetch all posts from server
const allPosts = async () => {
	const { data } = await axios.get('/api/posts/getPosts');
	return data;
};

export default function Home() {
	// Fetch all posts, and saying that the data is of an array type of PostType[]
	const { data, error, isLoading } = useQuery<PostType[]>({
		queryKey: ['posts'],
		queryFn: allPosts,
	});

	if (error) return error;

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<main>
			<AddPost />

			{/* <PostList /> */}
			{data?.map((post) => (
				<Post
					key={post.id}
					avatar={post.user.image}
					name={post.user.name}
					title={post.title}
					id={post.id}
					comments={post.comments}
				/>
			))}
		</main>
	);
}
