import { useState } from "react"
import { Badge, Col, Modal } from "react-bootstrap"
import { IoMdCloseCircle } from "react-icons/io"
import { IoCheckmark } from "react-icons/io5"

const TestModal = ({message, onClose,pass, show}) => {
    return (<Modal centered show={show} onHide={onClose}>
        <Modal.Header className={pass ? 'bg-success': 'bg-danger-subtle'} closeButton></Modal.Header>
        <Modal.Body className="p-3">
            {message}
        </Modal.Body>
    </Modal>)
}
const TestResult = ({status, feedback, testNumber, error}) => {
    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(true)
    }
    if(error) {
        return ( 
        <>
            <TestModal message={feedback} pass={false} show={show} onClose={() => setShow(false)} />
            <Col xs={6} md={3} lg={2} className="my-1">
            <h3><Badge onClick ={handleClick} className="d-flex justify-content-center w-100"  bg="danger">Test 0 <IoMdCloseCircle className="mx-1" /> </Badge> </h3>
            </Col>
        </>
            )
    }
    if(status) 
     {
        return (
            <>
            <TestModal message={feedback} pass={true} show={show} onClose={() => setShow(false)} />
            <Col xs={6} md={3} lg={2} className="my-1">
            <h3><Badge onClick ={handleClick} className="w-100 d-flex justify-content-center"  bg="success">Test {testNumber} <IoCheckmark className="mx-1"/> </Badge> </h3>
            </Col>
            </>
        )
     } else 
    return (
            <>
            <TestModal message={feedback} show={show} onClose={() => setShow(false)} />
            <Col xs={6} md={3} lg={2} className="my-1">
                <h3><Badge onClick={handleClick} className="w-100 d-flex justify-content-center"  bg="danger">Test {testNumber} <IoMdCloseCircle className="mx-1" /></Badge> </h3>
            </Col>
            </>     
    )
}
export { TestResult }
