import { FaShoppingCart } from "react-icons/fa";

const SwiftCartBrand = () => {
  return (
    <div className="flex items-center gap-2 text-green-700">
      <FaShoppingCart className="text-2xl sm:text-3xl md:text-4xl text-green-600 drop-shadow-md" />
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
        <span className="text-gray-900">Swift</span>
        <span className="text-green-600">Cart</span>
      </h1>
    </div>
  );
};

export default SwiftCartBrand;
