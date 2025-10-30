'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Card from '@/components/ui/Card/Card'
import { rules, Rule } from '@/data/rules'
import RuleModal from '@/components/RuleModal'
import styles from './CardRules.module.scss'

interface CardRulesProps {
	limit?: number
	showViewAllButton?: boolean
}

const CardRules: React.FC<CardRulesProps> = ({
	limit,
	showViewAllButton = false,
}) => {
	const [selectedRule, setSelectedRule] = useState<Rule | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	const handleCardClick = (rule: Rule) => {
		setSelectedRule(rule)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		// Даем время на анимацию закрытия перед сбросом правила
		setTimeout(() => setSelectedRule(null), 300)
	}

	const displayedRules = limit ? rules.slice(0, limit) : rules

	return (
		<>
			<section className={styles.cardRulesSection}>
				<div className={styles.container}>
					<div className={styles.cardsGrid}>
						{displayedRules.map(rule => (
							<Card
								key={rule.id}
								image={rule.image}
								title={rule.title}
								imageAlt={rule.title}
								className={styles.ruleCard}
								onClick={() => handleCardClick(rule)}
							/>
						))}
					</div>
					{showViewAllButton && (
						<div className={styles.buttonContainer}>
							<Link href='/rules' className={styles.viewAllButton}>
								Посмотреть все правила
							</Link>
						</div>
					)}
				</div>
			</section>
			<RuleModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				rule={selectedRule}
			/>
		</>
	)
}

export default CardRules
