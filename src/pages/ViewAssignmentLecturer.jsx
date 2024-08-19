import { useContext, useEffect, useState } from "react"
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap"
import { FaSearch, FaSort } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { AssignmentCard } from "../components/LecturerAssignmentCard"
import { AlertToast } from "../components/alertTracker"
import { Loading } from "../components/loading"
import { LecturerNavbar } from "../components/navbarLecturer"
import { LecturerContext } from "../context/lecturerContext"

const ViewAssignment = () => {

    const [loading, setLoading] = useState(false)
    const redirect = useNavigate()
    const [loadingAssignment, setLoadingAssignment] = useState(true)
    const [object, setObject] = useState({})
    const [showInfo, setShowInfo]= useState(false)
    const [infoMessage, setInfoMessage]  = useState("")
    const {loadAssignment, setAssignment, assignment,loadDetails, authenticated, setAuthenticated, lecturer, setLecturer} = useContext(LecturerContext)
    useEffect(()=> {
        
        const loadProfile = async () => {
            await loadDetails(setLecturer, lecturer,setLoading, setAuthenticated,redirect)
            await loadAssignment(object, setObject,setLoadingAssignment )           
        }
        loadProfile()
    },[authenticated])
   
    return (
        <>
        {loading || loadingAssignment ? <Loading /> : 
        <>
        <LecturerNavbar />
        <div className="w-100 min-vh-100">
        <Container>
            <Row>
            <AlertToast show={showInfo} text={infoMessage} toggleShow={() => setShowInfo(false) } />
            <div className="border-bottom mb-5 pt-5">
            <h4 style={{fontWeight:"bolder"}} className=" mb-3 mt-2">View Assignments</h4>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-between">
                    <p className="text-muted">
                    Efficiently manage your assignments
                    </p>
                    </div>
                </div>
                <Container className="my-4">
                <Row className="justify-content-center align-items-center">
                    <Col xs={12} md={6} className="d-flex align-items-center">
                           <div  className="p-0   mt-3 me-2 text-muted"> <p><FaSort /> Sort By:</p> </div>
                        <div className="w-75">
                        <Form.Select>
                            <option>All </option>
                            <option>Open</option>
                            <option>Close</option>
                            <option>Future</option>
                        </Form.Select>
                        </div>
                    </Col>
                    <Col xs={12} md={6} >
                    <InputGroup>
                        <InputGroup.Text>
                        <FaSearch />
                        </InputGroup.Text>
                        <Form.Control type="text" />
                        </InputGroup>
                    </Col>
                </Row>
                </Container>
                {
                    object.assignments.map((val) => {
                        return <AssignmentCard key={val.id} ass={val} />
                    })
                }
                
            </Row>

        </Container>
        </div>
        </>
            }
        </>
    )
}
export { ViewAssignment }
