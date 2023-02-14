import Link from 'next/link';
import Login from './Login';
import Logged from './Logged';

import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../pages/api/auth/[...nextauth]';

export default async function Nav() {
	const session = await getServerSession(authOptions);
	// console.log(session);

	return (
		<nav className="flex justify-between items-center py-8">
			<Link href={'/'}>
				<h1 className="font-bold text-lg">Send...</h1>
			</Link>
			<ul className="flex items-center gap-6">
				{/* I can have a client component here inside this server component*/}

				{/* If the user is not logged */}
				{!session?.user && <Login />}

				{/* If the user is logged */}
				{session?.user && (
					<Logged
						name={session.user.name || ''}
						image={session.user.image || ''}
					/>
				)}
			</ul>
		</nav>
	);
}
