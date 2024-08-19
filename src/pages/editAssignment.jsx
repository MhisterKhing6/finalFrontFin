import { useContext, useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { AssignmentCreationForm } from "../components/assignmentForm"
import { Loading } from "../components/loading"
import { LecturerNavbar } from "../components/navbarLecturer"
import { UserProfile } from "../components/userProfile"
import { LecturerContext } from "../context/lecturerContext"
import { getFromBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { getToken } from "../utils/localstorage"


const EditAssignment = () => {

    const [loading, setLoading] = useState(false)
    const redirect = useNavigate()
    const [loadingAssignment, setLoadingAssignment] = useState(true)
    const [assignment, setAssignment]  = useState()
    const {assId} = useParams()
    const {loadDetails, authenticated, setAuthenticated, lecturer, setLecturer} = useContext(LecturerContext)
    useEffect(()=> {
        const loadProfile = async () => {
            await loadDetails(setLecturer, lecturer,setLoading, setAuthenticated,redirect)
        }
        const loadAss = async () => {
            let url = "/user/lecturer/assignment/" + assId
            let response = await getFromBackend(url, getToken(token.lecturerTokenKey))
            setLoadingAssignment(false)
            setAssignment({...response.data, id:assId})
            console.log(response.data)
        }
        loadAss()
         loadProfile()
         
    },[authenticated])
   
    return (
        <>
        {loading || loadingAssignment ? <Loading /> : 
        <>
        <LecturerNavbar />
        <UserProfile name={lecturer.name} profileUrl={lecturer.profilePic}/>
        <div className="w-100 min-vh-100">
        <Container>
            <div className="border-bottom mb-5 pt-5">
            <h4 style={{fontWeight:"bolder"}} className=" mb-3 mt-2">Edit Assignment</h4>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-between">
                    <p className="text-muted">
                    {assId}
                    </p>
                    </div>
                </div>
                <Container className="my-4">
                <AssignmentCreationForm ass = {assignment} />
                </Container>
        </Container>
        </div>
        </>
            }
        </>
    )
}
export { EditAssignment }
