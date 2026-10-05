export default {
	async check(ctx: any) {
		ctx.status = 200;
		ctx.body = {
			status: 'ok',
			timestamp: new Date().toISOString(),
		};
	},
};
