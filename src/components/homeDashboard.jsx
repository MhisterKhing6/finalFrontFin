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
           <h4 style={{fontWeight:"bold"}} className="subHeading text-primary">Projects</h4>
           { openAss.map(val=> {
            return (
                <StudentAssignmentCard val={val}/>
            )
           })}
        </div>

        
            </>
            }
        </Col>
    )
}
export { HomeDashboard }
