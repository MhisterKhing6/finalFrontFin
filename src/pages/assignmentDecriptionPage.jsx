import { useContext, useEffect, useState } from "react"
import { Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { AssDescription } from "../components/assignmentsDescripitonPage"
import { Loading } from "../components/loading"
import { StudentNavbar } from "../components/navbarStudent"
import { StudentContext } from "../context/studentContext"
import { getFromBackend } from "../utils/backendCalls"
import { getToken } from "../utils/localstorage"
import { token } from "../utils/config"
const AssignmentDescription = () => {
    const {id} = useParams()
    const [assignments, setAssignment] = useState({})
    const redirect = useNavigate()
    const [loading, setLoading] = useState(true)
    const [asloading, setAssLoading] = useState(true)
    const {loadDetails, setAuthenticated ,authenticated, student, setStudent} = useContext(StudentContext)
    useEffect(()=> {
        loadDetails(setStudent, student,setLoading, setAuthenticated, redirect )

    }, [authenticated])

    
    return (<>  
        {loading ? <Loading /> :
            <section className="student p-0 ">

                <Container className="shadow-sm p-0">
                <StudentNavbar className="m-0" />
                    <Row className="m-0 mw-100" >
                        <AssDescription assId={id}  className="my-4"/>
                    </Row>
                </Container>
            </section>  }
    </>)
} 

export { AssignmentDescription }
