import { useEffect, useState } from "react"
import { Badge, Button, Col, Stack } from "react-bootstrap"
import { getFromBackend } from "../../utils/backendCalls"
import { token } from "../../utils/config"
import { getToken } from "../../utils/localstorage"
import { Loading } from "../loading"
import { ScoreAssignment } from "./scores"

const GradesCard = ({course, id}) => {
    const [openAss, setOpenAss] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const loadAssignments = async () => {

            let url = "/coder/student/score/assignment-course/" + id
            let result = await getFromBackend(url, getToken(token.studentTokenKey))
            console.log(result)
            setOpenAss(result.data)
            setLoading(false)
        }
        loadAssignments()
    },[])
    return (
        <Col style={{backgroundColor: "#F0F8FF"}} className="shadow-sm p-2 border-1" xs={10} md={9} lg={10}>
          {loading ? <Loading /> : <>
          <div className="shadow-sm mb-3">
           <h4 style={{fontWeight:"bold"}} className="subHeading text-primary"> {course} Grades</h4>

           {openAss.length === 0 ? "No Assignment for this Course" : openAss.map(val=> {
            return (
            <ScoreAssignment key={val.id} val={val}/>
            )
           })}
                </div>
        </>
            }
        </Col>
    )
}
export { GradesCard }
