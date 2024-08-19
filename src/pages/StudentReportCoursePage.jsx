import { useContext, useEffect, useState } from "react"
import { Image, Button, Col, Container, Form, InputGroup, Row, Card, ProgressBar, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AssignmentCard } from "../components/LecturerAssignmentCard"
import { AlertToast } from "../components/alertTracker"
import { Loading } from "../components/loading"
import { LecturerNavbar } from "../components/navbarLecturer"
import { LecturerContext } from "../context/lecturerContext"
import image from "../assets/prfileAvatar.png"
import { FaDiceFive, FaPiedPiper, FaProjectDiagram } from "react-icons/fa"
import { BiIdCard } from "react-icons/bi"
import { FaMinimize } from "react-icons/fa6"
import { FaMaximize } from "react-icons/fa6"
import { FaMagento } from "react-icons/fa"
import { StudentChart } from "../components/studentRepor.jsx/studentChart"
import { CgNametag } from "react-icons/cg"
import { postToBackend } from "../utils/backendCalls"
import { getToken } from "../utils/localstorage"
import { token } from "../utils/config"
const StudentReport = () => {

    const [loading, setLoading] = useState(false)
    const redirect = useNavigate()
    const [loadingReport, setLoadingReport] = useState(false)
    const [showReport, setShowReport] = useState(false)
    const [report, setReport] = useState({})
    const [showInfo, setShowInfo]= useState(false)
    const [infoMessage, setInfoMessage]  = useState("")
    const [query, setQuery] = useState({})
    const [student, setStudent] = useState({})
    const [course, setCourse] = useState({})
    const [score, setScore] = useState({series:[], categories:[],total:0, attempted:0, min:0, max:0, avg:0})
    const {loadAssignment, setAssignment, assignment,loadDetails, authenticated, setAuthenticated, lecturer, setLecturer} = useContext(LecturerContext)
   
    useEffect(()=> {
        const loadProfile = async () => {
            await loadDetails(setLecturer, lecturer,setLoading, setAuthenticated,redirect)
        }
        loadProfile()
    },[authenticated])
   
    let formateDate = (date) => {
        let how = new Date(date)
        return how.toLocaleDateString()
    }
    const handleSubmit = async() => {
        setLoadingReport(true)
        if(!(query.courseCode && query.studentId))
            return
        let url = "/coder/lecturer/student-report"
        let response = await postToBackend(url, query, getToken(token.lecturerTokenKey))
            if(response.status !== 200){
                setInfoMessage(response.data.message)
                setShowInfo(true)
            } else {
                //setShowReport(true)
                setStudent(response.data.student)
                setCourse(response.data.course)
                let min = response.data.scores[0].mark;
                let max = response.data.scores[0].mark;
                let avg = 0
                let total = response.data.scores.length;
                let series = []
                let categories = []
                let totalMarks = total * 100;
                let attempted = 0;
                let studentTotalMarks = 0
                for (const studentScore of response.data.scores) {
                    //check for min
                    if(studentScore.attempted) {
                        attempted += 1
                    }
                    min = (min > studentScore.mark) ? studentScore.mark : min
                    max = (max < studentScore.mark) ? studentScore.mark : max
                    studentTotalMarks += studentScore.mark
                    series.push(studentScore.mark)
                    categories.push(formateDate(studentScore.date))
                }
                avg = Math.round(studentTotalMarks*100/total)/100
                setScore(prev => ({...prev, total, avg, max, min, series, categories, attempted}))
                setStudent(response.data.student)
                setCourse(response.data.course)
                setShowReport(true)
                //handle processing
            }
        //formate average
        
        setLoadingReport(false)
    }
    
    return (
        <>
        {loading ? <Loading /> : 
        <>
        <LecturerNavbar />
        <div className="w-100 min-vh-100">
        <Container>
            <Row>
            <div className="border-bottom mb-5 pt-5">
            <h4 style={{fontWeight:"bolder"}} className=" mb-3 mt-2">Student Report On Course</h4>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-between">
                    <p className="text-muted">
                    Get a graphical representation of students performance on a course
                    </p>
                    </div>
                </div>
              <Container  className="my-2">
                <Row className="justify-content-center align- items-center">
                <AlertToast show={showInfo} text={infoMessage} toggleShow={() => setShowInfo(false) } />

                    <Col xs={12} md={6} className="d-flex align-items-center">
                    <InputGroup>
                        <InputGroup.Text>
                        Student Id
                        </InputGroup.Text>
                        <Form.Control type="text"
                        value={query.studentId}
                        onChange={
                            val => setQuery(prev => ({...prev, studentId:val.target.value})) 
                        }
                        />
                        </InputGroup>
                    </Col>
                    <Col xs={12} md={6} >
                    <InputGroup>
                        <InputGroup.Text>
                        Course Code
                        </InputGroup.Text>
                        <Form.Control type="text"
                        value={query.courseCode}
                        onChange={
                            val => setQuery(prev => ({...prev, courseCode:val.target.value})) 
                        }
                        />
                        <InputGroup.Text className="p-0 border-0">
                        <Button onClick={handleSubmit} disabled = {!(query.studentId && query.courseCode)} className="ms-2 w-100 h-100" type="submit">{loadingReport  ? <Spinner />  : "Search"  }</Button>
                        </InputGroup.Text>
                        </InputGroup>
                    </Col>
                </Row>
                </Container>
               {showReport && <Row className="bg-body-secondary" style={{minHeight: "70vh"}}>
                    <Col   className="p-2" xs={12} md={5} lg={4} xl={3}>
                    <div style={{borderRadius: "15px"}} className="bg w-100 bg-body p-3">
                        <div className="align-items-center my-0 d-flex justify-content-center flex-column">
                            <Image style={{width: "130px", height:"130px"} } roundedCircle className="bg-dark"  src={student.profileUrl || image} />
                            <p className="my-0" style={{fontSize:"20px", fontWeight:"bold"}}>{student.name}</p>
                            <small className="my-0 text-muted">{student.email}</small>
                        </div>
                        <hr />
                        <div className="d-flex flex-column">
                            <div className="d-flex my-1">
                               <div style={{borderRadius:"5px", color:"white", }} className="p-1 bg-primary">
                                <FaPiedPiper />
                                </div>
                                <div className="  p-0 ">
                                <p style={{fontSize:"20px"}} className="m-0 mx-1 ">{student.program}</p>
                                </div> 
                            </div>

                            <div className="d-flex my-1">
                               <div style={{borderRadius:"5px", color:"white", }} className="p-1 bg-primary">
                                <FaProjectDiagram/>
                                </div>
                                <div className="  p-0 ">
                                <p style={{fontSize:"20px"}} className="m-0 mx-1 ">{student.class} </p>
                                </div> 
                            </div>

                            <div className="d-flex my-1">
                               <div style={{borderRadius:"5px", color:"white", }} className="p-1 bg-primary">
                                <BiIdCard/>
                                </div>
                                <div className="  p-0 ">
                                <p style={{fontSize:"20px"}} className="m-0 mx-1 ">{student.studentId}</p>
                                </div> 
                            </div>
                        </div>
                        </div>

                    <div style={{borderRadius: "15px", height:"40% !important"}} className="bg w-100 bg-body my-3 p-3">
                        <div className="d-flex flex-column">
                            <p style={{fontWeight:"Bold"}} className="my-0 w-100 text-primary overflow-hidden lead">Course Info</p>
                            <hr />
                            <div className="d-flex my-1">
                               <div style={{borderRadius:"5px", color:"white", }} className="p-1 bg-primary">
                                <CgNametag />
                                </div>
                                <div className="  p-0 w-100 overflow-hidden ">
                                <p style={{whiteSpace:"nowrap", fontSize:"20px"}} className="m-0 mx-1 w-100 overflow-hidden ">{course.name}</p>
                                </div> 
                            </div>

                            <div className="d-flex my-1">
                               <div style={{borderRadius:"5px", color:"white", }} className="p-1 bg-primary">
                                <FaDiceFive/>
                                </div>
                                <div className="  p-0 ">
                                <p style={{fontSize:"20px", whiteSpace:"nowrap"}} className="m-0 mx-1 ">{course.code} </p>
                                </div> 
                            </div>
                        </div>
                        </div>
                     </Col>
                     <Col xs={12} md={7} lg={8} className="p-2">
                     <div >
                    <Card className="p-3">
                        {score.attempted}/{score.total} Course assignment attempted
                        <ProgressBar animated now={!score.total ? 100 : (score.attempted * 100)/score.total} />
                    </Card>
                     </div>
                     <Card className="my-2 p-2">
                     <Row className="my-2 p-3">
                    <Col className="rounded p-2 text-center">
                        <Card.Body className="stat shadow-lg py-4" >
                        <div  style={{width:"65px"}} className="iconStat mx-auto text-primary rounded-circle p-2 shadow-lg bg-body-secondary mb-2"><FaMaximize  size={"30px"}/></div>
                        <div className="my-2"><h5> Best Score </h5></div>
                        <div><h5> {score.max} </h5></div>
                        </Card.Body>
                    </Col>
                    <Col className=" rounded p-2 text-center">
                        <Card.Body className="stat shadow-lg py-4" >
                        <div  style={{width:"65px"}} className="iconStat mx-auto text-primary rounded-circle p-2 shadow-lg bg-body-secondary mb-2"><FaMagento  size={"30px"}/></div>
                        <div className="my-2"><h5>Average Score </h5></div>
                        <div><h5> {score.avg} </h5></div>
                        </Card.Body>
                    </Col>

                    <Col className="rounded p-2 text-center">
                        <Card.Body className="stat shadow-lg py-4" >
                        <div  style={{width:"65px"}} className="iconStat  mx-auto text-primary rounded-circle p-2 shadow-lg bg-body-secondary mb-2"><FaMinimize  size={"30px"}/></div>
                        <div className="my-2"><h5>Worst Score</h5></div>
                        <div><h5> {score.min} </h5></div>
                        </Card.Body>
                    </Col>
                </Row> 
                     </Card>
                     <Card className="my-2 p-2">
                        <StudentChart series={score.series} categories={score.categories}  />
                     </Card>

                      </Col>
                </Row> }
                
            </Row> 

        </Container> 
        </div>
        </>
            }
        </>
    )
}
export { StudentReport }
