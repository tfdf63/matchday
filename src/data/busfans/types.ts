export type MatchVenue = 'home' | 'away' | 'unknown'

/** ready — есть Excel/списки; pending — карточка из календаря, списки ещё нет. */
export type MatchListStatus = 'ready' | 'pending'

export type MatchEvent = {
	id: string
	title: string
	homeTeam: string
	awayTeam: string
	venue: MatchVenue
	dateIso: string
	dateToIso: string
	dateLabel: string
	dateCard?: string | null
	time: string | null
	gameId?: string | null
	scheduleMatchId: number | string | null
	tournament?: string | null
	leagueInfo?: string | null
	seasonTour?: string | null
	fanIdStatus?: 'Без fan id' | 'Fan id' | null
	busCount: number
	passengerCount: number
	seatsAssigned: number
	listStatus?: MatchListStatus
	/** Ссылка на внешнюю регистрацию в фан-автобус. */
	registrationUrl?: string | null
}

export type BusManifest = {
	id: string
	eventId: string
	label: string
	busNo: number | null
	sourceFile: string
	passengerCount: number
	seatsAssigned: number
	boardingStops?: string[]
}

export type PassengerAssignment = {
	eventId: string
	manifestId: string
	fullName: string
	seatNo: string | null
	seq: number
	orderId?: string | null
	/** ISO YYYY-MM-DD из отчёта Atoms. */
	birthDateIso?: string | null
	boardingPlace?: string | null
	phone?: string | null
	sourceFile: string
	sourceRow: number
}

export type BusFansDataset = {
	meta: {
		generatedAt: string
		sourceDir: string
		eventsCount: number
		manifestsCount: number
		passengersCount: number
	}
	events: MatchEvent[]
	manifests: BusManifest[]
	passengers: PassengerAssignment[]
}
