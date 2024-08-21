/** protected route */

import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LecturerDashboard } from "../components/LecturerDashboard.jsx"
import { Footer } from "../components/footer.jsx"
import { LecturerContext } from "../context/lecturerContext.jsx"

import { Loading } from "../components/loading.jsx"
import { LecturerNavbar } from "../components/navbarLecturer.jsx"
import { UserProfile } from "../components/userProfile.jsx"
import { getFromBackend } from "../utils/backendCalls.js"
import { getToken } from "../utils/localstorage.js"
import { token } from "../utils/config.js"
const LecturerDashboardPage = () => {
    const [loading, setLoading] = useState(true)
    const redirect = useNavigate()
    const [loadingAss, setLoadingAss] = useState(true)
    const [submission,setSubs] = useState([])
    const {loadDetails,loadAssignment,assignment, setAssignment, authenticated, setAuthenticated, lecturer, setLecturer} = useContext(LecturerContext)
    useEffect(()=> {
        loadDetails(setLecturer, lecturer,setLoading, setAuthenticated,redirect)
    },[authenticated])
   
    useEffect(()=> {
      loadAssignment(assignment, setAssignment,setLoadingAss)
  },[])

  useEffect(()=> {
    loadAssignment(assignment, setAssignment,setLoadingAss)
},[])

useEffect(()=> {
  const loadSubmission = async () => {
    let url = '/coder/lecturer/submission'
    let response = await getFromBackend(url, getToken(token.lecturerTokenKey))
    setSubs(response.data)
  }
  loadSubmission()
},[])



      return  (
      <> {loading || loadingAss ? <Loading />:
      <>
      <div style={{minHeight: "25vh"}} className="my-0">
      <LecturerNavbar />
        <UserProfile name={lecturer.name} profileUrl={lecturer.profilePic} />
      </div>
      <div style={{minHeight: "65vh"}} className="my-0">
      <LecturerDashboard ass={assignment} subs={submission} />
      </div>
      <Footer />
      </> }
      </>

      )
    
}

export { LecturerDashboardPage }
