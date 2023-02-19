// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { useState } from 'react';
// import { AuthUserPosts } from '../types/AuthUserPosts';
// import EditPost from './EditPost';

// const fetchAllUsersPosts = async () => {
// 	const { data } = await axios.get('/api/posts/authUserPosts');
// 	return data;
// };

// export default function MyPosts() {
// 	const { data, isLoading } = useQuery<AuthUserPosts>({
// 		queryKey: ['authUserPosts'],
// 		queryFn: fetchAllUsersPosts, //The function that the query will use to request data.
// 	});

// 	const [editPost, setEditPost] = useState(false);

// 	const onEditButtonHandler = () => {
// 		setEditPost(!editPost);
// 	};

// 	return (
// 		<div>
// 			<h1 className="my-8 text-purple-700">My Posts</h1>

// 			{isLoading && <p>Loading...</p>}

// 			{data &&
// 				data.Post.map((post) => (
// 					<>
// 						<div
// 							key={post.id}
// 							className="flex min-w-full justify-between gap-12 m-8 bg-gray-400 p-2 rounded-lg">
// 							<p>{post.title}</p>
// 							<button
// 								onClick={onEditButtonHandler}
// 								className="text-sm hover:bg-white hover:rounded-lg px-2 hover:animate-bounce">
// 								{' '}
// 								Edit Post{' '}
// 							</button>
// 						</div>
// 						{editPost && <EditPost post={post} />}
// 					</>
// 				))}

// 			<h1 className="my-8 text-purple-700">My Comments</h1>
// 			{data?.Post.map((post) => (
// 				<div key={post.id}>
// 					{post.comments.map((comment) => (
// 						<div key={comment.id}>
// 							<p>{comment.text}</p>
// 						</div>
// 					))}
// 				</div>
// 			))}
// 		</div>
// 	);
// }

'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { AuthUserPosts } from '../types/AuthUserPosts';
import EditPost from './EditPost';

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

	// handler function to toggle the "Edit Comment" state for a specific comment
	const onEditButtonHandler = (commentId: string) => {
		setEditComments({
			...editComments,
			[commentId]: !editComments[commentId],
		});
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
									className="text-sm hover:bg-white hover:rounded-lg px-2 hover:animate-bounce">
									Edit Post
								</button>
							</div>

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
						</div>

						{editComments[post.id] && <EditPost post={post} />}
					</div>
				))}
		</div>
	);
}
