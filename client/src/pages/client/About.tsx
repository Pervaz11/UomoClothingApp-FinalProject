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

    </>
  );
};

export default About;
