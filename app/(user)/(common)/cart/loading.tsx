import LoadingCartAnimation from "./_components/loading-cart";

function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-14 h-[40vh]">
			<LoadingCartAnimation />
			<p>Loading...</p>
		</div>
	);
}

export default Loading;
