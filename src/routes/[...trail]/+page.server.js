import { error } from '@sveltejs/kit';
import { airtableFetch } from '$lib/server/requests';
import { mapExtractRecord } from '$helpers/mapping';
import { decodeSegment, entities } from '$helpers/params';

const makeCreatorFilter = (id) => `FIND('${id}', creatorsLookup)  > 0`;
const makeSpaceFilter = (id) => `FIND('${id}', spacesLookup)  > 0`;

export async function load({ params }) {
	const { trail } = params;
	const steps = trail.split('/').map((id) => decodeSegment(id));
	const { entity, id } = steps[0];

	let filterFormula;

	switch (entity) {
		case entities.creator:
			filterFormula = makeCreatorFilter(id);
			break;
		case entities.space:
			filterFormula = makeSpaceFilter(id);
			break;
		case entities.format:
			filterFormula = `format = '${id}'`;
			break;
		case entities.extract:
			filterFormula = `RECORD_ID() = '${id}'`;
			break;
		default:
			error(404, {
				message: 'Invalid trail.'
			});
			return null;
	}

	const records = await airtableFetch('extracts', {
		view: 'viwCvae2rXQscUap6', // Best
		filterByFormula: filterFormula,
		maxRecords: 300
	});

	if (!records) {
		error(404, {
			message: 'Failed to load records.'
		});
		return null;
	}

	return {
		[id]: records.map(mapExtractRecord)
	};
}
