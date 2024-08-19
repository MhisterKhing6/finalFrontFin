import { useContext, useRef, useState } from "react"
import { Col, Dropdown, Image, Stack } from "react-bootstrap"
import { CiViewBoard } from "react-icons/ci"
import { FaHistory, FaHome, FaProjectDiagram, FaSignOutAlt } from "react-icons/fa"
import { RiProfileFill } from "react-icons/ri"
import profile from "../assets/prfileAvatar.png"
import { StudentContext } from "../context/studentContext"
import { logout } from "../utils/localstorage"
import { StudentProfile } from "./studentProfile"
import { useNavigate } from "react-router-dom"

const StudentDashboardNav = ({r, scores, home, ass, setHome, setScores, setAss}) => {
    const homeRef = useRef(null)
    const scoreRef = useRef(null)
    const assignmentRef = useRef(null)
    const recordRef = useRef(null)
    const [showProfile, showModal] = useState(false)
    const redirect = useNavigate()
    const {student, authenticated, setAuthenticated} = useContext(StudentContext)
    return (
        <>
        <StudentProfile show={showProfile} close={() => showModal(false)} />
        <Col  xs={2} md={3} lg={2} className="min-vh-100 py-3 p-0 navStudent text-white navBorder"  >
            <Stack className="align-items-start m-0 px-0 py-2" style={{borderRadius:"30px"}}>
            <Dropdown className=" mx-auto p-md-1 mw-100">
            <Dropdown.Toggle className="overflow-hidden w-100 border-0 bg-transparent m-0  px-2 shadow-lg">
             <Stack direction="horizontal" className="px-2 w-100   justify-content-center align-items-center">
                <Image roundedCircle className="mx-2" width="40px" height="40px" src={student.profilePic || profile} alt="user profile pic"/>
                <div className="navDes" >{student.name.split(" ")[0]}</div>
            </Stack>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item style={{fontSize:"20px"}} className="d-flex justify-center align-items-center" onClick={()=> showModal(true)} ><RiProfileFill className="mx-2"/> Profile</Dropdown.Item>
                <Dropdown.Item style={{fontSize:"20px"}} className="d-flex justify-center align-items-center" onClick={()=> {
                    logout("student")
                    setAuthenticated(false)
                    redirect('/auth/login/student')
                }}><FaSignOutAlt  className="mx-2"/> Log Out</Dropdown.Item>

            </Dropdown.Menu>
            </Dropdown>
            <Stack onClick={() => {
                if(r)
                    redirect("/student/dashboard", {state: {r:'h'}})
                    //redirect to dasboard with state for updating
            else 
                if(!home) {
                    recordRef.current.classList.remove("bg-light")
                    recordRef.current.classList.remove("text-dark")
                    assignmentRef.current.classList.remove("bg-light")
                    assignmentRef.current.classList.remove("text-dark")
                    scoreRef.current.classList.remove("bg-light")
                    scoreRef.current.classList.remove("text-dark")
                    homeRef.current.classList.add("bg-light")
                    homeRef.current.classList.add("text-dark")
                    setHome(true)
                    setScores(false)
                    setAss(false)
                }
            }} ref={homeRef} direction="horizontal" className="dashStyle bg-light text-dark ms-md-4 w-90 p-2 my-1 ">
             <h2 className="mx-2"> <FaHome/> </h2>
               <div className="navDes"> Home </div>
            </Stack>

             <Stack onClick={ () => {
                    if(r)
                        redirect('/student/dashboard', {state:{r:'a'}})
                    else {
                    homeRef.current.classList.remove("bg-light")
                    homeRef.current.classList.remove("text-dark")
                    scoreRef.current.classList.remove("bg-light")
                    scoreRef.current.classList.remove("text-dark")
                    recordRef.current.classList.remove("bg-light")
                    recordRef.current.classList.remove("text-dark")
                    assignmentRef.current.classList.add("bg-light")
                    assignmentRef.current.classList.add("text-dark")
                    setHome(false)
                    setScores(false)
                    setAss(true)
                    }
                }
                
            } ref={assignmentRef} direction="horizontal" className="dashStyle ms-md-4 w-90 p-2 my-1 ">
             <h2 className="mx-2"> <FaProjectDiagram/> </h2>
                <div className="navDes"> Assignments </div>
            </Stack> 

            <Stack onClick={() => {
                if(r)
                    redirect("/student/dashboard", {state: {r:'s'}})
                else {
                homeRef.current.classList.remove("bg-light")
                homeRef.current.classList.remove("text-dark")
                assignmentRef.current.classList.remove("bg-light")
                assignmentRef.current.classList.remove("text-dark")
                recordRef.current.classList.remove("bg-light")
                recordRef.current.classList.remove("text-dark")
                scoreRef.current.classList.add("bg-light")
                scoreRef.current.classList.add("text-dark")
                setAss(false)
                setHome(false)
                setScores(true)
                }
            }} ref={scoreRef} direction="horizontal" className="dashStyle ms-md-4 w-90 p-2 my-1 ">
             <h2 className="mx-2"> <CiViewBoard/> </h2>
                <div className="navDes">Scores </div>
            </Stack> 

            <Stack onClick={() => {
                if(r)
                    redirect('/student/dashboard', {state: {r:'r'}})
                else {
                 homeRef.current.classList.remove("bg-light")
                 homeRef.current.classList.remove("text-dark")
                 assignmentRef.current.classList.remove("bg-light")
                 assignmentRef.current.classList.remove("text-dark")
                 scoreRef.current.classList.remove("bg-light")
                 scoreRef.current.classList.remove("text-dark")
                 recordRef.current.classList.add("bg-light")
                 recordRef.current.classList.add("text-dark")
                }
            }} ref={recordRef} direction="horizontal" className="dashStyle ms-md-4 w-90 p-2 my-1 ">
             <h2 className="mx-2"> <FaHistory/> </h2>
                <div className="navDes">Records</div>
            </Stack> 
            </Stack>
        </Col>
        </>
        
    )
}
export { StudentDashboardNav }
