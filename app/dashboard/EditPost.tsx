'use client';

import { useState } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { QueryClient } from '@tanstack/react-query';

import toast, { Toaster } from 'react-hot-toast';

export default function EditPost({
	post,
}: {
	post: { id: string; title: string };
}) {
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);
	let toastPostId: string;

	// To access the client, and use the queryClient to invalidate the query ( to refetch the data when the mutation is done)
	const queryClient = useQueryClient();

	// Notify the user if there is an error
	const notify = (message: string, type: string) => {
		if (type === 'loading') {
			toastPostId = toast.loading(message);
			return toastPostId;
		}
		if (type === 'error') {
			return toast.error(message, { id: toastPostId });
		}
		if (type === 'success') {
			return toast.success(message, { id: toastPostId });
		}
	};

	// Create a mutation/post
	const { mutate } = useMutation(
		async (title: string) =>
			await axios.post('/api/posts/editPost', { post, title }),
		{
			onError: (err: any) => {
				const errorMessage = err?.response?.data.message;
				// notify(errorMessage);
				if (err instanceof AxiosError) {
					notify(errorMessage, 'error');
				}
				setIsDisabled(false);
			},
			onSuccess: (data) => {
				const successMessage = data.data.message;

				queryClient.invalidateQueries({ queryKey: ['authUserPosts'] });

				notify(successMessage, 'success');
				setTitle('');
				setIsDisabled(false);
			},
		}
	);

	const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsDisabled(true);
		notify('Loading...', 'loading');

		mutate(title);
	};

	return (
		<form
			onSubmit={onSubmitFormHandler}
			className="bg-white my-4 p-4 rounded-md w-10/12 mx-auto ">
			{/* Here is for the toaster notification */}
			<Toaster position="top-center" reverseOrder={false} />

			{/* Here is for the form input */}
			<div className=" flex flex-col ">
				<textarea
					className=" my-2 h-24 p-4 border border-gray-400 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
					name="title"
					id="title"
					value={title}
					defaultValue={post.title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					placeholder={post.title}
				/>
			</div>

			{/* Here is for the form button */}
			<div className="flex items-center justify-between gap-2">
				<p
					className={`font-bold text-sm ${
						title.length > 350 ? 'text-red-600' : 'text-gray-600'
					}`}>{`${title.length}/350`}</p>
				<button
					disabled={isDisabled}
					type="submit"
					className="bg-teal-600 text-white font-bold py-2 px-6 rounded-xl disabled:opacity-25 scale-50">
					Edit post
				</button>
			</div>
		</form>
	);
}
