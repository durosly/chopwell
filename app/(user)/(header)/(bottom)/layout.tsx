// import ToastDisplay from "@/app/_components/toast-display";
import BottomNav from "./_components/bottom-nav";
import SearchBar from "./_components/search-bar";

export default function BottomNavLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<SearchBar />
			{children}
			{/* <ToastDisplay /> */}
			<BottomNav />
		</>
	);
}
