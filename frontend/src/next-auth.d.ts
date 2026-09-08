import { DefaultSession } from 'next-auth';

export interface StrapiUser {
	id: number | string;
	username: string;
	email: string;
	provider?: string;
	confirmed?: boolean;
	blocked?: boolean;
	createdAt?: string;
	updatedAt?: string;
	firstName?: string;
	lastName?: string;
	phoneNumber?: string;
	[key: string]: unknown;
}

declare module 'next-auth' {
	interface Session {
		jwt?: string;
		user: {
			id: string;
			strapiUser?: StrapiUser;
		} & DefaultSession['user'];
	}

	interface User {
		id: string;
		jwt?: string;
		strapiUser?: StrapiUser;
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id?: string;
		jwt?: string;
		strapiUser?: StrapiUser;
	}
}
