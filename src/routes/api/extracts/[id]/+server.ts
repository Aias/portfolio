import { json } from '@sveltejs/kit';
import { airtableFind } from '$lib/server/requests';
import { mapExtractRecord } from '$helpers/mapping';
import { Table, type IBaseExtract } from '$types/Airtable';

export async function GET({ params }) {
	const extract = await airtableFind<IBaseExtract>(Table.Extracts, params.id);
	return json(mapExtractRecord(extract));
}
