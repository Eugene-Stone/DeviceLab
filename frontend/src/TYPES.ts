// Navigation plugin types
export type NavigationItemType = 'INTERNAL' | 'EXTERNAL' | 'WRAPPER';

export interface NavigationRelated {
	id: number;
	contentType: string;
	collectionName: string;
	// eslint-disable-next-line
	[key: string]: any; // Allows custom fields from your tied content types
}

export interface BaseNavigationItem {
	id: number;
	title: string;
	type: NavigationItemType;
	path: string;
	slug: string;
	externalPath: string | null;
	menuAttached: boolean;
	order: number;
	collapsed: boolean;
	audience: string[] | null;
	related: NavigationRelated | null;
	additionalFields?: {
		isAnchor?: boolean;
	};
}

// Type used when fetching a FLAT structural response
export interface FlatNavigationItem extends BaseNavigationItem {
	parent: number | null;
}

// Type used when fetching a TREE structural response
export interface TreeNavigationItem extends BaseNavigationItem {
	parent: null | TreeNavigationItem;
	items: TreeNavigationItem[];
}

// Wrapper for typical Strapi API JSON array responses
export type StrapiNavigationResponse<T extends 'FLAT' | 'TREE'> = T extends 'TREE'
	? TreeNavigationItem[]
	: FlatNavigationItem[];

//
//
//
//
//
//
//
//
// API response types
export type PageDataType = {
	url: string;
	pageName?: 'home' | 'page' | 'blog' | 'article' | 'catalog' | 'product';
	pageType?: 'single' | 'collection';
	slug?: string;
};

export type StrapiResponseSingle<T> = {
	data: T;
	meta: Meta;
};
export type StrapiResponseCollection<T> = {
	data: T[];
	meta: Meta;
};
export type Pagination = {
	page: number;
	pageCount: number;
	pageSize: number;
	total: number;
};

export type Meta = {
	pagination: Pagination;
};

export type AccordionType = {
	id: number;
	title: string;
	text: string;
};

export type ArticlesParamsType = {
	search?: string;
	sort?: string;
	page?: string;
};
export type ArticlesFetchType = {
	countOnPage?: string;
	params?: ArticlesParamsType;
};
