import { Image, Modal } from "react-bootstrap";
import animate from "../../assets/animate.gif";
import "../verfyemail.css";

const CongratsQuestion = ({text, show, onHide}) => {
    return (
        <Modal centered  show={show} onHide={onHide}>
        <Modal.Body  className="d-flex flex-column align-items-center justify-content-center">
        <Image width={"100"} height={"100"} className="mx-auto" src={animate} />
        <h2> 
            {text || "Task Saved"}
        </h2>
        </Modal.Body>
        </Modal>
    )
}

export { CongratsQuestion };
