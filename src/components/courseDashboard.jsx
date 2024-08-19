import { useEffect, useState } from "react"
import { Button, Card, Col, Row } from "react-bootstrap"
import { getFromBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { getToken } from "../utils/localstorage"
import { Loading } from "./loading"

const ViewCourse = ({title, url}) => {
    const [course, setCourses] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(()=> {
        const load = async () => {
            //let url
            let url = "/coder/student/courses"
            let response = await getFromBackend(url, getToken(token.studentTokenKey))
            if(response.status === 200)
                setCourses(response.data)
            else 
                console.log(response)
            setLoading(false)
        }
        load()
    }, [])
    return (
       <Col style={{backgroundColor: "#F0F8FF"}} className=" p-2 border-1" xs={10} md={9} lg={10}>
        {loading ? <Loading /> :
        <div className=" my-2 bg-opacity-10 p-md-2">
           <h4 className="subHeading p-1 ">{title} </h4>
                    {course ? <Row>
                        { course.map(studentCourse => {
                            console.log(studentCourse.id)
                        return <Col className=""  xs={12} md={6} lg={4} key={studentCourse.courseCode}>
                        <Button  href={`${url}${studentCourse.id}`} className="p-sm-2 w-100 shadow-none bg-transparent text-black border-0">
                        <Card style={{height:"150px"}} className="overflow-hidden p-2 border-0 styleCard shadow-lg">
                            <Card.Title>{studentCourse.courseCode}</Card.Title>
                            <Card.Body style={{fontSize:"20px"}} className="overflow-hidden">{studentCourse.courseName}</Card.Body>
                        </Card>
                        </Button>
                        </Col>
                        }
                        )}
                    </Row>: <h5>No Courses Loaded For Class</h5>}
            </div>
                }      
        </Col>
                    
    )
}
export { ViewCourse }
