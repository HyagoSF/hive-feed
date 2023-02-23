import './globals.css';
import Nav from './auth/Nav';

// Import the font
import { Roboto } from '@next/font/google';

// Import the query wrapper to wrap all my pages with the React Query provider
import QueryWrapper from './auth/QueryWrapper';

import { motion as m } from 'framer-motion';

// Configure the font
const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	variable: '--font-roboto',
});

// This is the root layout for every page in the app.
export default function RootLayout({ children }) {
	return (
		<html lang="en">
			{/*
				<head /> will contain the components returned by the nearest parent
				head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
			*/}
			<head />
			<body
				className={` ${roboto.variable} font-roboto mx-4 md:mx-48 xl:mx-96 bg-gray-300 transition-all`}>
				{/* Wrap all my body content with this query wrapper =) */}
				<QueryWrapper>
					<Nav />

					{/* children here means "every page" */}
					{children}
				</QueryWrapper>
			</body>
		</html>
	);
}
