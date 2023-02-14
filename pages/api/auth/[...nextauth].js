import NextAuth from 'next-auth';
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from 'next-auth/providers/google';

import { PrismaAdapter } from '@next-auth/prisma-adapter';

// this is my prisma client
import prisma from '../../../prisma/client';

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		{
			adapter: PrismaAdapter(prisma),
			providers: [
				// GithubProvider({
				// 	clientId: process.env.GITHUB_ID,
				// 	clientSecret: process.env.GITHUB_SECRET,
				// }),
				GoogleProvider({
					clientId: process.env.GOOGLE_CLIENT_ID,
					clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				}),
			],
		},
	],
};

export default NextAuth(authOptions);
