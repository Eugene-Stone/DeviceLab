export default {
	async check(ctx: any) {
		ctx.status = 200;
		ctx.body = {
			status: 'ok',
			timestamp: new Date().toISOString(),
		};
	},
};

// https://SITE_NAME.onrender.com/api/health
// https://devicelab.onrender.com/api/health
// http://localhost:1337/api/health
