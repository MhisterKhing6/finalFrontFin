import { useEffect, useState } from "react"
import { Badge, Card, Col, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { getFromBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { getToken } from "../utils/localstorage"
import { Loading } from "./loading"
import { Question } from "./questions"

const AssDescription = ({assId}) => {
    const [ass, setAssignment] = useState({})
    const [loading, setLoading] = useState(true)
    const [assignmentMark , setAssignmentMark] = useState(null)
    useEffect(()=> {
        const loadAssignment = async () => {
            let url = `/coder/student/tasks/assignment/${assId}`
            let result = await getFromBackend(url, getToken(token.studentTokenKey))
            setAssignment(result.data)
            setLoading(false)
        }
        loadAssignment()
    }, [])
    return (
        <Col style={{backgroundColor: "#F0F8FF"}} className="  shadow-sm m-0 border-1">
          {loading ? <Loading/> :
          <div className="shadow-sm mb-3 ">
            <Stack direction="horizontal" className="justify-content-between"> 
           <h2 className="subHeading mt-3">{ass.title} </h2>
           <h4 className="p-2"><Badge>{ass.score? assignmentMark || ass.score.mark : 0}%</Badge></h4>
           </Stack>
            <h3><Badge   bg="secondary">{ass.Compiler.name}</Badge> </h3>
             <Card className="bg-transparent p-2">
                <h3 className="my-2 subHeading">Learning Objectives</h3>
                <ul>
                    {ass.objectives.split("\n").map((val,index) => (<li key={index}>{val}</li>))}
                </ul>

                <h3 className="my-2 subHeading">Requirements</h3>
                
                    <div  dangerouslySetInnerHTML={{__html: ass.Compiler.requirement}} /> 
            

                <h3 className="my-2 subHeading">setup</h3>
                <p>Please use below <Link to={ass.Compiler.setupLink}> link </Link> to setup node js</p>
             </Card>
             <h3 className="subHeading my-2 p-1">Questions</h3>
             {ass.tasks.length === 0 ? <h3>No Questions Loaded</h3> : ass.tasks.map((val) => {
                return (<Question title={ass.title} assId = {assId} key={val.id} setAssignmentMark={setAssignmentMark} extension={ass.Compiler.extension} repo={ass.repository} gitMode={ass.gitMode} val={val} />)
             })}
            </div>
                }
        </Col>
    )
}
export { AssDescription }
