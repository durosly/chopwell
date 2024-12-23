function IconCart({ className }: { className?: undefined | string }) {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="20 10 25 12" fill="none">
			<path
				d="M28.65 10.5H35.85C39.25 10.5 39.59 12.09 39.82 14.03L40.72 21.53C41.01 23.99 40.25 26 36.75 26H27.76C24.25 26 23.49 23.99 23.79 21.53L24.69 14.03C24.91 12.09 25.25 10.5 28.65 10.5Z"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M28.25 12V8.5C28.25 7 29.25 6 30.75 6H33.75C35.25 6 36.25 7 36.25 8.5V12"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path d="M40.66 21.0298H28.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
	);
}

export default IconCart;
