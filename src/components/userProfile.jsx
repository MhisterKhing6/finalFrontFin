import { Container, Dropdown } from "react-bootstrap"
import { RiProfileFill } from "react-icons/ri"
import { FaSignOutAlt } from "react-icons/fa"
import avatar from "../assets/prfileAvatar.png"
import { useNavigate } from "react-router-dom"
import { logout } from "../utils/localstorage"
import { useContext, useState } from "react"
import { StudentProfile } from "./studentProfile"
import { LecturerProfile } from "./lecturerProfile"
import { LecturerContext } from "../context/lecturerContext"

const UserProfile = ({name, profileUrl, type}) => {
    const redirect = useNavigate()
    const [modal, showModal] = useState(false)
    const {setAuthenticated} = useContext(LecturerContext)
    return (
        <Container fluid className="d-flex px-4 w-100 justify-content-end align-items-center h-auto userProfile">
                {type==="student" ? <StudentProfile show={modal} close={() => showModal(false)}/> : <LecturerProfile show={modal} close={()=> showModal(false)}/>}
                <Dropdown className="p-1">
                    <Dropdown.Toggle id="dropdown-basic" className="avatar d-flex justify-content-center align-items-center">
                        <p  className="mt-2 mx-2 lead">{name}</p>
                        <img src={profileUrl || avatar} style={{width:"50px", height:"50px"}} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                    <Dropdown.Item style={{fontSize:"20px"}} className="d-flex justify-center align-items-center" onClick={()=> showModal(true)} ><RiProfileFill className="mx-2"/> Profile</Dropdown.Item>
                    <Dropdown.Item style={{fontSize:"20px"}} className="d-flex justify-center align-items-center" onClick={()=> {
                        logout("lecturer")
                        setAuthenticated(false)
                        redirect('/auth/login/lecturer')
                    }}><FaSignOutAlt  className="mx-2"/> Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown>
        </Container>
    )
}

export {UserProfile}