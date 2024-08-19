
import { useState } from "react"
import { Badge, Button, Card, Col, Row, Spinner, Stack } from "react-bootstrap"
import { MdForum } from "react-icons/md"
import { postToBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { getToken } from "../utils/localstorage"
import { AlertToast } from "./alertTracker"
import { Editor } from "./editor"
import { EditorReadOnly } from "./editorReadOnly"
import { SolutionUpload } from "./fileUpload"
import { ReqResult } from "./reqResult"
import { SubmitSolution } from "./submitSolution"
import { TestResult } from "./testResult"
import { useNavigate } from "react-router-dom"

const Question = ({repo,val, gitMode, extension, setAssignmentMark, assId, title})=> {
    const [files, setFiles] = useState([]) //handles file ui
    
    const [solunFiles, setSolunFiles] = useState([]) //handles solun files
    const navigate = useNavigate()

    const [uploadShow, setUploadShow] = useState(false) //show upload model

    const [submitShow, handleSubmitShow] = useState(false) //show submit model

    const [showInfo, setShowInfo] = useState(false)
    //set marks
    const [taskMark, setMarks] = useState(null)
    //set task result test 
    const [taskResults, setTaskResults] = useState([])
    //view test results
    const [viewTest, setViewTest] = useState(false)
    
    //general requirement
    const [generalRequirements, setGenRequirements] = useState([])
    
    const [infoMessage, setInfoMessage] = useState("")
    //Editor show
    const [editorShow, setEditorShow] = useState(false)

    //seting compilError
    const [compileError, setCompilError] = useState(false)
    const [errorMessage, setCompilErrorMessage] = useState("")
    //loading
    const [loading, setLoading] = useState(false)

    const handleUploadClose = () => setUploadShow(false)

    const handleSubmitClose  = () => handleSubmitShow(false)
    const handleSubmit = async () => {
        if(!gitMode && solunFiles.length === 0)
            {
                setShowInfo(true)
                setInfoMessage("No files uploaded")
            }else {
                setLoading(true)
                //form submission data
                let subObject = gitMode ? {taskId: val.id} : {codes:solunFiles, taskId:val.id}
                let url = !gitMode ? '/coder/student/submit/task/file' : '/coder/student/submit/task/github'
                let result = await postToBackend(url, subObject, getToken(token.studentTokenKey))
                if(result.status === 400) {
                    setCompilError(true)
                    setCompilErrorMessage(result.data.message)
                }else if(result.status === 200) {
                    setCompilError(false)
                    if(result.data.lesserThanPrevMark) {
                        setInfoMessage("Mark is lesser  than previous, so previous mark will be used")
                        setShowInfo(true)
                    }
                    //set mark to new mark
                    setMarks(result.data.marks)
                    setTaskResults(result.data.testResult)
                    setGenRequirements(result.data.genralRequirements)
                    setAssignmentMark(result.data.assignmentScore)
                    //set ass mark here
                } else {
                    alert("internal")
                }
                setViewTest(true)
                setLoading(false)
            }
            
    }

     return (<Card className="mb-3 p-2 bg-transparent">
        <div className="disabled">
        <Editor onHide={() => setEditorShow(false)} solunFiles={solunFiles} setSolunFiles={setSolunFiles} show={editorShow}/>
        <AlertToast show={showInfo} text={infoMessage} toggleShow={()=> {setShowInfo(false)}} />
        <SolutionUpload extension={extension} handleClose={handleUploadClose} show={uploadShow} setFiles={setFiles} files={files} setSolunFiles={setSolunFiles} solunFiles={solunFiles} />
        <SubmitSolution handleSubmit={handleSubmit} handleClose={handleSubmitClose} show={submitShow} solunFiles={solunFiles} ha/>

        <Card.Header className="mb-2">
            <Stack direction="horizontal" className="justify-content-between">
                <h4> {val.number} </h4> 
                <h3><Badge>{val.TaskResults ? taskMark ||  val.TaskResults.mark : 0}</Badge></h3>
            </Stack>
            </Card.Header>
     
            <ul>
                {val.requirement.split("\n").map((line, id) => <li key={id}>{line} </li>) }
            </ul>
        <div className="my-2">
            <EditorReadOnly extension code = {val.examples} className="shadow-lg my-3<" />
        </div>
        <hr />
        <h6 className="my-2">
         Submission Mode: {gitMode ? "Github Submission" : "File Upload"}
        </h6>
        {gitMode ? <h6>Github Repo: {repo} </h6> :"" }
        <ul>
            {val.studentSolutionFileNames.split("**").map(path => {
                return ( <li key={path}>{path}</li> )
            }) }
        </ul>
        <hr />
        {viewTest && <Card.Footer>
            <Row> { compileError ?  <TestResult error={true} feedback={errorMessage} /> :<>
            {taskResults.map((task) => {
               return <TestResult key={task.testnumber} feedback={task.feedback} status={task.status} testNumber={task.testnumber} />
            })}
            {generalRequirements.map((req) => {
                return <ReqResult key={req.name} name={req.name} message={req.output} status={req.pass} />
            })} 
            </>
            }
            </Row>
        </Card.Footer> }
        
        <Card.Footer>
            <Row>
            {!gitMode && 
            <Col xs={6} md={3} lg={2} className="my-1">
            <Button onClick={(val) => {
                val.preventDefault()
                setUploadShow(true)
            }} className="w-100"  variant="outline-primary">Upload</Button>
            </Col> }
            {!gitMode && 
            <Col xs={6} md={3} lg={2} className="my-1">
            <Button onClick={() => {
                setEditorShow(true)
            }}  className="w-100"  variant="outline-primary">Editor</Button>
            </Col>
            }
           
            <Col xs={6} md={3} lg={2} className="my-1">
            <Button onClick={() => {
                if(gitMode) {
                    handleSubmit()
                } else {
                    handleSubmitShow(true)
                }
            }} className="w-100 " disabled={loading} variant="primary">{!loading ? "Submit" : <Spinner /> }</Button>
            </Col>
            <Col xs={6} md={3} lg={2} className="my-1">
            <Button onClick={() => {
                navigate(`/forum/${assId}/student`, {state: {title}})
            }}  className="w-100"  variant="outline-primary"><MdForum /></Button>
            </Col>
            <Col xs={6} md={3} lg={2} className="my-1">
            <Button className="w-100"  variant="outline-primary">Help</Button>
            </Col>
            </Row>
        </Card.Footer>
        </div>
     </Card>)
}
export { Question }
