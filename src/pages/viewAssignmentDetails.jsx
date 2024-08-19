import { useContext, useEffect, useState } from "react"
import { Accordion, Button, Card, Container, Row, Popover, OverlayTrigger } from "react-bootstrap"
import { BiSolidEditAlt } from "react-icons/bi"
import { BsCheck2Circle, BsClock, BsFileArrowDown, BsGithub, BsPostage } from "react-icons/bs"
import { MdCalendarToday } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { EditorReadOnly } from "../components/editorReadOnly"
import { Loading } from "../components/loading"
import { LecturerNavbar } from "../components/navbarLecturer"
import { LecturerContext } from "../context/lecturerContext"
import { getFromBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { getToken } from "../utils/localstorage"
import { CgOptions } from "react-icons/cg"
import { FaPlus } from "react-icons/fa"
import { AddAssQuestion } from "../components/addAssQuestion"
import { CongratulationsAssignment } from "../components/congratualationAss"
import { CongratsQuestion } from "../components/task/addTaskCongrats"
import { AddClass } from "../components/assignment/addClass"

const AssignmentDetailPage = () => {

    const [loading, setLoading] = useState(false)
    const redirect = useNavigate()
    const [loadingDetail, setLoadingDetail] = useState(true)
    const [ass, setASs] = useState({})
    const {assId, status} = useParams()
    const [showAddQ, setShowAddQ] = useState(false)
    const [congrats, showCongrats] = useState(false)
    const [showAddClass, setAddClass] = useState(false)
    const [another, setAnother] = useState('')
    const {loadAssignment, setAssignment, assignment,loadDetails, authenticated, setAuthenticated, lecturer, setLecturer} = useContext(LecturerContext)
  
    useEffect(()=> {
        
        const loadProfile = async () => {
            await loadDetails(setLecturer, lecturer,setLoading, setAuthenticated,redirect)
            let detailedUrl = "/coder/lecturer/assignment/view/" + assId
            let response = await getFromBackend(detailedUrl, getToken(token.lecturerTokenKey))
            setASs(response.data)
            console.log(response.data)
            setLoadingDetail(false)
        }
        loadProfile()
    },[authenticated])
   
    const twoDaysRemaining = (a, b) => {
        let first = new Date(a)
        let second = new Date(b)
        let dif = second.getTime() - first.getTime()
        return Math.round(dif / (24 * 60 * 60 * 1000))
    }

    const PopAssignment = ({id, status}) => {
        return (
            <div  className="container p-3 text-muted rounded-2 ">
                <div className="align-items-center justify-content-start">
                <div>
                 <Button onClick={() => setShowAddQ(true)} style={{textDecoration:"none"}} variant="link" className="p-0 text-muted mb-2"><span ><FaPlus className="me-3" />Add Question</span></Button>
                </div>
                </div>
    
                <div className="align-items-center justify-content-start">
                <div>
                <Button onClick={() => setAddClass(true)} style={{textDecoration:"none"}} variant="link" className="p-0 mt-0 text-muted mb-2"><span ><FaPlus className="me-3" />Add Class </span></Button>
                </div>
                </div>
               
            </div>
        )
    }
    
    const trigger = <Popover>
                        <PopAssignment id={ass.id} status={ass.status}/>
                    </Popover>
    
    return (
        <>
        {(loading || loadingDetail) ? <Loading /> : 
        <>
        <LecturerNavbar />
        <div className="w-100 min-vh-100">
        <Container>
            <AddClass assId={assId} show={showAddClass} onHide={() => setAddClass(false)} />
            <AddAssQuestion addQuestion={()=> {showCongrats(true)}} compiler={ass.Compiler} assId={assId} show={showAddQ} onHide={() => {setShowAddQ(false)}} />
            <CongratsQuestion show={congrats} onHide={() => showCongrats(false)} />
            <Row>
            <div className="border-bottom mb-4 pt-5">
            <h4 style={{fontWeight:"bolder"}} className=" mb-3 mt-2">{ass.title }</h4>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-between">
                    <p className="text-muted">
                    {ass.Course.courseName}
                    </p>
                    </div>
                </div>
                <Container className="my-4">
                <Card className="p-5 shadow-lg text-muted">
                    <div className="d-flex justify-content-between">
                    <h5  style={{fontWeight:"bold"}} className="text-dark">Basic Info</h5>
                    <OverlayTrigger overlay={trigger} delay={"10"} trigger={"click"}>
                    <div  className="p-2 rounded-circle bg-body shadow-lg">
                        <CgOptions  size={"20px"}/> 
                    </div>
                    </OverlayTrigger>
                    </div>
                    {"</>"} {ass.Compiler.name}
                    <div className="my-1 d-flex align-items-center">
                    <MdCalendarToday className="me-2"/>  {new Date(ass.startDate).toDateString()} - {new Date(ass.endDate).toDateString()}
                    </div>

                    <div className="my-1 d-flex align-items-center">
                    <MdCalendarToday className="me-2"/> {ass.Class.className}
                    </div>
                    <h5 style={{fontWeight:"bold"}} className="my-2 text-dark">Submission</h5>
                    <div className="my-1 d-flex align-items-center">
                    <BsPostage className="me-2"/>  Submission Status: {status}
                    </div>
                    <div className="my-1 d-flex align-items-center">
                    <BsClock className="me-2"/>  {status==="Open" ? `${twoDaysRemaining(ass.startDate, ass.endDate)} days remaining` : status === "Close" ? "0 days remaining" : `${twoDaysRemaining(ass.startDate, ass.endDate)} duration` } 
                    </div>

                    <h5 style={{fontWeight:"bold"}} className="my-1 text-dark">General Test</h5>
                    {ass.AssignmentRequirements.plagiarism !== 0 && <div className="my-1 d-flex align-items-center">
                    <BsCheck2Circle className="me-2"/>  Plagiarism
                    </div>}
                    {ass.AssignmentRequirements.documentation !== 0 && 
                    <div className="my-1 d-flex align-items-center">
                    <BsCheck2Circle className="me-2"/>  Documentation 
                    </div>
                    }
                    {ass.AssignmentRequirements.documentation !== 0 && 
                    <div className="my-1 d-flex align-items-center">
                    <BsCheck2Circle className="me-2"/>  Coding Standard 
                    </div>
                    }
                    <h5 style={{fontWeight:"bold"}} className="my-1 text-dark">Mode Of Submission</h5>
                    {!ass.gitMode ? <div className="my-1 d-flex align-items-center">
                    <BsFileArrowDown className="me-2"/>  File Upload
                    </div> :
                    <>
                    <div className="my-1 d-flex align-items-center">
                    <BsGithub className="me-2"/>  GitHub
                    </div>
                    <p>Repository: {ass.repository}</p>
                    </>
                    }
                    <h5 style={{fontWeight:"bold"}} className="my-1 text-dark">Objectives</h5>
                    <div className="my-1 d-flex align-items-center">
                        {ass.objectives.split("\n").map((val) => {
                            return <>{val} <br /></>
                        })}
                    </div>

                    <h5 style ={{fontWeight:"bold"}} className="mt-2 mb-3 text-dark"> Questions </h5>
                    
                    <div>
                    {ass.tasks.length === 0 ? <p>No questions added</p> :
                        <Accordion>
                            {ass.tasks.map((task,index) => {
                            return (<Accordion.Item eventKey={index}>
                           
                                <Accordion.Header>Question {task.number}</Accordion.Header>
                                <Accordion.Body>
                                    <div className="d-flex justify-content-between align-content-center">
                                      <h5 className=" text-dark-emphasis">Requirement</h5>
                                      <Button className="text-dark" variant="link">
                                      <BiSolidEditAlt size={"20px"} />
                                      </Button>
                                      </div>
                                    <hr className="my-1"/>
                                    <div>
                                    {task.requirement.split("\n").map((val) => {
                                     return <>{val} <br /></>
                                    })}
                                    </div>
                                    <h5  className="mt-3 text-dark-emphasis">Explanation Examples</h5>
                                    <hr />
                                    <EditorReadOnly code={task.examples} />
                                    <h5 className="mt-4">Solution File Names</h5>
                                    <hr  className="my-1" />
                                    {task.studentSolutionFileNames.split("**").map((val) => {
                                     return <>{val} <br /></>
                                    })}
                                    <p className="my-0"></p>
                                </Accordion.Body>
                            </Accordion.Item>)
                            })}
                        </Accordion>
                    }
                    </div>

                </Card>

                </Container>
               
                
            </Row>

        </Container>
        </div>
        </>
            }
        </>
    )
}
export { AssignmentDetailPage }
