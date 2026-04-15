import type { FC } from 'react'

import type { MatchActivity } from '@/data/matchActivities'

import styles from './MatchActivities.module.scss'

function cx(...parts: Array<string | false | null | undefined>): string {
	return parts.filter(Boolean).join(' ')
}

export type MatchActivityCardProps = {
	activity: MatchActivity
}

function cardThemeClass(activity: MatchActivity): string {
	if (activity.variant === 'photo') {
		return styles.cardTheme_photo
	}
	if (activity.solidTone === 'black') {
		return cx(
			styles.cardTheme_black,
			activity.blackTagChip === 'flat' && styles.cardBlackTagFlat,
		)
	}
	return styles.cardTheme_red
}

export const MatchActivityCard: FC<MatchActivityCardProps> = ({ activity }) => {
	const {
		titleLine1,
		titleLine2,
		subtitle,
		tags,
		tagsGap,
		variant,
		imageSrc,
		imageSrcMobile,
		imageSrcTablet,
		photoImageLayout,
	} = activity

	const hasMobileAsset = Boolean(imageSrcMobile)
	const desktopPhotoSrc = imageSrcTablet ?? imageSrc
	const coverPhoto = variant === 'photo' && photoImageLayout === 'cover'

	const photoFillInner =
		variant === 'photo' && imageSrc ? (
			<>
				<div className={styles.cardFillMedia}>
					{coverPhoto ? (
						<>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								className={cx(styles.cardFillImg, styles.cardFillImgCover)}
								src={imageSrc}
								alt=""
								width={800}
								height={800}
								decoding="async"
								loading="lazy"
							/>
						</>
					) : hasMobileAsset ? (
						<>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								className={cx(styles.cardFillImg, styles.cardFillImgMobile)}
								src={imageSrcMobile}
								alt=""
								width={400}
								height={400}
								decoding="async"
								loading="lazy"
							/>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								className={cx(
									styles.cardFillImg,
									styles.cardFillImgDesktop,
									imageSrcTablet && styles.cardFillImgDesktopTablet,
								)}
								src={desktopPhotoSrc}
								alt=""
								width={800}
								height={800}
								decoding="async"
								loading="lazy"
							/>
						</>
					) : (
						<>
							{/* eslint-disable-next-line @next/next/no-img-element */}
							<img
								className={cx(styles.cardFillImg, styles.cardFillImgCrop)}
								src={imageSrc}
								alt=""
								width={800}
								height={800}
								decoding="async"
								loading="lazy"
							/>
						</>
					)}
				</div>
				<div className={styles.cardFillGradients} />
			</>
		) : null

	return (
		<article className={cx(styles.card, cardThemeClass(activity))}>
			{photoFillInner ? (
				<div className={styles.cardFill} aria-hidden>
					{photoFillInner}
				</div>
			) : null}
			<div className={styles.cardInner}>
				<div
					className={cx(
						styles.cardTags,
						tagsGap === 10 && styles.cardTagsGap10,
					)}
				>
					{tags.map((label) => (
						<span key={label} className={cx(styles.tag, 'font-mono')}>
							{label}
						</span>
					))}
				</div>
				<div className={styles.cardBody}>
					<div className={styles.cardTitle}>
						<p className={styles.cardTitleLine}>{titleLine1}</p>
						{titleLine2.trim() ? (
							<p className={styles.cardTitleLine}>{titleLine2}</p>
						) : null}
					</div>
					<p className={cx(styles.cardSubtitle, 'font-mono')}>{subtitle}</p>
				</div>
			</div>
		</article>
	)
}
