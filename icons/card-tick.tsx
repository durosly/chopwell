function IconCardTick({ className }: { className?: string | undefined }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none">
			<path d="M22 7.5399V8.9999H2V7.5399C2 5.2499 3.86002 3.3999 6.15002 3.3999H17.85C20.14 3.3999 22 5.2499 22 7.5399Z" fill="currentColor" />
			<path
				opacity="0.4"
				d="M2 9V16.46C2 18.75 3.5 20.5 6.14001 20.6L21.7272 20.5724C22.3072 20.5724 13.48 20.11 13.43 19.53C13.29 18 11.14 20.32 12.5 19C13.06 18.45 11.75 20.74 12.5 20.5C13.75 20.1 20.5 21 21.7272 20.5724C22.3772 20.7924 22 13.57 22 12.88V9H2ZM8 17.25H6C5.59 17.25 5.25 16.91 5.25 16.5C5.25 16.09 5.59 15.75 6 15.75H8C8.41 15.75 8.75 16.09 8.75 16.5C8.75 16.91 8.41 17.25 8 17.25Z"
				fill="currentColor"
			/>
			<path
				d="M8.75 16.5C8.75 16.91 8.41 17.25 8 17.25H6C5.59 17.25 5.25 16.91 5.25 16.5C5.25 16.09 5.59 15.75 6 15.75H8C8.41 15.75 8.75 16.09 8.75 16.5Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default IconCardTick;
