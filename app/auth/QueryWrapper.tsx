// basically, this component is to wrap the whole app with the query client
'use client';

import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
	children?: ReactNode;
}

// Create a client
const queryClient = new QueryClient();

const QueryWrapper = ({ children }: Props) => {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};

export default QueryWrapper;
