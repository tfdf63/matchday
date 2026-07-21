import datasetJson from './dataset.json'
import type { BusFansDataset } from './types'

export type {
	BusFansDataset,
	BusManifest,
	MatchEvent,
	MatchListStatus,
	MatchVenue,
	PassengerAssignment,
} from './types'

export const busFansDataset = datasetJson as unknown as BusFansDataset
