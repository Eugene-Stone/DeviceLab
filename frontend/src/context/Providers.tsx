'use client';
import { ReactNode } from 'react';
import { GlobalDataProvider, GlobalContextType } from './GlobalDataContext';

interface ProvidersProps {
	children: ReactNode;
	data: GlobalContextType;
}

export default function Providers({ children, data }: ProvidersProps) {
	return <GlobalDataProvider value={data}>{children}</GlobalDataProvider>;
}
