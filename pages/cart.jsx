import {
  faArrowLeft,
  faArrowRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Price from "components/Price";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, cartSelector } from "redux/cartSlice";

const cart = () => {
  const cartItems = useSelector(cartSelector).cart;
  const [subtotal, setSubtotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item.product.price * item.qty;
    });
    setSubtotal(totalPrice);
  }, [cartItems]);

  return (
    <div className="container mx-auto mb-20 min-h-screen">
      <div className="container mx-auto mb-20 min-h-screen">
        <div className="min-h-80 max-w-2xl my-4 sm:my-8 mx-auto w-full">
          <table className="mx-auto">
            <thead>
              <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b border-palette-light">
                <th className="font-primary font-normal px-6 py-4">Product</th>
                <th className="font-primary font-normal px-6 py-4">Quantity</th>
                <th className="font-primary font-normal px-6 py-4 hidden sm:table-cell">
                  Price
                </th>
                <th className="font-primary font-normal px-6 py-4">Remove</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-palette-lighter">
              {cartItems.map((item) => (
                <tr
                  key={item.product.id}
                  className="text-sm sm:text-base text-gray-600 text-center"
                >
                  <td className="font-primary font-medium px-4 sm:px-6 py-4 flex items-center">
                    <Image
                      src={item.product.imageSrc}
                      alt={item.product.imageAlt}
                      height={64}
                      width={64}
                      className={`hidden sm:inline-flex`}
                    />
                    <Link passHref href={`/products/${item.product.id}`}>
                      <a className="pt-1 hover:text-palette-dark">
                        {item.product.name}
                      </a>
                    </Link>
                  </td>
                  <td className="font-primary font-medium px-4 sm:px-6 py-4">
                    <input
                      type="number"
                      inputMode="numeric"
                      id="variant-quantity"
                      name="variant-quantity"
                      min="1"
                      step="1"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          cartActions.updateCartItem({
                            product: item.product,
                            qty: parseInt(e.target.value),
                          })
                        )
                      }
                      className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm focus:border-palette-light focus:ring-palette-light"
                    />
                  </td>
                  <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell">
                    <Price
                      currency="$"
                      num={item.product.price}
                      numSize="text-lg"
                    />
                  </td>
                  <td className="font-primary font-medium px-4 sm:px-6 py-4">
                    <button
                      aria-label="delete-item"
                      className=""
                      onClick={() =>
                        dispatch(
                          cartActions.removeToCart({
                            product: item.product,
                          })
                        )
                      }
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter"
                      />
                    </button>
                  </td>
                </tr>
              ))}
              {subtotal === 0 ? null : (
                <tr className="text-center">
                  <td></td>
                  <td className="font-primary text-base text-gray-600 font-semibold uppercase px-4 sm:px-6 py-4">
                    Subtotal
                  </td>
                  <td className="font-primary text-lg text-palette-primary font-medium px-4 sm:px-6 py-4">
                    <Price currency="$" num={subtotal} numSize="text-xl" />
                  </td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col max-w-sm mx-auto gap-9">
          <Link href="/checkout">
            <a>
              Check Out
              <FontAwesomeIcon icon={faArrowRight} className="w-4 ml-2" />
            </a>
          </Link>
          <Link href="/product">
            <a>
              Back to All Products
              <FontAwesomeIcon icon={faArrowLeft} className="w-4 ml-2" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default cart;
