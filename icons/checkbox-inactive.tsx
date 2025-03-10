function IconCheckBoxInactive({ className }: { className?: string | undefined }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none">
			<path
				d="M10 4H14C18.42 4 22 7.58 22 12C22 16.42 18.42 20 14 20H10C5.58 20 2 16.42 2 12C2 7.58 5.58 4 10 4Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M10 16C12.2091 16 14 14.2091 14 12C14 9.79086 12.2091 8 10 8C7.79086 8 6 9.79086 6 12C6 14.2091 7.79086 16 10 16Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

export default IconCheckBoxInactive;
