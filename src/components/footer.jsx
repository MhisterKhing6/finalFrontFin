import {Stack, Container, Card, Col, Button} from "react-bootstrap"
import { IoIosCreate } from "react-icons/io"
import {Row} from "react-bootstrap"
import { FaRegNewspaper } from "react-icons/fa"
import { FaGithub } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
const Footer = () => {
    return (
        <section style={{backgroundColor:"#000000", minHeight:"400px"}}>
                <Container>
                <Row >
                    <Col md={6} className="my-4 p-3">
                    <Card style={{minHeight:'350px',backgroundColor:"#000000", color:"white", border:"2px solid white"}} >
                        <Card.Body className="p-5" >
                            <Stack direction="vertical" gap={4} style={{alignItems:"center", justifyContent:"center"}}>
                                <h1>
                                    <IoIosCreate />
                                </h1>
                                <h1 className="subHeading text-center">Ready to integrate our services in your school?</h1>
                                <Button size="lg" href="" variant="primary">Request a Call</Button>

                            </Stack>
                        </Card.Body>
                    </Card>
                    </Col>
                    <Col className="my-4 p-3">
                    <Card style={{minHeight:'350px',backgroundColor:"#000000", color:"white", border:"2px solid white"}} >
                        <Card.Body className="p-5" >
                            <Stack direction="vertical" gap={4} style={{alignItems:"center", justifyContent:"center"}}>
                                <h1>
                                    <FaRegNewspaper />
                                </h1>
                                <h1 className="subHeadin text-center ">Automate Assignment Creation and Grading</h1>
                                <Button href="" size="lg" variant="primary">Get Started</Button>

                            </Stack>
                        </Card.Body>
                    </Card>
                    </Col>
                </Row>
                <Row className="text-white">
                    <Col md={6} lg={4}>
                    <Stack gap={2}>
                        <h3>Need Support?</h3>
                        <Button className="footerBtn" size="md">Contact Us</Button>
                        <Stack gap={2} direction="horizontal" className="my-3">
                        <Button href=""> <FaGithub /></Button>
                        <Button href=""><CiFacebook /> </Button>
                        <Button> <FaYoutube /></Button>
                        <Button> <FaLinkedin /></Button>                        </Stack>
                    </Stack>
                    </Col>
                    <Col className="p-3" md={6} lg={4}>
                    <Stack>
                        <h5 className="my-2">Products</h5>
                        <h6 className="my-1">Assignment Management</h6>
                        <h6 className="my-1">Custom Grading Rubric</h6>
                        <h6 className="my-1">Code Quality Check</h6>
                        <h6 className="my-1">Real time Grading Response</h6>
                        <h6 className="my-1">Documentation Check</h6>
                        <h6 className="my-1">Student Assignment History</h6>
                    </Stack>
                    </Col>
                    <Col className="p-3" md={6} lg={4}>
                    <Stack>
                        <h5 className="my-2">Suported Languages</h5>
                        <h6 className="my-1">C++</h6>
                        <h6 className="my-1">C</h6>
                        <h6 className="my-1">Java</h6>
                        <h6 className="my-1">Php</h6>
                        <h6 className="my-1">Ruby</h6>
                        <h6 className="my-1">Js</h6>
                        <h6 className="my-1">Python</h6>
                    </Stack>
                    </Col>

                </Row>
        
            </Container>
        </section>
    )
}
export {Footer}