import NotAvailable from "../_components/not-available";

export default function UserLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="available h-screen">{children}</div>
			<NotAvailable />
		</>
	);
}
