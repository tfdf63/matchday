type TicketButtonContentProps = {
	title: string
	priceFrom?: string
	priceClassName: string
}

export function TicketButtonContent({
	title,
	priceFrom,
	priceClassName,
}: TicketButtonContentProps) {
	return (
		<>
			<span>{title}</span>
			{priceFrom ? (
				<span className={priceClassName}>{priceFrom}</span>
			) : null}
		</>
	)
}
