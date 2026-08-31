'use client';

import { TreeNavigationItem } from '@/TYPES';
import { Global } from '@backend-types/global';
import { createContext, useContext, ReactNode } from 'react';

export interface GlobalContextType {
	globalData: Global;
	menuPrimary: TreeNavigationItem[];
	menuFooter: TreeNavigationItem[];
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export function useGlobalContext() {
	const context = useContext(GlobalContext);

	if (!context) {
		throw new Error('useGlobalContext error');
	}
	return context;
}

export function GlobalContextProvider({
	children,
	value,
}: {
	children: ReactNode;
	value: GlobalContextType;
}) {
	return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
}
