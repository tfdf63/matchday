'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type FC, type ReactNode } from 'react'

import { LoginModal } from '@/components/LoginModal'

import {
	type PersonalData,
	appendPersonalDataToUrl,
} from './personalData'

const API_URL = 'https://id-fcakron.internetlab.ru/api/user/get'

export type TicketLinkHandler = {
	personalData: PersonalData | null
	loginModalOpen: boolean
	openLoginModal: () => void
	closeLoginModal: () => void
	getTicketUrl: (url: string) => string
	handleTicketClick: (url: string) => boolean
	refreshUserData: () => Promise<void>
}

const TicketLinksContext = createContext<TicketLinkHandler | null>(null)

function fetchUserData(): Promise<PersonalData | null> {
	return fetch(API_URL, {
		method: 'GET',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
	})
		.then(res => {
			if (!res.ok) return null
			return res.json()
		})
		.then(json => {
			if (!json || !json.id) return null
			return {
				fullName: [json.name, json.lastname].filter(Boolean).join(' '),
				email: json.email || '',
				phone: json.phone || '',
			} as PersonalData
		})
		.catch(() => null)
}

export type PersonalDataProviderProps = {
	children: ReactNode
}

export const PersonalDataProvider: FC<PersonalDataProviderProps> = ({ children }) => {
	const [personalData, setPersonalData] = useState<PersonalData | null>(null)
	const [loginModalOpen, setLoginModalOpen] = useState(false)

	useEffect(() => {
		fetchUserData().then(data => {
			if (data) setPersonalData(data)
		})
	}, [])

	const openLoginModal = useCallback(() => setLoginModalOpen(true), [])
	const closeLoginModal = useCallback(() => setLoginModalOpen(false), [])

	const refreshUserData = useCallback(async () => {
		const data = await fetchUserData()
		if (data) setPersonalData(data)
	}, [])

	const getTicketUrl = useCallback(
		(url: string) => {
			if (!personalData) return url
			return appendPersonalDataToUrl(url, personalData)
		},
		[personalData],
	)

	const handleTicketClick = useCallback(
		(_url: string) => {
			if (personalData) return false
			setLoginModalOpen(true)
			return true
		},
		[personalData],
	)

	const value = useMemo<TicketLinkHandler>(
		() => ({
			personalData,
			loginModalOpen,
			openLoginModal,
			closeLoginModal,
			getTicketUrl,
			handleTicketClick,
			refreshUserData,
		}),
		[
			personalData,
			loginModalOpen,
			openLoginModal,
			closeLoginModal,
			getTicketUrl,
			handleTicketClick,
			refreshUserData,
		],
	)

	return (
		<TicketLinksContext.Provider value={value}>
			{children}
			<LoginModal open={loginModalOpen} onClose={closeLoginModal} onSuccess={refreshUserData} />
		</TicketLinksContext.Provider>
	)
}

export function useTicketLinks(): TicketLinkHandler {
	const ctx = useContext(TicketLinksContext)
	if (!ctx) {
		throw new Error('useTicketLinks must be used within PersonalDataProvider')
	}
	return ctx
}
