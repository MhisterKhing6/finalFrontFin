import { Footer } from '../components/footer'
import { GeneralNavbar } from '../components/headerLanding'
import { LecturerRegistrationForm } from '../components/lecturerReg'
import { VerificationContextProvider } from '../context/verificationContext'

function LecturerRegistrationPage() {

  return (
    <>
    <VerificationContextProvider>
     <GeneralNavbar />
     <LecturerRegistrationForm />
     <Footer />
    </VerificationContextProvider>
    </>
  )
}

export { LecturerRegistrationPage }

