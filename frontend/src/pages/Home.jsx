import BestSeller from "../components/BestSeller"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import NewsLetterBox from "../components/NewsLetterBox"
import OurPolicy from "../components/OurPolicy"


const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>
      <Footer/>
    </div>
  )
}

export default Home