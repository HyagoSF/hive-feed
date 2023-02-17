// here will be client because we are gonna use a lot of fetching and stuff
'use client';

import AddPost from './components/AddPost';

import axios, { all } from 'axios';
import { useQuery } from '@tanstack/react-query';
import Post from './components/Post';

interface Post {
	id: string;
	title: string;
	user: {
		name: string;
		image: string;
	};
	data: Object,
	body: string;
}

// Fetch all posts from server
const allPosts = async () => {
	const { data } = await axios.get('/api/posts/getPosts');
	return data;
};

export default function Home() {
	const { data, error, isLoading } = useQuery({
		queryKey: ['posts'],
		queryFn: allPosts,
	});

	if (error) return error;

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<main>
			<AddPost />

			{/* <PostList /> */}
			{data?.map((post: Post) => (
				<Post key={post.id} avatar={post.user.image} name={ post.user.name } title={post.title} id={post.id}/>
			))}

		</main>
	);
}
