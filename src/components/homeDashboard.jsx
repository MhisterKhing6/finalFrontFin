import { useEffect, useState } from "react"
import {Badge, Table, Button, Col, ProgressBar, Stack, Card, Dropdown } from "react-bootstrap"
import { getFromBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { formatDate } from "../utils/datesManipulation"
import { getToken } from "../utils/localstorage"
import { Loading } from "./loading"
import { Countdown } from "./timerComponents/timer"
import { StudentAssignmentCard } from "./studentAssignments/assignmentCard"
import { BiArrowToBottom } from "react-icons/bi"
import { FaArrowDown, FaNeuter } from "react-icons/fa"
import { CgCalendarDates } from "react-icons/cg"
import { MdNumbers } from "react-icons/md"
import { BsTag } from "react-icons/bs"
import { FcNumericalSorting12 } from "react-icons/fc"
import { Fa1 } from "react-icons/fa6"
import { Link } from "react-router-dom"

const HomeDashboard = () => {
    const [openAss, setOpenAss] = useState([])
    const [grades, setGrades] = useState([])
    const [loading, setLoading] = useState(true)
    let k = []
    useEffect(()=> {
        const loadAssignments = async () => {
            let url = "/coder/student/open/assignments"
            let result = await getFromBackend(url, getToken(token.studentTokenKey))
            setOpenAss(result.data)
            setLoading(false)
        }
        loadAssignments()
    },[])
    return (
        <Col style={{backgroundColor: "#F0F8FF"}} className="shadow-sm p-2 border-1" xs={10} md={9} lg={10}>
          {loading ? <Loading /> : <>
          <div className="shadow-sm mb-3">
           <h4 style={{fontWeight:"bold"}} className="subHeading text-primary">Current Project </h4>
           { openAss.map(val=> {
            return (
                <StudentAssignmentCard val={val}/>
            )
           })}
        </div>

        <div className="shadow-lg my-2 bg-opacity-10 p-md-2">
           <h4 style={{fontWeight:"bold"}} className="subHeading text-primary">Scores</h4>
           
           <Button href="" className="w-100 bg-transparent text-black border-0">
                    <Stack  className="mb-3 shadow-lg p-2">
                        <Stack className="justify-content-between" direction="horizontal">
                            <h5 className="assTitle">Introduction to Java of a woman of a lousy love</h5> 
                            <div  className="p-1 btn-translucent-danger rounded">
                                Close
                            </div>
                        </Stack>
                        <div className="text-start">
                        80/100
                        <ProgressBar now={80} animated />
                        </div>
                        <Stack  direction="horizontal" className="my-2">
                            <div className="">
                            <Badge bg="primary">CSM 982</Badge>
                            </div>

                            <div className="mx-2">
                            <Badge bg="primary">{"</> Python"}</Badge>
                            </div>
                        </Stack>
                        <Dropdown className="text-start">
                        <Dropdown.Toggle  className="bg-dark p-1">            
                            More
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{fontSize:"18px"}} className="w-100 p-0 m-0">
                            
                        <div className="p-2 text-start">
                            <h6  style={{fontWeight:"bold"}} className="p-1 text-dark my-0">Assignment Info</h6>                           
                            <Table striped bordered hover size="sm">
                                <tbody>
                                    <tr>
                                        <td><CgCalendarDates className="me-2"/> Start Date</td>
                                        <td>15/83/20</td> 
                                    </tr>

                                    <tr>
                                        <td><CgCalendarDates className="me-2"/> End Date</td>
                                        <td>15/83/20</td> 
                                    </tr>

                                    <tr>
                                        <td><MdNumbers className="me-2"/> Number of Ques</td>
                                        <td>8</td> 
                                    </tr>
                                </tbody>
                            </Table>
                            
                            

                            <h5  style={{fontWeight:"bold"}} className="p-1 mt-2 text-dark my-0">Question Results</h5>                           
                            <Table striped bordered hover size="sm">
                                <thead style={{fontSize:"16px"}}>
                                    <th>Number</th>
                                    <th>Score (%)</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            1
                                        </td>
                                        <td>20</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            1
                                        </td>
                                        <td>20</td>
                                    </tr>
                                </tbody>
                            </Table>
                            
                            <div className="mt-2">
                                <Link className=""><Badge> View Assignment  </Badge></Link>
                            </div>
                            
                        </div>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Stack>
                </Button>     
        </div>
            </>
            }
        </Col>
    )
}
export { HomeDashboard }
