import Image from "next/image"
import Searchbar from "../components/Searchbar"
import HeroCarousel from "../components/HeroCarousel"
import {getAllProducts} from "@/lib/actions";
import ProductCard from "@/components/ProductCard";
const home  = async () => {

  const allProducts = await getAllProducts();

  return (
    <>
    <section className="px-6 md:px-20 py-24">
      <div className="flex max-xl:flex-col gap-16">
        <div className="flex flex-col justify-center">
          <p className="small-text">
            Smart Shopping Starts Here:
            <Image src="/assets/icons/arrow-right.svg" alt="arrow-right" width={16} height={16} />
          </p>
          <h1 className="head-text">
            Unleash the Power of
            <span className="text-primary"> AmazonWatchDog</span> 
          </h1>
          <p className="mt-6">
            Powerful, self-serve product and growth analytics to
            help you convert , engage and retain more.
          </p>
          <Searchbar />
        </div>
          <HeroCarousel/>
      </div>
      </section> 

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) =>{
            return(
              <ProductCard key = {product._id} product ={product} /> // product is an object having multiple parameters , if you only use product their then you'll get an error stating maximum call stack size exceeded , which is an error when we are trapped in an infinite loop and it's weird how we are getting it here.
            );
          })}
        </div>
      </section>
    </>
  )
}

export default home 