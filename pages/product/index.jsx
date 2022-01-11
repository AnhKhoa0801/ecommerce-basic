import MainLayout from "components/layout/MainLayout";
import Price from "components/Price";
import { getListProduct } from "dataService/productService";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function product({ products }) {
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <a className="group">
                <div className="w-full  aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <Image
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    width={400}
                    height={400}
                    size={10}
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  <Price currency="$" num={product.price} numSize="text-1xl" />
                </p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
product.Layout = MainLayout;
export default product;

export async function getServerSideProps() {
  const products = getListProduct();
  return {
    props: {
      products,
    },
  };
}
