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
const ReqResult = ({status, name, message}) => {
    const [show, setShow] = useState(false)

    const handleClick = () => {
        setShow(true)
    }
   
    if(status) 
     {
        return (
            <>
            <Col xs={6} md={3} lg={2} className="my-1">
            <h4><Badge className="w-100 d-flex justify-content-center"  bg="success">{name} <IoCheckmark className="mx-1" /> </Badge> </h4>
            </Col>
            </>
        )
     } else 
    return (
            <>
            <TestModal message={message} show={show} onClose={() => setShow(false)} />
            <Col xs={6} md={3} lg={2} className="my-1">
                <h4><Badge  onClick={handleClick} className="w-100 d-flex mx-1 justify-content-center"  bg="danger">{name} <IoMdCloseCircle /></Badge> </h4>
            </Col>
            </>     
    )
}
export { ReqResult }
