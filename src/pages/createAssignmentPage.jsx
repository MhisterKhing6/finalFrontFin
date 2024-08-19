import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AssignmentCreationForm } from "../components/assignmentForm"
import { Loading } from "../components/loading"
import { LecturerNavbar } from "../components/navbarLecturer"
import { UserProfile } from "../components/userProfile"
import { LecturerContext } from "../context/lecturerContext"

const CreateAssignment = () => {
    const [loading, setLoading] = useState(true)
    const redirect = useNavigate()
    const {loadDetails, authenticated, setAuthenticated, lecturer, setLecturer} = useContext(LecturerContext)
    useEffect(()=> {
        loadDetails(setLecturer, lecturer,setLoading, setAuthenticated,redirect)
    },[authenticated])
   
    return (
        <>
        {loading? <Loading />: <>
        <LecturerNavbar />
        <UserProfile name={lecturer.name} profileUrl={lecturer.profilePic} />
        <AssignmentCreationForm />
        </> }
        </>
    )
}

export { CreateAssignment }
