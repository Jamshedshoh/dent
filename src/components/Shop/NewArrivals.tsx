import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useShop } from "../../contexts/ShopContext";
import { ProductCard } from "./ProductCard";

interface NewArrivalsProps {
  limit?: number;
}

export const NewArrivals = ({ limit }: NewArrivalsProps) => {
  const { newArrivals: products, addToCart } = useShop();
  const displayProducts = limit ? products.slice(0, limit) : products;

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-semibold text-gray-800">New Arrivals</h2>
          <Link
            to="/shop/catalog/new"
            className="flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            View All New Arrivals
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} badge="New" />
          ))}
          {displayProducts.length === 0 && (
            <p className="text-gray-500 text-center col-span-full">
              No new arrivals available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
