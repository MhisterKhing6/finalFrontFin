import { useContext, useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { Loading } from "../components/loading"
import { StudentDashboardNav } from "../components/studentDashboardNav"
import { StudentContext } from "../context/studentContext"
import { GradesCard } from "../components/studentAssignments/StudentCourseGrade"

const StudentGradeCourse = ({title, url}) => {
    const [home, setHome] = useState(false)
    const [assignments, setAssignments] = useState(true)
    const [scores, setScores] = useState(false)
    const redirect = useNavigate()
    const [loading, setLoading] = useState(true)
    const {loadDetails, authenticated, setAuthenticated, student, setStudent} = useContext(StudentContext)
    const {cId} = useParams()

    useEffect(()=> {
        loadDetails(setStudent, student,setLoading, setAuthenticated, redirect )
    }, [authenticated])
    return (<>  
            {loading ? <Loading /> :
            <section className="student">
                <Container className="shadow-lg">
                    <Row>
                        <StudentDashboardNav r='true' home={home} ass={assignments} scores={scores} setHome={setHome} setAss={setAssignments} setScores={setScores}/>
                        <GradesCard url={url} id={cId}/>
                    </Row>
                </Container>
            </section>
}
    </>)
} 

export {StudentGradeCourse}
