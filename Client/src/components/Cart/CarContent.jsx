import React from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";

const CarContent = ({ cart, userId, guestId }) => {
  const dispatch = useDispatch();

  // Handle adding or substracting to cart
  const handleAddToCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      dispatch(
        updateCartItemQuantity({
          productId,
          quantity: newQuantity,
          guestId,
          userId,
          size,
          color,
        })
      );
    }
  };
  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ productId, guestId, userId, size, color }));
  };

  // const cartProducts = [
  //   {
  //     productId: 1,
  //     name: "T-Shirt",
  //     size: "M",
  //     color: "Red",
  //     quantity: 1,
  //     price: 150,
  //     image: "https://picsum.photos/200?random=1",
  //   },
  //   {
  //     productId: 2,
  //     name: "Jeans",
  //     size: "L",
  //     color: "Blue",
  //     quantity: 1,
  //     price: 200,
  //     image: "https://picsum.photos/200?random=2",
  //   },
  //   {
  //     productId: 3,
  //     name: "Top",
  //     size: "M",
  //     color: "Pink",
  //     quantity: 1,
  //     price: 150,
  //     image: "https://picsum.photos/200?random=3",
  //   },
  //   {
  //     productId: 4,
  //     name: "T-Shirt",
  //     size: "M",
  //     color: "Orange",
  //     quantity: 1,
  //     price: 150,
  //     image: "https://picsum.photos/200?random=4",
  //   },
  //   {
  //     productId: 5,
  //     name: "Shirt",
  //     size: "M",
  //     color: "Blue",
  //     quantity: 1,
  //     price: 150,
  //     image: "https://picsum.photos/200?random=5",
  //   },
  // ];
  return (
    <div>
      {cart.products.map((product, index) => (
        <div
          key={index}
          className="flex items-start justify-between py-4 border-b"
        >
          <div className="flex items-start">
            <img
              src={
               product.image
              }
              alt={product.name}
              className="w-20 h-24 object-cover mr-4 rounded"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                Size: {product.size} | color: {product.color}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      -1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button
                  onClick={() =>
                    handleAddToCart(
                      product.productId,
                      +1,
                      product.quantity,
                      product.size,
                      product.color
                    )
                  }
                  className="border rounded px-2 py-1 text-xl font-medium"
                >
                  +
                </button>
              </div>
            </div>
            <p className="ml-4">₹{product.price.toLocaleString()}</p>
            <button
              onClick={() =>
                handleRemoveFromCart(
                  product.productId,
                  product.size,
                  product.color
                )
              }
            >
              <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarContent;
