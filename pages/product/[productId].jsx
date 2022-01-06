import MainLayout from "components/layout/MainLayout";
import React from "react";

const ProductDetail = ({ productId }) => {
  return <div> ProductDetail: {productId}</div>;
};
ProductDetail.Layout = MainLayout;
export default ProductDetail;

export async function getStaticProps(context) {
  const productId = context.params?.productId;
  return {
    props: {
      productId,
    },
  };
}

export async function getStaticPaths() {
  const ids = ["1", "2", "3", "4"];
  return {
    paths: ids.map((item) => ({ params: { productId: item } })),
    fallback: true,
    // fallback: 'blocking', will block page when server run static props
  };
}
