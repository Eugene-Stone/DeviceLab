import { BACKEND_URL } from '@/CONSTANTS';
import { TreeNavigationItem } from '@/TYPES';
import { buildQuery } from '@/utils/buildQuery';
import { Global } from '@backend-types/global';

const queryGlobal = buildQuery({
	populate: {
		seo: {
			populate: {
				ogImage: true,
				twitterImage: true,
			},
		},
		logoHeader: {
			populate: '*',
		},
		logoFooter: {
			populate: '*',
		},
		contacts: {
			populate: '*',
		},
		socials: {
			populate: '*',
		},
	},
});

export async function getGlobalData() {
	try {
		const headers = { 'Content-Type': 'application/json' };
		const [globalDataRes, menuPrimaryRes, menuFooterRes] = await Promise.all([
			// fetch(`${BACKEND_URL}/api/global?populate=*`, { headers }),
			fetch(`${BACKEND_URL}/api/global?${queryGlobal}`, { headers }),
			fetch(`${BACKEND_URL}/api/navigation/render/menu-primary?type=TREE&populate=*`, {
				headers,
			}),
			fetch(`${BACKEND_URL}/api/navigation/render/menu-footer?type=TREE&populate=*`, {
				headers,
			}),
		]);

		if (!globalDataRes.ok || !menuPrimaryRes.ok || !menuFooterRes.ok) {
			throw new Error('Failed to get global data');
		}

		const [globalDataJson, menuPrimaryJson, menuFooterJson] = await Promise.all([
			globalDataRes.json(),
			menuPrimaryRes.json(),
			menuFooterRes.json(),
		]);

		return {
			globalData: globalDataJson.data as Global,
			menuPrimary: menuPrimaryJson as TreeNavigationItem[],
			menuFooter: menuFooterJson as TreeNavigationItem[],
		};
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error(error);
		}

		throw new Error('Backend unavailable');
	}
}
