'use client';

import { useEffect, useLayoutEffect } from 'react';

// eslint-disable-next-line
export default function PageToLocalstorage({ page, data }: any) {
	useLayoutEffect(() => {
		if (typeof window !== 'undefined' && data) {
			localStorage.setItem(page, JSON.stringify(data));
		}
	}, [page, data]);
	return null;
}
