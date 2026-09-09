'use client';

import { ReactNode } from 'react';
import { GlobalContextProvider, GlobalContextType } from './GlobalContext';

import { SessionProvider } from 'next-auth/react';
import ProviderRedux from './ProviderRedux';
import { Toast } from 'radix-ui';

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
			<ProviderRedux>
				<Toast.Provider swipeDirection="right">
					<GlobalContextProvider value={data.global}>{children}</GlobalContextProvider>

					<Toast.Viewport className="ToastViewport" />
				</Toast.Provider>
			</ProviderRedux>
		</SessionProvider>
	);
}
