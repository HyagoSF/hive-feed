// here will be client because we are gonna use a lot of fetching and stuff
'use client';

import AddPost from './components/AddPost';

export default function Home() {
	return (
		<main>
			<h1>Hello </h1>
			<AddPost />
		</main>
	);
}
