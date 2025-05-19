import NavLink from "@/app/_components/nav-link";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
	LuBell,
	LuBox,
	LuChartLine,
	LuConciergeBell,
	LuCookingPot,
	LuGrid2X2Check,
	LuLayoutGrid,
	LuLogOut,
	LuMap,
	LuMenu,
	LuNetwork,
	LuUsers,
} from "react-icons/lu";
import BreadCrump from "./dashboard/_components/bread-crump";
import "easymde/dist/easymde.min.css";
import LogoutButton from "@/app/_components/logout-btn";
import OrderNotifications from "./dashboard/_components/order-notifications";

function AdminDashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content">
				{/* Page content here */}
				<div className="navbar bg-base-100">
					<div className="flex-1">
						<label
							htmlFor="my-drawer-2"
							className="btn btn-sm btn-ghost drawer-button lg:hidden">
							<LuMenu className="w-5 h-5" />
						</label>
						<Link
							href="/dashboard"
							className="btn btn-ghost text-xl">
							Chopwell
						</Link>
					</div>
					<div className="flex-none">
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle">
								<div className="indicator">
									<LuBell className="h-5 w-5" />

									<span className="badge badge-sm indicator-item">
										8
									</span>
								</div>
							</div>
							<div
								tabIndex={0}
								className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
								<div className="card-body">
									<span className="text-lg font-bold">
										8 Orders
									</span>
									<span className="text-info">
										Subtotal: &#8358;999
									</span>
									<div className="card-actions">
										<Link
											href="/dashboard/orders"
											className="btn btn-primary btn-block">
											View orders
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="dropdown dropdown-end">
							<div
								tabIndex={0}
								role="button"
								className="btn btn-ghost btn-circle avatar">
								<div className="w-10 h-10 rounded-full relative">
									<Image
										className="object-cover"
										alt="Tailwind CSS Navbar component"
										fill
										src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
									/>
								</div>
							</div>
							<ul
								tabIndex={0}
								className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
								<li>
									<a className="justify-between">
										Profile
										<span className="badge">
											New
										</span>
									</a>
								</li>
								<li>
									<a>Settings</a>
								</li>
								<li>
									<a>Logout</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<main className="px-4 py-2">
					<OrderNotifications />
					<BreadCrump />
					<div className="mt-10">{children}</div>
				</main>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"></label>
				<div className="menu bg-base-100 text-base-content min-h-full w-80 p-4">
					<div className="flex items-center gap-2 mb-5">
						<LuBox className="w-5 h-5" />
						<h1 className="font-bold">Dashboard</h1>
					</div>
					<ul>
						{/* Sidebar content here */}
						<li>
							<NavLink
								path="/dashboard"
								exact
								className="flex gap-2 items-center"
								activeClassName="font-bold">
								<LuLayoutGrid className="h-5 w-5" />
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								path="/dashboard/orders"
								className="flex gap-2 items-center"
								activeClassName="font-bold">
								<LuConciergeBell className="h-5 w-5" />
								Orders
							</NavLink>
						</li>
						<li>
							<NavLink
								path="/dashboard/food"
								className="flex gap-2 items-center"
								activeClassName="font-bold">
								<LuCookingPot className="h-5 w-5" />
								Food
							</NavLink>
						</li>
						<li>
							<NavLink
								path="/dashboard/categories"
								className="flex gap-2 items-center"
								activeClassName="font-bold">
								<LuGrid2X2Check className="h-5 w-5" />
								Categories
							</NavLink>
						</li>
						<li>
							<NavLink
								path="/dashboard/customers"
								className="flex gap-2 items-center"
								activeClassName="font-bold">
								<LuUsers className="h-5 w-5" />
								Customers
							</NavLink>
						</li>
						<li>
							<NavLink
								path="/dashboard/employees"
								className="flex gap-2 items-center"
								activeClassName="font-bold">
								<LuNetwork className="h-5 w-5" />
								Employees
							</NavLink>
						</li>
						<li>
							<NavLink
								path="/dashboard/transactions"
								className="flex gap-2 items-center"
								activeClassName="font-bold">
								<LuChartLine className="h-5 w-5" />
								Transactions
							</NavLink>
						</li>
						<li>
							<NavLink
								path="/dashboard/region"
								className="flex gap-2 items-center"
								activeClassName="font-bold">
								<LuMap className="h-5 w-5" />
								Region
							</NavLink>
						</li>
						<li>
							<LogoutButton className="btn btn-sm btn-error">
								<LuLogOut className="w-5 h-5" />
								Logout
							</LogoutButton>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default AdminDashboardLayout;
