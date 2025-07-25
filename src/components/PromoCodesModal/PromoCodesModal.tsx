import React, { useState } from 'react'
import styles from './PromoCodesModal.module.scss'
import ActionButton from '../ActionButton/ActionButton'
import Image from 'next/image'

interface PromoCodesModalProps {
	isOpen: boolean
	onClose: () => void
	onBuyClick?: () => void
}

const PromoCodesModal: React.FC<PromoCodesModalProps> = ({
	isOpen,
	onClose,
	onBuyClick,
}) => {
	const [copied, setCopied] = useState<string | null>(null)
	if (!isOpen) return null

	const handleCopy = async (code: string) => {
		// Для iOS и кроссбраузерности
		try {
			const el = document.createElement('textarea')
			el.value = code
			document.body.appendChild(el)
			el.select()
			document.execCommand('copy')
			document.body.removeChild(el)
			setCopied(code)
			setTimeout(() => setCopied(null), 1500)
		} catch {
			// fallback
			try {
				await navigator.clipboard.writeText(code)
				setCopied(code)
				setTimeout(() => setCopied(null), 1500)
			} catch {}
		}
	}

	const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === e.currentTarget) onClose()
	}

	return (
		<div className={styles.modalOverlay} onClick={handleOverlayClick}>
			<div className={styles.modalContent} onClick={e => e.stopPropagation()}>
				<div className={styles.imageWrapper}>
					<Image
						src='/images/friends.jpg'
						alt='С друзьями на матчи'
						className={styles.bgImage}
						width={100}
						height={200}
						priority
					/>
					<button className={styles.closeButton} onClick={onClose}>
						×
					</button>
				</div>
				<div className={styles.title}>
					<span>Вместе выгоднее</span>
				</div>
				<div className={styles.promoTextBlock}>
					<span>При покупке:</span>
					<span>
						2 билетов скидка 10%
						<span
							className={styles.promoCode}
							onClick={() => handleCopy('AKRCUP10')}
							onTouchEnd={() => handleCopy('AKRCUP10')}
							tabIndex={0}
							role='button'
							aria-label='Скопировать промокод AKRCUP10'
						>
							AKRCUP10
							{copied === 'AKRCUP10' && (
								<span className={styles.copied}>✓</span>
							)}
						</span>
					</span>
					<br />
					<span>
						3 билетов скидка 15%
						<span
							className={styles.promoCode}
							onClick={() => handleCopy('AKRCUP15')}
							onTouchEnd={() => handleCopy('AKRCUP15')}
							tabIndex={0}
							role='button'
							aria-label='Скопировать промокод AKRCUP15'
						>
							AKRCUP15
							{copied === 'AKRCUP15' && (
								<span className={styles.copied}>✓</span>
							)}
						</span>
					</span>
					<br />
					<span>
						от 4 билетов скидка 20%
						<span
							className={styles.promoCode}
							onClick={() => handleCopy('AKRCUP20')}
							onTouchEnd={() => handleCopy('AKRCUP20')}
							tabIndex={0}
							role='button'
							aria-label='Скопировать промокод AKRCUP20'
						>
							AKRCUP20
							{copied === 'AKRCUP20' && (
								<span className={styles.copied}>✓</span>
							)}
						</span>
					</span>
				</div>
				<ActionButton
					href='https://widget.afisha.yandex.ru/w/venues/79807?clientKey=d721bb72-e7ce-4a03-8775-67aea527feb0&regionId=51&_ab_new_calendar=off'
					title='Купить билеты'
					className={styles.buyButton}
					actionType='link'
					onModalOpen={onBuyClick}
				/>
			</div>
		</div>
	)
}

export default PromoCodesModal
