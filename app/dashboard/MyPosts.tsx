'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { AuthUserPosts } from '../types/AuthUserPosts';
import EditPost from './EditPost';

import Toggle from './Toggle';

const fetchAllUsersPosts = async () => {
	const { data } = await axios.get('/api/posts/authUserPosts');
	return data;
};

export default function MyPosts() {
	const { data, isLoading } = useQuery<AuthUserPosts>({
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

	/**
	 * Handlers for buttons
	 */
	const onRealDeleteHandler = async (postId: string) => {
		await axios.delete('/api/posts/deletePost', {
			data: { id: postId },
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
			// console.log(data?.Post);
			queryClient.invalidateQueries({ queryKey: ['authUserPosts'] });
		},
		onError: (err) => {
			console.log(err);
		},
	});

	const deletePost = () => {
		mutate(postIdToDelete);
		setPostIdToDelete('');
		setShowDeleteModal(false);
	};

	return (
		<div>
			<h1 className="my-8 text-purple-700">My Posts</h1>

			{isLoading && <p>Loading...</p>}

			{data &&
				data?.Post.map((post) => (
					<div key={post.id}>
						<div className="gap-12 m-8 bg-gray-400 p-8 rounded-lg">
							<div className="flex justify-between mb-8">
								<p className="break-all">{post.title}</p>
								<button
									onClick={() => onEditButtonHandler(post.id)}
									className="text-sm hover:bg-white hover:rounded-lg px-2 hover:animate-bounce max-h-12">
									Edit
								</button>
							</div>

							{editComments[post.id] && <EditPost post={post} />}

							<div className="mt-4 bg-gray-300 text-base p-3 rounded-lg">
								{post.comments.length !== 1 ? (
									<h1>{post.comments.length} Comments</h1>
								) : (
									<h1> 1 Comment </h1>
								)}

								{post.comments.map((comment) => (
									<div key={comment.id} className="">
										<p className="bg-gray-200 rounded-lg p-1 mt-4">
											{comment.text}
										</p>
									</div>
								))}
							</div>

							<div className="flex justify-end mt-4 ">
								<button
									className="text-red-500 text-lg hover:bg-red-500 p-1 rounded-lg hover:text-white"
									onClick={() => {
										onShowModalDeletePostHandler(post.id);
									}}>
									Delete
								</button>
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
