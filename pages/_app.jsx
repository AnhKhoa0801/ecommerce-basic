import EmptyLayout from "components/layout/EmptyLayout";
import { Provider } from "react-redux";
import store from "redux/store";
import "styles/globals.scss";

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? EmptyLayout;

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
