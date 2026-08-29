import qs from 'qs';
export function buildQuery(query: object) {
	return qs.stringify(query, {
		encodeValuesOnly: true,
	});
}
