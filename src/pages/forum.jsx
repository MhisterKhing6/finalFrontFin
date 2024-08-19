import { useContext, useEffect, useState } from "react"
import { Badge, Button, Col, Container, Form, InputGroup, Pagination, Row, Table } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { Loading } from "../components/loading"
import { LecturerNavbar } from "../components/navbarLecturer"
import { LecturerContext } from "../context/lecturerContext"
import { getFromBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { getToken } from "../utils/localstorage"
import { ChatWindow } from "../components/forum/chatWindow"
import { UserProfile } from "../components/userProfile"
import { useLocation } from "react-router-dom"

const Forum = () => {

    const [loading, setLoading] = useState(false)
    const redirect = useNavigate()
    const [loadingDetail, setLoadingDetail] = useState(true)
    const [submission, setSub] = useState([])
    const location = useLocation()
    const {assId, user} = useParams()
    const {loadAssignment, setAssignment, assignment,loadDetails, authenticated, setAuthenticated, lecturer, setLecturer} = useContext(LecturerContext)
 
    return (
        <>
        {(loading ) ? <Loading /> :
        <>
        <LecturerNavbar />
        <div className="w-100 min-vh-100 my-0 bg-body-secondary">
        <Container className="my-0">
            <Row>
            <div className="border-bottom mb-4 pt-2">
            <h4 style={{fontWeight:"bolder"}} className=" mb-3 mt-2 text-primary">Chat Forum</h4>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-between">
                    <p className="text-muted">
                    Assignment Title: {location.state.title}
                    </p>
                    </div>
                </div>
                <Container className="my-1 bg-body-tertiary">
                       <ChatWindow user={user} className="w-100"/>
                </Container>
                
            </Row>

        </Container>
        </div>
        </>
            }
        </>
    )
}
export { Forum }
