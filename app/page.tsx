// here will be client because we are gonna use a lot of fetching and stuff
'use client';

import AddPost from './components/AddPost';

import axios, { all } from 'axios';
import { useQuery } from '@tanstack/react-query';
import Post from './components/Post';

// Adding the types for all the posts
import { PostType } from './types/Posts';
import Link from 'next/link';

import { Fragment, ReactNode } from 'react';

// Fetch all posts from server
const allPosts = async () => {
	const { data } = await axios.get('/api/posts/getPosts');
	return data;
};

// const Props = {
// 	children?: ReactNode;
// }

export default function Home() {
	// Fetch all posts, and saying that the data is of an array type of PostType[]
	const { data, error, isLoading } = useQuery<PostType[]>({
		queryKey: ['posts'],
		queryFn: allPosts,
	});

	// if (error) return error;

	if (isLoading) return <h1>Loading...</h1>;

	return (
		<>
			<h1>hello</h1>
			<Link href="/" className="ml-1 text-lg font-bold text-emerald-700 ">
				Home
			</Link>

			<AddPost />

			{/* <PostList /> */}
			{data?.map((post: any) => (
				<Post
					key={post.id}
					avatar={post.user.image}
					name={post.user.name}
					title={post.title}
					id={post.id}
					comments={post.comments}
				/>
			))}
		</>
	);
}
