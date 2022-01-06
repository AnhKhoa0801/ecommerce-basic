import EmptyLayout from "components/layout/EmptyLayout";
import "styles/globals.scss";
import { Head } from "next/head";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
