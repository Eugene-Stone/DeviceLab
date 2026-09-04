'use client';

import { ReactNode } from 'react';
import { GlobalContextProvider, GlobalContextType } from './GlobalContext';

import { SessionProvider } from 'next-auth/react';

interface ProvidersProps {
	children: ReactNode;
	data: {
		global: GlobalContextType;
		providerTwoData: string;
	};
}

export default function Providers({ children, data }: ProvidersProps) {
	// console.log(data.global);
	// console.log(data.providerTwoData);
	return (
		<SessionProvider>
			<GlobalContextProvider value={data.global}>{children}</GlobalContextProvider>
		</SessionProvider>
	);
}
