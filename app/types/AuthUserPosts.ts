export type AuthUserPosts = {
	id: string;
	name: string;
	email: string;
	emailVerified: string;
	image: string;
	Post: {
		id: string;
		createdAt: string;
		updatedAt: string;
		title: string;
		published: boolean;
		userId: string;
		comments: {
			id: string;
			createdAt: string;
			postId: string;
			userId: string;
			text: string;
		}[];
	}[];
};
