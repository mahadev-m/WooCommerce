import ShopContextProvider from "../context/shop";
import Nav from "../components/nav";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  return (
    <ShopContextProvider>
      <Nav />
      <div className="lg:max-w-screen-2xl flex lg:w-full lg:m-auto md:m-auto lg:shadow-xl lg:px-6 lg:py-6">
        <Component {...pageProps} />
      </div>
    </ShopContextProvider>
  );
}
export default MyApp;
