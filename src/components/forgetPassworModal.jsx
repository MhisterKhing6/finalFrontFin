
import { useContext, useState } from "react"
import { Button, FloatingLabel, Form, Modal, Spinner, Stack } from "react-bootstrap"
import { CgClose } from "react-icons/cg"
import fg from "../assets/fg.png"
import {VerificationContext}  from "../context/verificationContext"
import { getFromBackend } from "../utils/backendCalls"
import { AlertToast } from "./alertTracker"
import { NewPwd } from "./newPassword"
import { VerificationEntry } from "./verificationNumber"


const FgPwdModal = ({url, user}) => {
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const {showFg, setShowFg, setShow, handleClose, setVid} = useContext(VerificationContext)
    //state vcode
    const [email, setEmail] = useState("")
    //handle spinner and button disabling
    const [startSpinner, setShowSpinner] = useState(false)
    //disable resend email
    const [newPwd, setShowNewPwd] = useState(false)
    
    

    const toggleError = () => {setShowError(!showError)} 

    const closeNewPwd = ()=> setShowNewPwd(false)
    return (
        <>
        <Modal size="md" position="center"  centered show={showFg} onHide={() => setShowFg(false)} backdrop="static">
            <Stack  className="w-100 h-100 p-1 shadow-lg justify-content-center align-items-center">
                <AlertToast show={showError} text={error} toggleShow={toggleError} />
                <Button variant="dark" onClick={() => setShowFg(false) } className="align-self-end"><CgClose /></Button>
                <div className="text-center">
                    <div className="mx-auto">
                        <img style={{width: '150px', height: "150px "}} className="img-fluid" src={fg} alt="email" />
                    </div>
                    <div>
                        <h1 className=" heading  my-1"><b>Reset Password</b> </h1>
                    </div>
                </div>
                    <Form className="p-1" onSubmit={async (e) => {
                        e.preventDefault()
                       setShowSpinner(true)
                       let url = `/api/auth/email/reset-password/${email}/${user}`
                        let response = await getFromBackend(url)
                        if(response.status !== 200) {
                            //dos stuff here
                            setError(response.data.reason)
                            setShowError(true)
                        } else {
                            setVid(response.data.id)
                            setShowFg(false)
                            setShow(true)
                            
                        }
                        setShowSpinner(false)
                    }}>
                        <FloatingLabel className=" w-100 my-2" label="Email">
                            <Form.Control min={4} value={email} onChange={(val)=> setEmail(val.target.value)} style={{width:"100%"}} type="text"required placeholder="Email" />
                            
                        </FloatingLabel>
                        
                        <Button  disabled={startSpinner} type="submit" style={{width:"100%"}}>Submit</Button>
                        {startSpinner && <Spinner className="m-1 child" /> }
                    </Form> 
                    <div className="my-1 w-100 p-4">          
                
             </div>
            </Stack>
        </Modal>
        <VerificationEntry url={url} fg={"fg"} email={email} />
        </>
        
    )
}
export { FgPwdModal }
