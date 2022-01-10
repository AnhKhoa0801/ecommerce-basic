import MainLayout from "components/layout/MainLayout";
import { getListProduct, getProductById } from "dataService/productService";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "redux/cartSlice";

const ProductDetail = ({ productDetail }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(cartActions.addToCart({ productId: productDetail.id, qty: 1 }));
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Image gallery */}
        <div className="mt-6 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
          <Image
            src={productDetail.imageSrc}
            alt={productDetail.imageAlt}
            className="w-full h-full object-center object-cover"
            height={500}
            width={500}
          />
        </div>

        {/* Product info */}
        <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {productDetail.name}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:mt-0 lg:row-span-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">{productDetail.price}</p>

            <button
              type="button"
              className="mt-10 w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleAddToCart}
            >
              Add to cart
            </button>
          </div>

          <div className="py-10 lg:pt-6 lg:pb-16 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {productDetail.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
ProductDetail.Layout = MainLayout;
export default ProductDetail;

export async function getStaticProps(context) {
  const productId = context.params?.productId;
  const productDetail = getProductById(productId);
  return {
    props: {
      productDetail,
    },
  };
}

export async function getStaticPaths() {
  const products = getListProduct();

  return {
    paths: products.map((item) => ({
      params: { productId: String(item.id) },
    })),
    fallback: true,
    // fallback: 'blocking', will block page when server run static props
  };
}
