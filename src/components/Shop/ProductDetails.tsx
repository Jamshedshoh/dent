import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useShop } from "../../contexts/ShopContext";
import { ArrowLeft, ChevronRight } from "lucide-react";

import { Image } from "lucide-react";
import { Layout } from "./Layout";
import { ProductCard } from "./ProductCard";

export const ImageSkeleton = () => {
  return (
    <div className="relative w-full">
      <div className="w-96 h-96 object-cover flex items-center border bg-gray-200">
        <div className="mx-auto">
          <Image />
        </div>
      </div>
    </div>
  );
};

const imageUrls = [
  "https://picsum.photos/300/200?random=1",
  "https://picsum.photos/300/200?random=2",
  "https://picsum.photos/300/200?random=3",
];

interface ProductImagesProps {
  imageUrls?: string[];
}

export const ProductImages = ({
  imageUrls: propImageUrls,
}: ProductImagesProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageUrls = propImageUrls || [];

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  const nextSlide = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
  };

  const prevSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="flex">
      <div className="flex flex-col mr-2">
        {imageUrls.map((url: string, index: number) => (
          <img
            key={`thumbnail-${index}`}
            src={url}
            alt={`Product thumbnail ${index + 1}`}
            className={`w-20 h-20 object-cover mb-2 cursor-pointer border ${
              index === currentImageIndex
                ? "border-blue-500"
                : "border-transparent hover:border-gray-300"
            } transition-border duration-200`}
            onClick={() => handleThumbnailClick(index)}
          />
        ))}
      </div>

      {/* Main product image slider */}
      <div className="relative">
        {!imageUrls || (imageUrls.length === 0 && <ImageSkeleton />)}
        {imageUrls && imageUrls.length > 0 && (
          <React.Fragment>
            <img
              src={imageUrls[currentImageIndex]}
              alt={`Product image ${currentImageIndex + 1}`}
              className="w-full h-96 object-cover rounded-md"
            />
            <button
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-100 bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full"
              onClick={prevSlide}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 bg-opacity-50 hover:bg-opacity-80 p-2 rounded-full"
              onClick={nextSlide}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </React.Fragment>
        )}
        {/* Optional: Slider controls (if needed later) */}
      </div>
    </div>
  );
};

export const ProductDetails = () => {
  const { id: productId } = useParams();
  const [product, setProduct] = useState<any>();

  const { products, fetchProductById } = useShop();

  const getProduct = async () => {
    if (productId) {
      const data = await fetchProductById(productId);
      console.log({ data });
      setProduct(data);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {product ? (
          <div>
            <div className="mb-4">
              <Link
                to="/shop/catalog"
                className="text-blue-600 hover:text-blue-700"
              >
                &larr; Back to Catalog
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="mr-0 ml-auto">
                <ProductImages
                  imageUrls={product.image ? [product.image] : imageUrls}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
                <p className="text-gray-600 mb-4">${product.price}</p>
                <p className="text-gray-700 mb-6">{product.description}</p>

                <div className="flex items-center mb-6">
                  <span className="mr-3">Quantity:</span>
                  <div className="flex items-center border rounded">
                    <button
                      className="px-3 py-2 hover:bg-gray-100 focus:outline-none"
                      // onClick={() => handleQuantityChange(-1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      className="w-12 text-center focus:outline-none"
                      value={1} // quantity
                      min="1"
                      // onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                    <button
                      className="px-3 py-2 hover:bg-gray-100 focus:outline-none"
                      // onClick={() => handleQuantityChange(1)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  // onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>Loading product details...</div> // Or a better loading state
        )}
        <div className="grid grid-cols-2 space-x-2">
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {/* Reviews Section */}
            <div className="space-y-4">
              <div
                className="space-y-4 max-h-[400px] overflow-y-auto pr-2"
                style={{
                  "--webkit-scrollbar-width": "5px",
                  "--webkit-scrollbar-track-background": "transparent",
                  "--webkit-scrollbar-thumb-background": "#ddd",
                  "--webkit-scrollbar-thumb-hover-background": "#bbb",
                  "scrollbar-width": "thin",
                  "scrollbar-color": "silver transparent",
                }}
              >
                <div className="border rounded p-4">
                  <p className="italic text-gray-700">
                    "This product is amazing! I highly recommend it."
                  </p>
                  <p className="text-sm text-gray-500">- John Doe</p>
                </div>
                <div className="border rounded p-4">
                  <p className="italic text-gray-700">
                    "Great quality and fast delivery. Very satisfied."
                  </p>
                  <p className="text-sm text-gray-500">- Jane Smith</p>
                </div>
                <div className="border rounded p-4">
                  <p className="italic text-gray-700">
                    "Great quality and fast delivery. Very satisfied."
                  </p>
                  <p className="text-sm text-gray-500">- Jane Smith</p>
                </div>
                <div className="border rounded p-4">
                  <p className="italic text-gray-700">
                    "Great quality and fast delivery. Very satisfied."
                  </p>
                  <p className="text-sm text-gray-500">- Jane Smith</p>
                </div>
                <div className="border rounded p-4">
                  <p className="italic text-gray-700">
                    "Great quality and fast delivery. Very satisfied."
                  </p>
                  <p className="text-sm text-gray-500">- Jane Smith</p>
                </div>
                <div className="border rounded p-4">
                  <p className="italic text-gray-700">
                    "Great quality and fast delivery. Very satisfied."
                  </p>
                  <p className="text-sm text-gray-500">- Jane Smith</p>
                </div>
              </div>
              {/* Add more review items here */}
            </div>

            {/* Reply Input or Sign Up/Login */}
            {/* Assuming you have an auth context to check if user is logged in */}
            {/* Example: const { user } = useAuth(); */}
            {true ? ( // Replace 'true' with your actual user authentication check (e.g., user !== null)
              <div className="mt-6">
                <textarea
                  placeholder="Write your review..."
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
                <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Submit Review
                </button>
              </div>
            ) : (
              <div className="mt-6">
                <p className="mb-2">Sign up or Login to leave a review:</p>
                <div className="flex space-x-2">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Sign Up
                  </button>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">See Also</h2>
            <div className="flex space-x-2">
              <div
                className="flex space-x-2 overflow-x-auto"
                style={{
                  "--webkit-scrollbar-width": "5px",
                  "--webkit-scrollbar-track-background": "transparent",
                  "--webkit-scrollbar-thumb-background": "#ddd",
                  "--webkit-scrollbar-thumb-hover-background": "#bbb",
                  "scrollbar-width": "thin",
                  "scrollbar-color": "silver transparent",
                }}
              >
                {products.map((product) => (
                  <div key={product.id} className="w-72 shrink-0">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
