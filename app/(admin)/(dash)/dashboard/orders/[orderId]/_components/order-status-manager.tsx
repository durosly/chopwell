"use client";

import { updateOrderStatus } from "@/api/admin";
import { handleError } from "@/lib/handleError";
import { ToastRef } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ORDER_STATUSES = ["pending", "preparing", "delivering", "successful", "cancelled"] as const;

type OrderStatus = (typeof ORDER_STATUSES)[number];

const STATUS_LEVELS: Record<OrderStatus, number> = {
	pending: 0,
	preparing: 1,
	delivering: 2,
	successful: 3,
	cancelled: 3,
};

interface OrderStatusManagerProps {
	orderId: string;
	currentStatus: OrderStatus;
}

export default function OrderStatusManager({ orderId, currentStatus }: OrderStatusManagerProps) {
	const router = useRouter();
	const queryClient = useQueryClient();
	const toastRef = useRef<ToastRef>(undefined);
	const [status, setStatus] = useState<OrderStatus>(currentStatus);

	const { mutate: updateStatus, isPending } = useMutation({
		mutationFn: (status: OrderStatus) => updateOrderStatus(orderId, status),
		onMutate: () => {
			toastRef.current = toast.loading("Updating order status...", {
				duration: Infinity,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["order", orderId] });
			toast.success("Order status updated successfully", {
				id: toastRef.current,
			});
			router.refresh();
		},
		onError: (error: Error) => {
			const message = handleError(error);
			toast.error(message, { id: toastRef.current });
		},
		onSettled: () => {
			setTimeout(() => {
				toast.dismiss(toastRef.current);
			}, 5000);
		},
	});

	const handleStatusChange = (newStatus: OrderStatus) => {
		const currentLevel = STATUS_LEVELS[currentStatus];
		const newLevel = STATUS_LEVELS[newStatus];

		if (newLevel < currentLevel) {
			toast.error("Cannot update to a previous status level");
			return;
		}

		updateStatus(newStatus);
	};

	return (
		<div className="flex items-center gap-4">
			{currentStatus === "successful" ? (
				<div className="alert alert-success alert-soft">
					Order completed
				</div>
			) : currentStatus === "cancelled" ? (
				<div className="alert alert-error alert-soft">
					Order has been cancelled
				</div>
			) : (
				<form
					onSubmit={(e) => {
						e.preventDefault();

						handleStatusChange(status);
					}}
					className="bg-base-100 p-5 rounded-lg w-full">
					<h2 className="card-title text-lg">Update Order Status</h2>
					<p className="my-2">
						Current status:{" "}
						<span className="uppercase">{currentStatus}</span>
					</p>
					<p className="text-sm text-gray-500 mb-4">
						You can update the status of the order to the
						following:
					</p>
					<fieldset className="fieldset mb-2">
						<select
							name="status"
							className="select select-bordered w-full max-w-xs"
							value={status}
							onChange={(e) =>
								setStatus(
									e.target
										.value as OrderStatus
								)
							}
							disabled={isPending}>
							{ORDER_STATUSES.map((status) => (
								<option key={status} value={status}>
									{status
										.charAt(0)
										.toUpperCase() +
										status.slice(1)}
								</option>
							))}
						</select>
					</fieldset>
					<button
						type="submit"
						className="btn btn-primary"
						disabled={isPending}>
						{isPending ? "Updating..." : "Update Status"}
					</button>
				</form>
			)}
		</div>
	);
}
