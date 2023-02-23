// here will be client because we are gonna use a lot of fetching and stuff
// 'use client';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

import MyPosts from './MyPosts';

import { redirect } from 'next/navigation';

import { motion as m } from 'framer-motion';

export default async function Dashboard() {
	const session = await getServerSession(authOptions);

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.2,
			},
		},
	};

	const item = {
		hidden: { y: '100%' },
		show: { y: '0%', transition: { duration: 0.5 } },
	};

	if (!session) {
		// redirect to login page if the user is not logged and try to access the dashboard
		redirect('/api/auth/signin');
	}
	return (
		<div
			// variants={container}
			// initial="hidden"
			// animate="show"
			className="flex flex-col items-center text-3xl font-bold justify-center py-2">
			<h1 className='text-lg'>Welcome back {session?.user?.name}</h1>

			<MyPosts session={session} />
		</div>
	);
}
