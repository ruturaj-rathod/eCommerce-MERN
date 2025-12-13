import FeaturedProducts from "./FeaturedProducts";
import FreshOnTheScene from "./FreshOnTheScene";
import HeroSection from "./Hero";
import ShopByCategory from "./ShopByCategory";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <ShopByCategory />
      <FreshOnTheScene />
    </>
  );
};

export default HomePage;
