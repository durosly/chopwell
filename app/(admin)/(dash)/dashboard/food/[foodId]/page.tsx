import connectMongo from "@/lib/connectMongo";
import FoodModel, { FoodData } from "@/models/food";
import { notFound } from "next/navigation";
import BasicInfoForm from "./_components/BasicInfoForm";
import CategoryTypeForm from "./_components/CategoryTypeForm";
import AvailabilityForm from "./_components/AvailabilityForm";
import ImageUploadForm from "./_components/ImageUploadForm";
import DeleteFoodBtn from "./_components/delete-btn";
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
			{/* name of each tab group should be unique */}
			<div className="tabs tabs-lift">
				<input
					type="radio"
					name="my_tabs_3"
					className="tab"
					aria-label="Basic Info"
					defaultChecked
				/>
				<div className="tab-content bg-base-100 border-base-300">
					<BasicInfoForm food={foodData} />
				</div>

				<input
					type="radio"
					name="my_tabs_3"
					className="tab"
					aria-label="Category Type"
				/>
				<div className="tab-content bg-base-100 border-base-300">
					<CategoryTypeForm food={foodData} />
				</div>

				<input
					type="radio"
					name="my_tabs_3"
					className="tab"
					aria-label="Availability"
				/>
				<div className="tab-content bg-base-100 border-base-300">
					<AvailabilityForm food={foodData} />
				</div>

				<input
					type="radio"
					name="my_tabs_3"
					className="tab"
					aria-label="Image Upload"
				/>
				<div className="tab-content bg-base-100 border-base-300">
					<ImageUploadForm food={foodData} />
				</div>
			</div>

			<DeleteFoodBtn foodId={foodId} />
		</div>
	);
}

export default FoodDetailsPage;
