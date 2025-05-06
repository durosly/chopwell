import LoadAnimationWrapper from "./_components/load-animation-wrapper";

function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-14 h-[40vh]">
			<LoadAnimationWrapper />
			<p>Loading...</p>
		</div>
	);
}

export default Loading;
