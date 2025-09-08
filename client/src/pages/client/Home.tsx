import { Link } from "react-router-dom"
import CustomSlider from "../../components/HeroSlider"
import NewsletterModal from "../../components/NewsLettetModal"
import gridImg1 from "../../assets/collection_grid_1.jpg"
import gridImg2 from "../../assets/collection_grid_2.jpg"
import gridImg3 from "../../assets/collection_grid_3.jpg"

const Home = () => {
  return (
    <>
      <section><NewsletterModal /></section>
      {/* Hero Slider */}
      <section>
        <CustomSlider />
      </section>
      <section>
        <section className="p-10">
          <div className="grid grid-cols-1 md:grid-cols-7 grid-rows-[repeat(5,_minmax(0,_1fr))] gap-5 h-auto md:h-[550px]">
            {/* 1 — Left large image */}
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

            {/* 2 — Top right image */}
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

            {/* 3 — Bottom right small image */}
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

            {/* 4 — Bottom right colored block */}
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
      </section>
    </>
  )
}

export default Home