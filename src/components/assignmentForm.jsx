import { useEffect, useState } from "react"
import { Button, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { getFromBackend, postToBackend, putToBackend } from "../utils/backendCalls"
import { convertToDateTimeLocalString, token } from "../utils/config"
import { getToken } from "../utils/localstorage"
import { AddAssQuestion } from "./addAssQuestion"
import { AlertToast } from "./alertTracker"
import { CongratulationsAssignment } from "./congratualationAss"
import { Loading } from "./loading"



const AssignmentCreationForm = ({ass}) => {
    const [fileMode, setFileMode] = useState(ass ? !ass.gitMode : false)
    const [loading, setLoading] = useState(false)
    const [submitting, setSubmission] = useState (false)
    const [compilers, setCompilers] = useState([])
    const [programs, setPrograms] = useState([])
    const [classes, setClasses] = useState([])
    const [LoadingClass, setLoadingClass] = useState(false)
    const [disableB, setdisButton] = useState(true)
    ///
    const [showInfo, setShowInfo] = useState(false)
    const [infoMessage, setInfoMessage] = useState("")
    //courses
    const [courses, setCourses] = useState([])
    const[disableCourse, setDisableCourse] = useState(true)
    const[loadingCourse, setLoadingCourse] = useState(false)

    const[congrats, showCongrats] = useState(false)

    const[assId,setAssId] = useState("")
    const[comp, setComp] = useState("")

    const[question, showQuestion] = useState(false)

    const[another, setAnother] = useState(false)
    

    const[uploadAssignment, setUploadAssignment] = useState(
        {startDate: !ass ? convertToDateTimeLocalString(new Date()) : convertToDateTimeLocalString(new Date(ass.startDate)) ,
         endDate:!ass ? convertToDateTimeLocalString(new Date()) : convertToDateTimeLocalString(new Date(ass.endDate))
        ,title: !ass ? "" : ass.title, CourseId: ass ? ass.CourseId : "", ClassId: ass ? ass.Class.id :"",
        CompilerId : ass ? ass.CompilerId : "", "objectives": ass ? ass.objectives : "",
        "codingStandard": ass ? ass.codingStandard : true, gitMode: ass ? ass.gitMode : false,
        "repository": ass ? ass.repository : "", "ProgramId": ass ? ass.Class.Program.id : "",
        "CompilerId": ass ? ass.Compiler.id : "", "documentation": true
    })
    const redirect = useNavigate()
    useEffect(()=> {

        const fetchRequiredData = async () => {
            let compilers = await getFromBackend("/api/compilers")
            if (compilers.status === 200) {
                setCompilers(compilers.data)
            } else {
                setInfoMessage(compilers.data.reason)
                showInfo(true)
            }
            let programs = await getFromBackend("/api/programs")
            if(programs.status === 200) {
                setPrograms(programs.data)
            } else {
                setInfoMessage(programs.data.reason)
                showInfo(true)
            }
            setLoading(false)
        }
        fetchRequiredData()
    }, [])

    const handleSubmit = async (val) => {
        val.preventDefault()
                    setSubmission(true)
                    console.log(uploadAssignment)
                    //get details
                    if(!uploadAssignment.CompilerId) {
                        setInfoMessage("please select programming language")
                        setShowInfo(true)
                    }
                    //check if start Date is less than endDate
                    if(!ass && uploadAssignment.startDate >= uploadAssignment.endDate){
                        setInfoMessage("starting date for an assignment cant be greater than end date")
                        setShowInfo(true)
                    }
                    let legit = true
                    console.log(uploadAssignment)
                    if(!(uploadAssignment.ClassId && uploadAssignment.CourseId && uploadAssignment.ProgramId)){
                        setInfoMessage("program, class and course are required")
                        setShowInfo(true)
                        setSubmission(false)
                        legit = false
                    }
                    if(legit) {
                        //send assignment to backend
                        let url = "/coder/lecturer/assignment"
                        let updateData  = ass ?  {...uploadAssignment, id:ass.id} : ""
                        let response = ass ? await putToBackend(url, updateData, getToken(token.lecturerTokenKey)): await postToBackend(url, uploadAssignment, getToken(token.lecturerTokenKey))
                        let condition = ass ? response.status === 200 : response.status == 201
                        console.log(response.data)
                        if(condition){
                            //find the compiler with the id
                            let compiler = null
                            for(const lang of compilers) {
                                if(uploadAssignment.CompilerId === lang.id) {
                                    compiler = {...lang}
                                    break
                                } 
                            }
                            if(!ass)
                            setAssId(response.data.id)
                            setComp(compiler)
                            setSubmission(false)
                            if(!ass)
                            showCongrats(true)
                            if(ass)
                            redirect("/lecturer/view-assignment")
                        }
                        else {
                            setSubmission(false)
                        }
                        setSubmission(false)
                    }
                   
    }
    return(
    <Row className="justify-content-center">
    <Col className="overflow-hidden">
    <Container className="shadow-lg p-3">
    <CongratulationsAssignment another={another} showQuestion={()=> {showQuestion(true)}} show={congrats} onHide={()=> {showCongrats(false)}} />
    <AddAssQuestion newQuestion={setAnother} show={question} compiler={comp} addQuestion={()=>{showCongrats(true)}} assId={assId} onHide={()=> showQuestion(false)}/>
    {loading? <Loading /> : <>
        <h3 className="h3 text-center ">{ass ? "": "Create Assignment"}</h3>
        <hr className="mb-3"/>
        
        <Form onSubmit={handleSubmit}>
            <AlertToast show={showInfo} text={infoMessage} toggleShow={()=> {setShowInfo(false)}} />
            <Form.Label className="my-2"><h5>Assignment Title* </h5></Form.Label>
            <Form.Control className="my-1" onChange={(val) => setUploadAssignment({...uploadAssignment, title:val.target.value})} value={uploadAssignment.title} required type="text"  />

            <Form.Label className="my-2"><h5>Start and End Dates*</h5></Form.Label>
            <InputGroup className="my-1">
            <InputGroup.Text >Fr</InputGroup.Text>
            <Form.Control 
            min={ !ass? convertToDateTimeLocalString(new Date(), 5) : ""} 
            value={uploadAssignment.startDate}
            onChange={val => setUploadAssignment({...uploadAssignment, startDate:val.target.value})} 
            required type="datetime-local" />
            <InputGroup.Text>To</InputGroup.Text>
            <Form.Control
            value ={uploadAssignment.endDate}
            min={
            uploadAssignment.startDate
            }
            onChange={val => setUploadAssignment({...uploadAssignment, endDate:val.target.value})}
            required type="datetime-local" />
            </InputGroup>
            <Form.Label className="my-3"><h5>Programming Language*</h5></Form.Label>
            <Form.Select
            onChange={(val) => {
                setUploadAssignment({...uploadAssignment, CompilerId:val.target.value})
            }}
            required>
                <option >{ass? ass.Compiler.name : "Programming Language"}</option>
                {compilers.map(val => {
                                return (<option key={val.id} value={val.id}>{val.name}</option>)
                            })
                }
            </Form.Select>
            <Form.Label className="my-3"><h5>Programme and Class </h5></Form.Label>
            <InputGroup className="">
            <Form.Select
             onChange={async (val) => {
                val.preventDefault()
                setUploadAssignment({...uploadAssignment, ProgramId:val.target.value})
                //set program id
                //set loadingClass to false
                setLoadingClass(true)
                //set startSpiner to true
                //get classes for the program
                let url ="/api/program/classes"
                let response = await postToBackend(url, {programId: val.target.value})
                if(response.status === 200) {
                    setLoadingClass(false)
                    setdisButton(false)
                    setClasses(response.data)
                } else {
                    setInfoMessage(response.data.reason)
                    showInfo(true)
                }
                setLoadingClass(false)

            }} 
            >
                <option selected disabled hidden>{ass ? ass.Class.Program.programName : "Programme" }</option>
                {programs.map(val => {
                            return (<option key={val.id} value={val.id}>{val.programName}</option>)
                        })}
            </Form.Select>
            <InputGroup.Text>@</InputGroup.Text>
            <Form.Select 
            onChange={async (val) => {
                setUploadAssignment({...uploadAssignment, ClassId:val.target.value})
                setLoadingCourse(true)
                //load courses
                let response = await getFromBackend(`/api/program/class/courses/${val.target.value}`)
                if(response.status === 200) {
                    setCourses(response.data)
                    setDisableCourse(false)
                } else {
                    setInfoMessage(response.data.reason)
                    setShowInfo(true)
                }
                setLoadingCourse(false)
            }}  
            className="parent" disabled={disableB}>
                <option selected disabled hidden>{ass ? ass.Class.className :"Class"}</option>
                {classes.map(val => {
                                return(<option key={val.id} value={val.id}>{val.className}</option>)
                })}
            </Form.Select>
            {LoadingClass && <Spinner style={{left:"75%", borderRadius: "50%"}} className="child m-1" /> }
            </InputGroup>
            <Form.Label className="my-3"><h5>Course*</h5></Form.Label>
            {loadingCourse && <Spinner style={{ borderRadius: "50%", top:"20%"}} className="child m-1" /> }
            <Form.Select 
            onChange={val => {setUploadAssignment({...uploadAssignment, CourseId:val.target.value})}}
            className="parent mb-3" disabled={disableCourse}>
                <option hidden selected disabled>{ass ? ass.Course.courseName : "Select Course"}</option>
                {courses.map(val => {
                                return(<option key={val.id} value={val.id}>{val.courseCode}</option>)
                })}
            </Form.Select>
            <Form.Label className="my-2"><h5>General Test</h5></Form.Label>
            <div className='mx-4 mb-2 px-4' style={{fontSize: "1.2rem"}}>
                        <Form.Check
                        label="Plagiarism"
                        type="switch"
                        id= "pg"
                        checked = {uploadAssignment.plagiarism}
                        onChange={() => setUploadAssignment({...uploadAssignment, plagiarism:!uploadAssignment.plagiarism})}
                        />
                        <Form.Check
                        type="switch"
                        label="Coding Standard"
                        id= "csc"
                        checked = {uploadAssignment.codingStandard}
                        onChange={() => setUploadAssignment({...uploadAssignment, codingStandard:!uploadAssignment.codingStandard})}
                        />

                        <Form.Check 
                        type="switch"
                        label="Documentation"
                        id= "csc"
                        checked = {uploadAssignment.documentation}
                        onChange={() => setUploadAssignment({...uploadAssignment, documentation:!uploadAssignment.documentation})}
                        />
                        
                    </div>
                    <p style={{fontSize: "1.2rem"}} className='my-3'>Mode of Submission</p>
                    <div className='mx-4 mb-2'>
                    <Form.Check
                        label="File and Ide"
                        type="switch"
                        id= "ls"
                        style={{fontSize: "1.2rem"}}
                        className='mx-4'
                        onClick={(val) => { 
                            setFileMode(!fileMode)
                            setUploadAssignment({...uploadAssignment, gitMode:false})
                        }
                        }
                        checked={fileMode}
                        name="subMode"/>
                    
                        <Form.Check
                        label="Github"
                        type="switch"
                        id= "gt"
                        style={{fontSize: "1.2rem"}}
                        
                        className='mx-4'
                        onClick={(val) => { 
                            setUploadAssignment({...uploadAssignment, gitMode:!uploadAssignment.gitMode})
                            setFileMode(false)
                        }}
                        checked={uploadAssignment.gitMode}
                        name="subMode"/>
                    </div>
              {uploadAssignment.gitMode &&  
                <>
              <Form.Label><h5>Github Repository*</h5></Form.Label>
              <Form.Control 
              value={uploadAssignment.repository}
              onChange={(val) => {
                setUploadAssignment({...uploadAssignment, repository:val.target.value})
              }}
              required={uploadAssignment.gitMode} /> 
                </>
                }
                <Form.Label className="my-2"><h5>Objectives</h5></Form.Label>
                <Form.Control
                onChange={(val) => setUploadAssignment({...uploadAssignment,objectives:val.target.value})}
                value={uploadAssignment.objectives} required as="textarea" rows={10} className="text-start" >
                </Form.Control>
                <Button disabled={submitting} className="w-100 mt-4" type="submit">{submitting? <Spinner />:"Submit"}</Button>
        </Form>
        </>}
    </Container>
    </Col>
    </Row>
    )
}

export { AssignmentCreationForm }
