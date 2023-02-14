import './globals.css';
import Nav from './auth/Nav';

// Import the font
import { Roboto } from '@next/font/google';

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
				className={` ${roboto.variable}  font-roboto  bg-slate-500 mx-4 md:mx-48 xl:mx-96 `}>
				<Nav />
				{/* children here means "every page" */}
				{children}
			</body>
		</html>
	);
}
