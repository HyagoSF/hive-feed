'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SetStateAction, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

type Props = {
	postId: string;
};

interface addCommentMutationFnVariables {
	text: string;
	postId: string;
}

// Mutation function to add a comment to the query cache, here is where I'll make the request to the server,
const addCommentMutationFn = async ({
	text: newCommentText,
	postId,
}: addCommentMutationFnVariables) => {
	const res = await axios.post('/api/posts/addComment', {
		text: newCommentText,
		postId,
	});
	return res.data;
};

export default function AddComment({ postId }: Props) {
	// State to hold the new comment text
	const [newCommentText, setNewCommentText] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);

	const queryClient = useQueryClient();

	// this is the id of the toaster that I use to
	let commentToaster: string;

	// Mutation to add a comment to the query cache
	const mutation = useMutation({
		mutationFn: addCommentMutationFn,
		onSuccess: (data) => {
			console.log(data);

			toast.success('Comment added successfully', { id: commentToaster });

			// Invalid the query cache to update the UI
			queryClient.invalidateQueries({ queryKey: ['detail-post'] });
		},
		onError: (err: any) => {
			toast.error(err.response.data.message, { id: commentToaster });
		},
	});

	// Function to call the mutation function
	const addComment = ({
		newCommentText,
		postId,
	}: {
		newCommentText: string;
		postId: string;
	}) => {
		mutation.mutate({ text: newCommentText, postId: postId });
	};

	// Handlers

	const onSetNewCommentTextHandler = (event: {
		target: { value: SetStateAction<string> };
	}) => {
		setNewCommentText(event.target.value);
	};

	const onAddCommentFormSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		setIsDisabled(true);

		//set a interval here of 3 seconds to enable the button again
		setInterval(() => {
			setIsDisabled(false);
		}, 3000);

		commentToaster = toast.loading('Adding comment...', {
			id: commentToaster,
		});

		const commentEntry = {
			newCommentText: newCommentText,
			postId: postId,
		};

		// Call the mutation function
		addComment(commentEntry);

		// Clear the input field after submitting
		setNewCommentText('');
	};

	return (
		<form
			onSubmit={onAddCommentFormSubmitHandler}
			className="
            flex items-center gap-2 mt-8  ">
			<Toaster />
			<div className="w-full">
				<div className="flex w-full gap-4">
					<input
						type="text"
						value={newCommentText}
						className="w-full p-2 rounded-lg"
						placeholder="Add a comment..."
						onChange={onSetNewCommentTextHandler}
					/>
					<button
						className={`text-sm text-teal-600 font-bold border-2 p-1 rounded-lg border-teal-600 hover:text-white hover:bg-teal-600 disabled:opacity-50 disabled:cursor-not-allowed`}
						disabled={isDisabled}
						type="submit">
						Add Comment 🚀
					</button>
				</div>

				<p
					className={`${
						newCommentText.length > 150 ? 'text-red-600' : ''
					}  font-bold text-xs     `}>{`${newCommentText.length} / 150`}</p>
			</div>
		</form>
	);
}
