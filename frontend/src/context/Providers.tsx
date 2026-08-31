// 'use client';

import { ReactNode } from 'react';
import { GlobalContextProvider, GlobalContextType } from './GlobalContext';

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
	return <GlobalContextProvider value={data.global}>{children}</GlobalContextProvider>;
}
