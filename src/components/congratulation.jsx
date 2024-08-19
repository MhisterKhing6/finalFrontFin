
import { useState } from "react"
import { Button, Modal, Stack } from "react-bootstrap"
import { CgClose } from "react-icons/cg"
import verified from "../assets/verified.png"


const CongratulationsAccount = ({url, show, setShow, fg}) => {
    let title = fg === "fg" ? "Password  Changed" : "Account Verified"
    return (
        <Modal position="center"  show={show} onHide={setShow} backdrop="static">
            <Stack  className="w-100 h-100 p-1 shadow-lg justify-content-center align-items-center">
                <Button onClick={setShow} variant="dark"  className="align-self-end"><CgClose /></Button>
                <section className="container">
                    <section className=" p-2 raise d-flex flex-column justify-content-center align-items-center">
                        <div>
                            <img style={{width: '150px', height: "150px "}} className="img-fluid" src={verified} alt="email" />
                        </div>
                        <article className="text-center">
                            <h2 className="heading  my-1"><b> {title} </b> </h2>
                            <p style={{fontSize: "20px"}}>Thanks for your Co-operation</p>
                        </article>
                        <Button href={url} className="my-2 mb-5" style={{fontWeight: "bold", fontSize: "1rem"}}>Back to Login</Button>
                    </section>
                </section>
            </Stack>
        </Modal>
        
    )
}
export { CongratulationsAccount }
