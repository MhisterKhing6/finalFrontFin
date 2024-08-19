
import { useContext, useState } from "react"
import { Button, FloatingLabel, Form, Modal, Spinner, Stack } from "react-bootstrap"
import { CgClose } from "react-icons/cg"
import chPwd from "../assets/changeImage.jpg"
import  {VerificationContext}  from "../context/verificationContext"
import { postToBackend } from "../utils/backendCalls"
import { AlertToast } from "./alertTracker"
import { CongratulationsAccount } from "./congratulation"


const NewPwd = ({url,show, handleClose}) => {
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const {vid} = useContext(VerificationContext)
    //state vcode
    const [cpwd, setCpwd] = useState("")
    const [password, setPassword] = useState("")
    //handle spinner and button disabling
    const [startSpinner, setShowSpinner] = useState(false)

    const [showCongrats, setShowCongrats] = useState(false)
    //disable resend email
    
    

    const toggleError = () => {setShowError(!showError)} 

    return (
        <>
        <CongratulationsAccount fg="fg" url={url} show={showCongrats} setShow={(val) => setShowCongrats(false)} />
        <Modal size="md" position="center" centered show={show} onHide={handleClose} backdrop="static">
            <Stack  className="w-100 h-100 p-1 shadow-lg justify-content-center align-items-center">
                <AlertToast show={showError} text={error} toggleShow={toggleError} />
                <Button variant="dark" onClick={handleClose} className="align-self-end"><CgClose /></Button>
                <div className="text-center">
                    <div className="mx-auto">
                        <img style={{width: '200px', height: "150px "}} className="img-fluid" src={chPwd} alt="email" />
                    </div>
                    <div>
                        <h1 className=" heading  my-1"><b>New Password</b> </h1>
                    </div>
                </div>
                    <Form className="p-1" onSubmit={async (e) => {
                      e.preventDefault()
                      if(password != cpwd) {
                        setError("Passwords don't match")
                        setShowError(true)
                      } else {
                       setShowSpinner(true)
                       let url = "/api/auth/user/reset-password"
                        let response = await postToBackend(url, {pwd:password, verificationId:vid})
                        if(response.status !== 200) {
                            //dos stuff here
                            setError(response.data.reason)
                            setShowError(true)
                        } else {
                            setShowCongrats(true)
                            handleClose()

                        }
                    }
                        setShowSpinner(false)
                    }}>
                        <FloatingLabel className=" w-100 my-2" label="New Password">
                            <Form.Control min={4} value={password} onChange={(val)=> setPassword(val.target.value)} style={{width:"100%"}} type="password"required placeholder="new password" />
                        </FloatingLabel>

                        <FloatingLabel className=" w-100 my-2" label="Confirm Password">
                            <Form.Control min={4} value={cpwd} onChange={(val)=> setCpwd(val.target.value)} style={{width:"100%"}} type="password"required placeholder="Email" />
                        </FloatingLabel>
                        
                        <Button  disabled={startSpinner} type="submit" style={{width:"100%"}}>Submit</Button>
                        {startSpinner && <Spinner className="m-1 child" /> }
                    </Form> 
                    <div className="my-1 w-100 p-4">          
                
             </div>

            </Stack>
        </Modal>
        </>
        
    )
}
export { NewPwd }
