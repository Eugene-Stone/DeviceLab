'use client';

import { ReactNode } from 'react';
import { GlobalContextProvider, GlobalContextType } from './GlobalContext';

import { SessionProvider } from 'next-auth/react';
import ProviderRedux from './ProviderRedux';
import { Toast } from 'radix-ui';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
	children: ReactNode;
	data: {
		global: GlobalContextType;
		providerTwoData: string;
	};
}

// Tanstack Query settings
// Вспомогательная функция, чтобы не пересоздавать client на клиенте
function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				// Данные считаются свежими 1 минуту (не рефетчатся сразу при переключении вкладок)
				staleTime: 60 * 1000,
				// Отключаем повторные запросы при потере/восстановлении фокуса окна (по желанию)
				refetchOnWindowFocus: false,
			},
		},
	});
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
	if (typeof window === 'undefined') {
		// На сервере ВСЕГДА создаем новый QueryClient для каждого запроса
		return makeQueryClient();
	} else {
		// На клиенте создаем один раз и переиспользуем (синглтон)
		if (!browserQueryClient) browserQueryClient = makeQueryClient();
		return browserQueryClient;
	}
}
// Tanstack Query settings END

export default function Providers({ children, data }: ProvidersProps) {
	// console.log(data.global);
	// console.log(data.providerTwoData);
	// Получаем единственный экземпляр QueryClient
	const queryClient = getQueryClient();

	return (
		<SessionProvider>
			<QueryClientProvider client={queryClient}>
				<ProviderRedux>
					<Toast.Provider swipeDirection="right">
						<GlobalContextProvider value={data.global}>
							{children}
						</GlobalContextProvider>

						<Toast.Viewport className="ToastViewport" />
					</Toast.Provider>
				</ProviderRedux>
			</QueryClientProvider>
		</SessionProvider>
	);
}
