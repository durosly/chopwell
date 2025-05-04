import connectMongo from "@/lib/connectMongo";
import FoodModel, { FoodData } from "@/models/food";
import { notFound } from "next/navigation";
import BasicInfoForm from "./_components/BasicInfoForm";
import CategoryTypeForm from "./_components/CategoryTypeForm";
import AvailabilityForm from "./_components/AvailabilityForm";
import ImageUploadForm from "./_components/ImageUploadForm";

async function FoodDetailsPage({ params }: { params: Promise<{ foodId: string }> }) {
	const { foodId } = await params;
	await connectMongo();

	const food = await FoodModel.findById(foodId);

	if (!food) {
		return notFound();
	}

	const foodData = JSON.parse(JSON.stringify(food)) as FoodData & { _id: string };

	return (
		<div className="container mx-auto p-4 space-y-6">
			<h1 className="text-3xl font-bold mb-6">Edit Food Item</h1>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
				<BasicInfoForm food={foodData} />
				<CategoryTypeForm food={foodData} />
				<AvailabilityForm food={foodData} />
				<ImageUploadForm food={foodData} />
			</div>
		</div>
	);
}

export default FoodDetailsPage;
