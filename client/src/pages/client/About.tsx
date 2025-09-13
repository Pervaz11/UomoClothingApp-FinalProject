import PartnersSlider from "../../components/PartnerSlider";
import Services from "../../components/Services";

const About = () => {
  return (
    <>
      <section>
        <h1 className="uppercase text-4xl font-bold sm:mx-30 m-10 mx-25">
          About
          uom<span className="text-red-700">o</span>
        </h1>
        <div>
          <img
            src="https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fabout%2Fabout-1.jpg&w=3840&q=75"
            alt="Uomo about"
            className="mx-auto p-2"
          />
        </div>
      </section>
      <section className="max-w-5xl mx-auto px-6 py-12 text-gray-700 leading-relaxed">
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 uppercase">Our Story</h2>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
            dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p className="mt-4">
            Saw wherein fruitful good days image them, midst, waters upon, saw. Seas
            lights seasons. Fourth hath rule Evening Creepeth own lesser years itself
            so seed fifth for grass evening fourth shall you're unto that. Had.
            Female replenish for yielding so saw all one to yielding grass you'll air
            sea it, open waters subdue, hath. Brought second Made. Be. Under male
            male, firmament, beast had light after fifth forth darkness thing hath
            sixth rule night multiply him life give they're great.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-semibold mb-3 uppercase">Our Mission</h2>
            <p>
              Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3 uppercase">Our Vision</h2>
            <p>
              Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="relative overflow-hidden rounded-2xl shadow-lg mx-auto max-w-3xl group">
            <img
              src="https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fabout%2Fabout-2.jpg&w=1080&q=75"
              alt="Uomo about"
              className="transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 border-4 border-transparent group-hover:border-white/40 rounded-2xl transition duration-500"></div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 uppercase">The Company</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet sapien
              dignissim a elementum. Sociis metus, hendrerit mauris id in. Quis sit
              sit ultrices tincidunt euismod luctus diam. Turpis sodales orci etiam
              phasellus lacus id leo. Amet turpis nunc, nulla massa est viverra
              interdum. Praesent auctor nulla morbi non posuere mattis. Arcu eu id
              maecenas cras.
            </p>
          </div>
        </div>
        <div>
          <Services />
        </div>
        <div>
          <PartnersSlider />
        </div>
      </section>
    </>
  );
};

export default About;
