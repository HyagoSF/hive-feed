// here will be client because we are gonna use a lot of fetching and stuff
// 'use client';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

import MyPosts from './MyPosts';


import { redirect } from 'next/navigation';

export default async function Dashboard() {
	const session = await getServerSession(authOptions);

	if (!session) {
		// redirect to login page if the user is not logged and try to access the dashboard
		redirect('/api/auth/signin');
	}
	return (
		<div className="flex flex-col items-center text-3xl font-bold justify-center py-2">
			<h1>Welcome back {session?.user?.name}</h1>

			<MyPosts session={session} />
		</div>
	);
}
