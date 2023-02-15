'use client';

import { useState } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import toast, { Toaster } from 'react-hot-toast';

export default function AddPost() {
	const [title, setTitle] = useState('');
	const [isDisabled, setIsDisabled] = useState(false);

	// Access the client
	const queryClient = useQueryClient();

	// Notify the user if there is an error
	const notify = (message: string, type: string) => {
		if (type === 'error') {
			return toast.error(message);
		}
		if (type === 'success') {
			return toast.success(message);
		}
	};

	// I'm comment this out because tris is in my 
	// Create a query
	// const query = useQuery({
	// 	queryKey: 'posts',
	// 	queryFn: () => axios.get('/api/posts/getPosts'),
	// });

	// Create a mutation/post
	const { mutate } = useMutation(
		// mutation using axios post request
		// {
		// 	mutationFn: async (title) =>
		// 		await axios.post('/api/posts/addPost', { title }),
		// }
		async (title: string) =>
			await axios.post('/api/posts/addPost', { title }),
		{
			onError: (err: any) => {
				const errorMessage = err.response.data.message;
				// notify(errorMessage);
				if (err instanceof AxiosError) {
					notify(errorMessage, 'error');
				}
				setIsDisabled(false);
			},
			onSuccess: (data) => {
				const successMessage = data.data.message;

				// console.log(data);
				notify(successMessage, 'success');
				setTitle('');
				setIsDisabled(false);
			},
		}
	);

	const onSubmitFormHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsDisabled(true);

		mutate(title);
	};

	return (
		<form
			onSubmit={onSubmitFormHandler}
			className="bg-white my-8 p-8 rounded-md">
			{/* Here is for the toaster notification */}
			<Toaster position="top-center" reverseOrder={false} />

			{/* Here is for the form input */}
			<div className=" flex flex-col my-4">
				<textarea
					className="w-full my-2 h-24 p-4 border border-gray-400 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
					name="title"
					id="title"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					placeholder="What are you thinking now?"
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
					className="bg-teal-600 text-white font-bold py-2 px-6 rounded-xl disabled:opacity-25">
					Create post
				</button>
			</div>
		</form>
	);
}
