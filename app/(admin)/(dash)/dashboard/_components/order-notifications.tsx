"use client";

import pusherClient from "@/lib/pusher-client";
import commaNumber from "@/utils/comma-number";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";
import { toast } from "sonner";

function OrderNotifications() {
	const router = useRouter();

	useEffect(() => {
		const channel = pusherClient.subscribe("private-notifications-admin");
		channel.bind(
			"new-order",
			(data: {
				orderId: string;
				orderCode: string;
				orderTotal: number;
				username: string;
			}) => {
				toast.success(`New order from ${data.username}`, {
					description: `Order #${data.orderCode.toUpperCase()} for ${commaNumber(data.orderTotal)}`,
					action: {
						label: "View order",
						onClick: () => {
							router.push(
								`/dashboard/orders/${data.orderId}`
							);
						},
					},
				});
			}
		);
	}, [router]);

	return null;
}

export default OrderNotifications;
