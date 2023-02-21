// Component to toggle the delete button to show a Modal to confirm the deletion of a post
'use client';

export default function Toggle({
	showModal,
	onRealDelete,
	postId,
}: {
	showModal: Function;
	onRealDelete: Function;
	postId: string;
}) {
	return (
		<div
			className=" fixed w-full h-full z-20 bg-black/50 top-0 left-0 "
			onClick={() => {
				showModal(false);
			}}>
			{/* basically centering the modal */}
			<div className="absolute bg-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-12 rounded-lg flex flex-col gap-6">
				<h1 className="text-2xl font-bold text-gray-700">
					Are you sure you want to delete this post? 😢
				</h1>
				<h3 className=" text-sm text-red-600 ">
					This action cannot be undone.
				</h3>
				<div className="flex justify-end gap-4">
					<button
						className="text-red-500 text-lg hover:bg-red-500 p-1 rounded-lg hover:text-white"
						onClick={() => {
							showModal(true);
							onRealDelete(postId);
						}}>
						Delete
					</button>
					<button
						onClick={() => {
							showModal(false);
						}}
						className="text-gray-500 text-lg hover:bg-gray-500 p-1 rounded-lg hover:text-white">
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
