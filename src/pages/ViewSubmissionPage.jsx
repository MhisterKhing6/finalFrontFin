import { useContext, useEffect, useState } from "react"
import { Badge, Button, Col, Container, Form, InputGroup, Pagination, Row, Table } from "react-bootstrap"
import { FaSearch } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { Loading } from "../components/loading"
import { LecturerNavbar } from "../components/navbarLecturer"
import { LecturerContext } from "../context/lecturerContext"
import { getFromBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { getToken } from "../utils/localstorage"

const ViewSubmissionPage = () => {

    const [loading, setLoading] = useState(false)
    const redirect = useNavigate()
    const [loadingDetail, setLoadingDetail] = useState(true)
    const [submission, setSub] = useState({})
    const {assId, status} = useParams()
    const {loadAssignment, setAssignment, assignment,loadDetails, authenticated, setAuthenticated, lecturer, setLecturer} = useContext(LecturerContext)
    useEffect(()=> {
        
        const loadProfile = async () => {
            await loadDetails(setLecturer, lecturer,setLoading, setAuthenticated,redirect)
            let detailedUrl = "/coder/lecturer/submission/" + assId
            let response = await getFromBackend(detailedUrl, getToken(token.lecturerTokenKey))
            setSub(response.data)
            console.log(response.data)
            setLoadingDetail(false)
        }
        loadProfile()
    },[authenticated])
    const formatDate = (date) => {
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay()
    }
    let loadPage = async(val) => {
        let value  = val
        if(value !== submission.page) {
            //fetch page
            let detailedUrl = `/coder/lecturer/submission/${assId}?limit=30&&page=${value}`
            let response = await getFromBackend(detailedUrl, getToken(token.lecturerTokenKey))
            setSub(response.data)
        }
    }

    let handleChange = async (val) => {
        console.log(val.target.value)
        let response = submission.items.filter(val => {
            return val.Student.index.search(val) !== -1
        })
        if (response.length === 0) {
            submission.search = val.target.value.replace(/ +/g, "")
            let detailedUrl = `/coder/lecturer/submission/${assId}?page=1&&search=${submission.search}`
            let data = await getFromBackend(detailedUrl, getToken(token.lecturerTokenKey))
            console.log(data)
            setSub(data.data)
        } else {
            setSub({...submission, items:response})
        }
    }
    let items = []
    for(let i=1; i <= Math.ceil(submission.totalCount / submission.limit) ; i++) {
        items.push(<Pagination.Item onClick={async (val) => await loadPage(i)} active = {submission.page === i} key={i}>{i}</Pagination.Item>)
    }
    return (
        <>
        {(loading || loadingDetail) ? <Loading /> : 
        <>
        <LecturerNavbar />
        <div className="w-100 min-vh-100">
        <Container>
            <Row>
            <div className="border-bottom mb-4 pt-5">
            <h4 style={{fontWeight:"bolder"}} className=" mb-3 mt-2">View Assignment Submission</h4>
                    <div className="d-flex flex-wrap flex-md-nowrap justify-content-between">
                    <p className="text-muted">
                    Assignment Title: {submission.title}
                    </p>
                    </div>
                </div>
                <Container className="my-4">
                <div  className=''>
                                <h6 className='mb-0'></h6>
                                <div className='fs-xs'>{submission.totalCount}/{submission.totalStudents} students submitted</div>
                             </div>
                             <div className="progress mt-1 mb-1">
                             <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:`${(submission.totalCount/submission.totalStudents)*100}%`}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                    <Row className="py-3">
                        <Col xs={6} md={3} lg={2} className="mb-2">
                        <Button href={`http://localhost:3005/api/download/submission/${assId}?type=excell`} className="w-100"  variant="outline-primary">Export to Excel</Button>
                        </Col>
                        <Col xs={6} md={3} lg={2} className="mb-2">
                        <Button href={`http://localhost:3005/api/download/submission/${assId}?type=pdf`} className="w-100"  variant="outline-dark">Export to PDF</Button>
                        </Col>
                        <Col xs={12} md={3} lg={8}>
                        <InputGroup  className="w-100">
                        <InputGroup.Text>
                        <FaSearch />
                        </InputGroup.Text>
                        <Form.Control onChange={handleChange} type="text"  placeholder="student index number"/>
                    </InputGroup>
                        </Col>
                    </Row>

                    <Table striped bordered hover className="text-center">
                        <thead style={{fontWeight:"bold"}}>
                            <td><h5>Name </h5></td>
                            <td><h5>Index </h5></td>
                            <td><h5>Marks </h5></td>
                            {submission.plagiarism && <td><h5>Plagiarism </h5></td>}
                            <td><h5>Date </h5></td>
                        </thead>
                        <tbody>
                            {submission.items.map(item => {
                               return (<tr>
                                <td>{item.Student.name}</td>
                                <td>{item.Student.index}</td>
                                <td>{item.mark}</td>
                                {submission.plagiarism && <td>{item.plagiarism}</td>}
                                <td>{formatDate(new Date(item.createdAt))}</td>
                            </tr>)
                            })}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-end">
                    <Pagination>
                        {items}
                    </Pagination>
                    </div>
                </Container>
                
            </Row>

        </Container>
        </div>
        </>
            }
        </>
    )
}
export { ViewSubmissionPage }
