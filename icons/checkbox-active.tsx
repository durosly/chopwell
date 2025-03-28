function IconCheckBoxActive({ className }: { className?: string | undefined }) {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none">
			<path
				d="M13.86 3.85999H10.14C5.65 3.85999 2 7.50999 2 12C2 16.49 5.65 20.14 10.14 20.14H13.86C18.35 20.14 22 16.49 22 12C22 7.50999 18.35 3.85999 13.86 3.85999ZM10.14 16.42C7.7 16.42 5.72 14.44 5.72 12C5.72 9.55999 7.7 7.57999 10.14 7.57999C12.58 7.57999 14.56 9.55999 14.56 12C14.56 14.44 12.58 16.42 10.14 16.42Z"
				fill="currentColor"
			/>
		</svg>
	);
}

export default IconCheckBoxActive;
