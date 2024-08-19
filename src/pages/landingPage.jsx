import { Banner } from '../components/banner'
import { Footer } from '../components/footer'
import { GeneralNavbar } from '../components/headerLanding'
import { Services } from '../components/services'

function LandingPage() {

  return (
    <>
     <GeneralNavbar />
     <Banner />
     <Services />
     <Footer />
    </>
  )
}

export { LandingPage }

