/** protected route */

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LecturerDashboard } from "../components/LecturerDashboard.jsx"
import { Footer } from "../components/footer.jsx"
import { LecturerContext } from "../context/lecturerContext.jsx"

import { Loading } from "../components/loading.jsx"
import { LecturerNavbar } from "../components/navbarLecturer.jsx"
import { UserProfile } from "../components/userProfile.jsx"
const LecturerDashboardPage = () => {
    const [loading, setLoading] = useState(true)
    const redirect = useNavigate()
    const {loadDetails, authenticated, setAuthenticated, lecturer, setLecturer} = useContext(LecturerContext)
    useEffect(()=> {
        loadDetails(setLecturer, lecturer,setLoading, setAuthenticated,redirect)
    },[authenticated])
   

      return  (
      <> {loading ? <Loading />:
      <>
      <div style={{minHeight: "25vh"}} className="my-0">
      <LecturerNavbar />
        <UserProfile name={lecturer.name} profileUrl={lecturer.profilePic} />
      </div>
      <div style={{minHeight: "65vh"}} className="my-0">
      <LecturerDashboard />
      </div>
      <Footer />
      </> }
      </>

      )
    
}

export { LecturerDashboardPage }
