import AddProductModal from "./_components/add-product-modal";
import FeaturedItems from "./_components/featured-items";
// import ProductAddToast from "./_components/product-add-toast";
import ProductImage from "./_components/product-image";
import ProductInfo from "./_components/product-info";
import SearchFeaturedProducts from "./_components/search-featured-products";
import ToppingsCategory from "./_components/toppings-category";
import ToppingsItems from "./_components/toppings-items";

function ProductDetailsPage() {
	return (
		<main>
			<ProductImage />

			<ProductInfo />

			<SearchFeaturedProducts />

			<FeaturedItems />

			<ToppingsCategory />

			<ToppingsItems />

			{/* <ProductAddToast /> */}

			<AddProductModal />
		</main>
	);
}

export default ProductDetailsPage;
