import { Card, Col, Container, Row } from "react-bootstrap";
import { BiFolder, BiFolderMinus } from "react-icons/bi";
import { CiEdit, CiViewBoard } from "react-icons/ci";
import { FaFolderOpen } from "react-icons/fa";
import { IoBarChart } from "react-icons/io5";
import { MdAssignmentAdd } from "react-icons/md";
import { DashBoardElement } from "./dasboardElement";

const LecturerDashboard = ()=> {
    let actions = [{url:"/lecturer/create/assignment", title: "Create Assignment", desc:"Design programming assignments to challenge students, enhance coding skills, and cultivate problem-solving abilities through hands-on practice and real-world scenarios.", "icon": <MdAssignmentAdd style={{fontSize: "3rem"}} />},
                   {url: "/lecturer/view-assignment" , "title": "View Assignments", desc:"View created assignments effortlessly, ensuring clarity, coherence, and alignment with learning objectives for seamless instruction and assessment.", icon: <CiViewBoard style={{fontSize: "3rem"}} /> },
                   {url:"/lecturer/view-assignment", "title": "Edit Assignment", desc: "Effortlessly modify existing assignments, tailoring content, adjusting parameters, and refining instructions to meet evolving educational needs with precision and ease.", icon: <CiEdit style={{fontSize: "3rem"}} />},
                   {url:"/lecturer/view-assignment", "title": "Student Result", desc: "Easily review student assignment results in various formats, ensuring accessibility and facilitating comprehensive assessment and feedback for effective learning.",icon:<IoBarChart style={{fontSize: "3rem"}} />}]
    
    return(
        <>
        <Container fluid >
            <Row>
            {
                actions.map((val) => {
                    return (
                        <DashBoardElement url={val.url} key={val.title} title={val.title} desc={val.desc}>
                            {val.icon}
                        </DashBoardElement>
                    )
                })
            }
            </Row>
            <Row>
                <Col  className="p-sm-5" xs={12} md={6} lg={5} xl={4} xxl={3}>

                    <Card className="bg-body-tertiary mb-3">
                        <Card.Header className="d-flex justify-content-between m-0 py-2">
                            <Card.Title className="m-0">Assignment</Card.Title>
                            <BiFolder size={"30px"} className="rounded-circle shadow-lg p-1 btn-translucent-primary" />
                        </Card.Header>
                        <Card.Body className=" px-3 py-1">
                        <p className="card-text fs-sm my-2">Number of Assignments</p>
                            <div className="">
                            <h3 className='my-2'>600</h3>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="bg-body-tertiary mb-3">
                        <Card.Header className="d-flex justify-content-between m-0 py-2">
                            <Card.Title className="m-0">Open</Card.Title>
                            <FaFolderOpen size={"30px"} className="rounded-circle shadow-lg p-1 btn-translucent-success" />
                        </Card.Header>
                        <Card.Body className="mb-0 px-3 py-1">
                        <p className="card-text fs-sm my-2">Number of Assignments Open</p>
                            <div className="m-0">
                            <h3 className='my-2'>600</h3>
                            </div>
                        </Card.Body>
                    </Card>

                    <Card className="bg-body-tertiary">
                        <Card.Header className="d-flex justify-content-between m-0 py-2">
                            <Card.Title className="m-0">Close</Card.Title>
                            <BiFolderMinus size={"30px"} className="rounded-circle shadow-lg p-1 btn-translucent-danger" />
                        </Card.Header>
                        <Card.Body className="mb-0 px-3 py-1">
                        <p className="card-text fs-sm my-2">Number of Assignments Close</p>
                            <div className="m-0">
                            <h3 className='my-2'>600</h3>
                            </div>
                        </Card.Body>
                    </Card>

                    
                 </Col>
                <Col xs={12} md={6} lg={7} xl={8} xxl={9} className="my-5 h-100" >
                 <Card className="bg-body-tertiary p-2 w-100">
                    <Card.Title>Assignment Completed</Card.Title>
                    <Card.Body>
                        <Card className="my-3">
                            <Card.Body>
                            <div  className='mb-0'>
                                <h6 className='mb-0'>Introduction to python</h6>
                                <div className='fs-xs'>200/400 students submitted</div>
                             </div>
                             <div className="progress mt-1 mb-1">
                             <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:'90%'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>  
                            </Card.Body>
                        </Card>

                        <Card className="my-3">
                            <Card.Body>
                            <div  className='mb-0'>
                                <h6 className='mb-0'>Introduction to C++</h6>
                                <div className='fs-xs'>200/400 students submitted</div>
                             </div>
                             <div className="progress mt-1 mb-1">
                             <div className="bg-danger progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:'80%'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </Card.Body>
                        </Card>

                        <Card className="my-3">
                            <Card.Body>
                            <div  className='mb-0'>
                                <h6 className='mb-0'>Introduction to C++</h6>
                                <div className='fs-xs'>200/400 students submitted</div>
                             </div>
                             <div className="progress mt-1 mb-1">
                             <div className="bg-success progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:'80%'}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>  
                            </Card.Body>
                        </Card>
                        
                    </Card.Body>
                 </Card> 
                </Col>
            </Row>
        </Container>
        </>
    )
}

export { LecturerDashboard };

