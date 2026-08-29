'use client';

import { TreeNavigationItem } from '@/TYPES';
import { Global } from '@backend-types/global';
import { createContext, useContext, ReactNode } from 'react';

// Укажи свои типы при необходимости
export interface GlobalContextType {
	globalData: Global;
	menuPrimary: TreeNavigationItem[];
	menuFooter: TreeNavigationItem[];
}

const GlobalDataContext = createContext<GlobalContextType | null>(null);

export function GlobalDataProvider({
	children,
	value,
}: {
	children: ReactNode;
	value: GlobalContextType;
}) {
	return <GlobalDataContext.Provider value={value}>{children}</GlobalDataContext.Provider>;
}

export function useGlobalData() {
	const context = useContext(GlobalDataContext);

	if (!context) {
		throw new Error('useGlobalData must be used within GlobalDataProvider');
	}
	return context;
}
