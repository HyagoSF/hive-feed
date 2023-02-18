export type PostType = {
	id: string;
	title: string;
	user: {
		name: string;
		image: string;
	};
	comments?: {
		id: string;
		createdAt: string;
		postId: string;
		userId: string;
		user: {
			name: string;
			image: string;
		};
	};
}[];
