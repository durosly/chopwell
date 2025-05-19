import connectMongo from "@/lib/connectMongo";
import { handleError } from "@/lib/handleError";
import pusherServer from "@/lib/pusher-server";
import NotificationModel from "@/models/notifications";
import OrderModel from "@/models/order";
import TransactionModel from "@/models/transactions";
import UserModel from "@/models/user";
import WalletModel from "@/models/wallet";
import commaNumber from "@/utils/comma-number";
import { withAdminAuth } from "@/utils/with-admin-auth";
import { after } from "next/server";

async function updateStatus(
	request: Request,
	{ params }: { params: Promise<{ orderId: string }> }
) {
	try {
		const { status } = await request.json();

		if (!status) {
			return Response.json({ message: "Status is required" }, { status: 400 });
		}

		await connectMongo();
		const { orderId } = await params;
		const order = await OrderModel.findById(orderId);

		if (!order) {
			return Response.json({ message: "Order not found" }, { status: 404 });
		}

		order.status = status;
		await order.save();

		after(() => {
			// refund user paymenet if status is cancelled
			async function refundUserPayment(orderId: string) {
				await connectMongo();
				const order = await OrderModel.findById(orderId);
				if (!order) {
					return;
				}

				const userId = order._userId;
				const user = await UserModel.findById(userId);
				if (!user) {
					return;
				}

				await WalletModel.findOneAndUpdate(
					{ _userId: userId },
					{ $inc: { balance: Number(order.totalPrice) } }
				);

				await NotificationModel.create({
					_userId: userId,
					title: `Refund for order ${order.code}`,
					description: `You have been refunded ${commaNumber(order.totalPrice)} as your order ${order.code} has been cancelled.`,
					link: "/user/orders",
					linkDescription: "view order",
				});

				await TransactionModel.create({
					_userId: userId,
					amount: Number(order.totalPrice),
					type: "refund",
					description: `Refund for order ${order.code}`,
				});

				// trigger notification to user
				pusherServer.trigger(
					`private-notifications-${order._userId}`,
					"notification-count",
					{
						count: 1,
					}
				);
			}

			if (status === "cancelled") {
				refundUserPayment(orderId);
			}
		});

		return Response.json({ message: "Order status updated successfully" });
	} catch (error) {
		const message = handleError(error);
		return Response.json({ message }, { status: 500 });
	}
}

export default withAdminAuth(updateStatus);
