import { useContext, useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { ViewCourse } from "../components/courseDashboard"
import { HomeDashboard } from "../components/homeDashboard"
import { Loading } from "../components/loading"
import { StudentDashboardNav } from "../components/studentDashboardNav"
import { StudentContext } from "../context/studentContext"
import { useLocation } from "react-router-dom"
const StudentDashboard = () => {
    const [home, setHome] = useState(true)
    const [assignments, setAssignments] = useState(false)
    const [scores, setScores] = useState(false)
    const redirect = useNavigate()
    const [loading, setLoading] = useState(true)
    const {loadDetails, authenticated, setAuthenticated, student, setStudent} = useContext(StudentContext)
    const location = useLocation()
    
    
    useEffect(()=> {
        loadDetails(setStudent, student,setLoading, setAuthenticated, redirect )
        if(location.state) {
        if(location.state.r === "s") {
            setHome(false)
            setScores(true)
        }
        if(location.state.r === "a")
        {
            setHome(false)
            setAssignments(true)
        }
    }
    }, [authenticated])
    return (<>  
            {loading ? <Loading /> :
            <section className="student">
                <Container className="shadow-lg">
                    <Row>
                        <StudentDashboardNav home={home} ass={assignments} scores={scores} setHome={setHome} setAss={setAssignments} setScores={setScores}/>
                        {home &&<HomeDashboard />}
                        {assignments && <ViewCourse url={"/course/assignment/"} title={"Assignments"} />}
                        {scores && <ViewCourse  url={'/course/grades/assignment/'} title={"Scores"} />}
                    </Row>
                </Container>
            </section>
}
    </>)
} 

export { StudentDashboard }
