"use client";

import { useRef } from "react";
import {
	// LuPrinter,
	LuFileText,
	LuImage,
} from "react-icons/lu";
import type { PopulatedOrder } from "../types";
import OrderReceipt from "./OrderReceipt";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

interface ReceiptActionsProps {
	order: PopulatedOrder;
}

export default function ReceiptActions({ order }: ReceiptActionsProps) {
	const receiptRef = useRef<HTMLDivElement>(null);

	// const handlePrint = () => {
	// 	if (!receiptRef.current) return;

	// 	const printWindow = window.open("", "_blank");
	// 	if (!printWindow) return;

	// 	const receiptContent = receiptRef.current.innerHTML;

	// 	printWindow.document.write(`
	// 	  <html>
	// 		<head>
	// 		  <title>Order Receipt #${order.code}</title>
	// 		  <link href="/tailwind.css" rel="stylesheet">
	// 		  <style>
	// 			body { margin: 0; padding: 20px; }
	// 			@media print {
	// 			  body { padding: 0; }
	// 			}
	// 		  </style>
	// 		</head>
	// 		<body>
	// 		  ${receiptContent}
	// 		</body>
	// 	  </html>
	// 	`);

	// 	printWindow.document.close();

	// 	// Wait for content to render before printing
	// 	printWindow.onload = () => {
	// 		printWindow.focus();
	// 		printWindow.print();
	// 		printWindow.close();
	// 	};
	// };

	const handleDownloadPDF = async () => {
		if (!receiptRef.current) return;
		try {
			const dataUrl = await toPng(receiptRef.current, {
				quality: 1.0,
				pixelRatio: 2,
				backgroundColor: "white",
			});

			const pdf = new jsPDF("p", "mm", "a4");
			const width = pdf.internal.pageSize.getWidth();
			const height =
				(receiptRef.current?.getBoundingClientRect().height * width) /
				receiptRef.current?.getBoundingClientRect().width;
			pdf.addImage(dataUrl, "PNG", 0, 0, width, height);
			pdf.save(`order-receipt-${order.code}.pdf`);
		} catch (error) {
			console.error("Error generating PDF:", error);
		}
	};

	const handleDownloadPNG = async () => {
		if (!receiptRef.current) return;
		try {
			const dataUrl = await toPng(receiptRef.current, {
				quality: 1.0,
				pixelRatio: 2,
				backgroundColor: "white",
			});
			const link = document.createElement("a");
			link.download = `order-receipt-${order.code}.png`;
			link.href = dataUrl;
			link.click();
		} catch (error) {
			console.error("Error generating PNG:", error);
		}
	};

	return (
		<>
			<div className="flex gap-2">
				{/* <button
					onClick={handlePrint}
					className="btn btn-outline btn-sm gap-2"
					aria-label="Print Receipt">
					<LuPrinter className="size-4" />
					Print Receipt
				</button> */}
				<button
					onClick={handleDownloadPDF}
					className="btn btn-outline btn-sm gap-2"
					aria-label="Download PDF">
					<LuFileText className="size-4" />
					Download PDF
				</button>
				<button
					onClick={handleDownloadPNG}
					className="btn btn-outline btn-sm gap-2"
					aria-label="Download PNG">
					<LuImage className="size-4" />
					Download PNG
				</button>
			</div>

			{/* Off-screen receipt for export */}
			<div className="fixed -left-[9999px] top-0">
				<div ref={receiptRef}>
					<OrderReceipt order={order} />
				</div>
			</div>
		</>
	);
}
