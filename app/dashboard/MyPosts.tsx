'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { AuthUserPosts } from '../types/AuthUserPosts';
import EditPost from './EditPost';

import Toggle from './Toggle';

import { Session } from '../types/Session';

import toast, { Toaster } from 'react-hot-toast';

import { motion as m } from 'framer-motion';

interface UserProp {
	email: string;
	id: string;
	image: string;
	name: string;
	Post?: Post[];
}

interface Post {
	createdAt: string;
	id: string;
	title: string;
	comments?: Comments[];
}

interface Comments {
	createdAt: string;
	id: string;
	postId: string;
	text: string;
	userId: string;
}

interface Session {
	user: {
		name: string;
		email: string;
		image: string;
	};
}

const fetchAllUsersPosts = async (): Promise<UserProp> => {
	const { data } = await axios.get('/api/posts/authUserPosts');
	return data;
};

export default function MyPosts({ session }: { session: any }) {
	// const { data, isLoading } = useQuery<AuthUserPosts>({
	// 	queryKey: ['authUserPosts'],
	// 	queryFn: fetchAllUsersPosts,
	// });

	// console.log(session);
	const { data, isLoading } = useQuery({
		queryKey: ['authUserPosts'],
		queryFn: fetchAllUsersPosts,
	});

	// create a state to keep track of whether the "Edit Comment" button was clicked for each comment
	const [editComments, setEditComments] = useState<{
		[commentId: string]: boolean;
	}>({});

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const [postIdToDelete, setPostIdToDelete] = useState<string>('');

	const queryClient = useQueryClient();

	// Using the deleteToastId to prevent multiple toasts from showing up at the same time
	let deleteToastId: string;

	/**
	 * Handlers for buttons
	 */
	const onRealDeleteHandler = async (postId: string) => {
		await axios.delete('/api/posts/deletePost', {
			data: { postId: postId, session: session },
		});
	};

	// handler function to toggle the "Edit Comment" state for a specific comment
	const onEditButtonHandler = (commentId: string) => {
		setEditComments({
			...editComments,
			[commentId]: !editComments[commentId],
		});
	};

	const onShowModalDeletePostHandler = async (postId: string) => {
		setPostIdToDelete(postId);
		setShowDeleteModal(true);
	};

	// Mutation to delete a post
	const { mutate } = useMutation(onRealDeleteHandler, {
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['authUserPosts'] });
			toast.success('Post deleted successfully', { id: deleteToastId });
		},
		onError: (error: { message: string }) => {
			toast.error(error.message, { id: deleteToastId });
		},
	});

	const deletePost = () => {
		deleteToastId = toast.loading('Deleting post...', {
			id: deleteToastId,
		});

		mutate(postIdToDelete);
		setPostIdToDelete('');
		setShowDeleteModal(false);
	};

	return (
		<div>
			<Toaster
				position="top-center"
				toastOptions={{
					style: {
						fontSize: '1rem',
					},
				}}
				reverseOrder={false}
			/>
			<h1 className="my-8 text-emerald-700 text-center text-5xl">
				My Posts
			</h1>

			{isLoading && <p>Loading...</p>}

			{data &&
				data?.Post?.map((post) => (
					<div key={post.id}>
						<div className="gap-12 m-8 bg-white px-3 pt-3 pb-2  rounded-xl ">
							<div className="flex justify-between mb-8 ">
								<p className="break-all">{post.title}</p>
								<button
									onClick={() => onEditButtonHandler(post.id)}
									className="text-sm hover:bg-gray-200 hover:rounded-lg px-2 hover:animate-bounce max-h-12">
									Edit
								</button>
							</div>

							{editComments[post.id] && (
								<EditPost
									post={post}
									onEditButtonHandler={onEditButtonHandler}
								/>
							)}

							<div className="mt-4 bg-gray-100 text-base p-2 rounded-lg">
								{post?.comments?.length !== 1 ? (
									<h1>{post?.comments?.length} Comments</h1>
								) : (
									<h1> 1 Comment </h1>
								)}

								{post?.comments?.map((comment) => (
									<div key={comment.id}>
										<p className="bg-gray-200 rounded-lg p-1 mt-4">
											{comment.text}
										</p>
									</div>
								))}
							</div>

							<div className="flex justify-end mt-4 ">
								<m.button
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									className="text-red-500 text-lg hover:bg-red-500 p-1 rounded-lg hover:text-white"
									onClick={() => {
										onShowModalDeletePostHandler(post.id);
									}}>
									Delete
								</m.button>
								{showDeleteModal && (
									<Toggle
										showModal={setShowDeleteModal}
										onRealDelete={deletePost}
										postId={post.id}
									/>
								)}
							</div>
						</div>
					</div>
				))}
		</div>
	);
}
