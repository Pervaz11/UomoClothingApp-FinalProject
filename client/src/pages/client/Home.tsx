import CustomSlider from "../../components/HeroSlider"
import NewsletterModal from "../../components/NewsLettetModal"

const Home = () => {
  return (
    <>
      <section><NewsletterModal /></section>
      {/* Hero Slider */}
      <section>
        <CustomSlider />
      </section>
    </>
  )
}

export default Home