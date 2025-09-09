import { Link } from "react-router-dom"
import CustomSlider from "../../components/HeroSlider"
import NewsletterModal from "../../components/NewsLettetModal"
import gridImg1 from "../../assets/collection_grid_1.jpg"
import gridImg2 from "../../assets/collection_grid_2.jpg"
import gridImg3 from "../../assets/collection_grid_3.jpg"
import springDress from "../../assets/deal_timer_bg.jpg"
import Products from "../../components/Products"
import CountdownTimer from "../../components/TimeUnit"
import TwoCards from "../../components/TwoCards"
import Posters from "../../components/Posters"
import Services from "../../components/Services"

const Home = () => {
  return (
    <>
      <section><NewsletterModal /></section>
      {/* Hero Slider */}
      <section>
        <CustomSlider />
      </section>
      <section className="p-10">
        <div className="grid grid-cols-1 md:grid-cols-7 grid-rows-[repeat(5,_minmax(0,_1fr))] gap-5 h-auto md:h-[550px]">
          <div
            className="md:col-span-3 md:row-span-5 p-7 bg-cover bg-center relative h-[250px] md:h-auto"
            style={{ backgroundImage: `url(${gridImg1})` }}
          >
            <div className="absolute bottom-10 left-7 text-black space-y-2">
              <h6 className="text-base">Hot List</h6>
              <h2 className="text-3xl">
                <span className="font-bold">WOMEN</span> COLLECTION
              </h2>
              <Link to={"#"} className="uppercase text-black transition-all duration-300 hover:text-black before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-20 text-sm sm:text-lg relative mt-2">
                Shop Now
              </Link>
            </div>
          </div>

          <div
            className="md:col-span-4 md:row-span-2 md:col-start-4 md:row-start-1 p-7 bg-cover bg-center relative h-[250px] md:h-auto"
            style={{ backgroundImage: `url(${gridImg2})` }}
          >
            <div className="absolute bottom-6 left-7 text-black space-y-2">
              <h6 className="text-base">Hot List</h6>
              <h2 className="text-3xl">
                <span className="font-bold">MEN</span> COLLECTION
              </h2>
              <p className="uppercase text-black transition-all duration-300 hover:text-black before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-20 text-sm sm:text-lg relative mt-2">
                Shop Now
              </p>
            </div>
          </div>

          <div
            className="md:col-span-2 md:row-span-3 md:col-start-4 md:row-start-3 bg-cover bg-center relative h-[250px] md:h-auto"
            style={{ backgroundImage: `url(${gridImg3})` }}
          >
            <div className="absolute bottom-6 left-7 text-black space-y-2">
              <h6 className="text-base">Hot List</h6>
              <h2 className="text-3xl">
                <span className="font-bold">KIDS</span> COLLECTION
              </h2>
              <p className="uppercase text-black transition-all duration-300 hover:text-black before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-20 text-sm sm:text-lg relative mt-2">
                Shop Now
              </p>
            </div>
          </div>

          <div className="bg-[#F5E6E0] flex flex-col justify-end gap-2 p-6 relative h-[320px] md:col-span-2 md:row-span-3 md:col-start-6 md:row-start-3">
            <h1 className="text-xl font-semibold">E-Gift Cards</h1>
            <p className="text-sm text-gray-700">
              Surprise someone with the gift they<br />
              really want.
            </p>
            <h6 className="uppercase text-black transition-all duration-300 hover:text-black before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-black before:transition-all before:duration-300 hover:before:w-20 text-sm sm:text-lg relative mt-2">
              Shop Now
            </h6>
          </div>
        </div>
      </section>
      <section>
        <div className='flex'>
          <h1 className='text-3xl flex font-medium uppercase mx-auto'>Our Trendy <ol className='font-bold'>&nbsp;PRODUCTS</ol></h1>
        </div>
        <div>
          <Products />
        </div>
        <Link to={"#"} className="group text-xl mt-7 justify-center relative flex items-center gap-1 font-medium text-gray-800 hover:text-black transition-all duration-300">
          <span className="transition-all duration-300 group-hover:tracking-wider group-hover:font-semibold">
            SHOW MORE
          </span>
          <span className="transition-all duration-300 opacity-0 font-extrabold itens-center group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-0 text-2xl">
            →
          </span>
        </Link>
      </section>
      <section className="sm:m-8 m-5">
        <div
          className="relative bg-center bg-no-repeat bg-cover overflow-hidden
      w-full h-[500px] xs:h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px]
      flex flex-col justify-center items-start px-4 sm:px-10"
          style={{
            backgroundImage: `url(${springDress})`,
          }}
        >
          <div className="flex items-center gap-2 text-red-700 mt-16 sm:mt-28 text-xs sm:text-sm font-semibold uppercase">
            <hr className="w-10 border border-red-700" />
            Deal of the week
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold uppercase mt-4">
            Spring <span className="font-bold">Collection</span>
          </h1>

          <h6 className="mt-3 text-sm sm:text-base mx-1 sm:mx-0 relative inline-block cursor-pointer
            before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0
            before:bg-black before:transition-all before:duration-300 hover:before:w-10">
            SHOP NOW
          </h6>

          <div className="mt-6">
            <CountdownTimer />
          </div>
        </div>
      </section>
      <section className="p-7">
        <TwoCards />
      </section>
      <section className="p-7">
        <Posters />
      </section>
      <section className="p-10">
        <Services />
      </section>
    </>
  )
}

export default Home