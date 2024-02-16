import type { Attachment } from 'airtable';
import type { ILinkedRecord } from './LinkedRecord';

export interface IRawExtract {
	id: string;
	childTitles?: string[];
	children?: string[];
	connectionTitles?: string[];
	connections?: string[];
	creatorNames?: string[];
	creators?: string[];
	extract?: string;
	extractedOn: string;
	imageCaption?: string;
	images?: Attachment[];
	lastUpdated: string;
	michelinStars?: number;
	notes?: string;
	numChildren: number;
	numFragments: number;
	parent?: string[];
	parentCreatorIds?: string[];
	parentCreatorNames?: string[];
	parentTitle?: string[];
	source?: string;
	spaceTopics?: string[];
	spaces?: string[];
	title?: string;
	format?: string;
	[key: string]: unknown;
}

export interface IExtract {
	id: string;
	title?: string;
	creators?: ILinkedRecord[];
	spaces?: ILinkedRecord[];
	connections?: ILinkedRecord[];
	parent?: ILinkedRecord;
	parentCreators?: ILinkedRecord[];
	children?: ILinkedRecord[];
	extract?: string;
	notes?: string;
	images?: Attachment[];
	imageCaption?: string;
	michelinStars?: number;
	numChildren: number;
	numFragments: number;
	source?: string;
	format?: string;
	extractedOn: Date;
	lastUpdated: Date;
	_original: IRawExtract;
}
