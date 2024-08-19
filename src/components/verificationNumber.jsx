
import { useContext, useState } from "react"
import { Button, FloatingLabel, Form, Modal, Spinner, Stack } from "react-bootstrap"
import { CgClose } from "react-icons/cg"
import emailPic from "../assets/email.png"
import { VerificationContext } from "../context/verificationContext"
import { getFromBackend } from "../utils/backendCalls"
import { AlertToast } from "./alertTracker"
import { CongratulationsAccount } from "./congratulation"
import { NewPwd } from "./newPassword"


const VerificationEntry = ({email, url, fg}) => {
    const [error, setError] = useState("")
    const [showError, setShowError] = useState(false)
    const {show, handleClose, vid} = useContext(VerificationContext)
    //state vcode
    const [vcode, setVcode] = useState("")
    //handle spinner and button disabling
    const [startSpinner, setShowSpinner] = useState(false)
    //disable resend email
    //handle congratualations modal
    const [showCongrats, setShowCongrats] = useState(false)
    const [disResend, setDis] = useState(false)
    //handle new pwd next page
    const [shoPwdNextPage, setShowPwdNextPage] = useState(false) 

    const toggleError = () => {setShowError(!showError)}
    //handle new pwd net page


    const closeCongratsModel = ()=> setShowCongrats(false)
    
    return (
        <>
        <Modal size="md" position="center" centered show={show} onHide={handleClose} backdrop="static">
            <Stack  className="w-100 h-100 p-1 shadow-lg justify-content-center align-items-center">
                <AlertToast show={showError} text={error} toggleShow={toggleError} />
                <Button variant="dark" onClick={handleClose} className="align-self-end"><CgClose /></Button>
                <div className="text-center">
                    <div className="mx-auto">
                        <img style={{width: '150px', height: "150px "}} className="img-fluid" src={emailPic} alt="email" />
                    </div>
                    <div>
                        <h1 className=" heading  my-1"><b>Check your Email </b> </h1>
                        <p style={{fontSize: "20px"}}>We have sent a verification Code to <b>{email}</b><br /><b />Kindly enter the code in the box below</p>
                    </div>
                </div>
                    <Form className="p-1" onSubmit={async (e) => {
                        e.preventDefault()
                       setShowSpinner(true)
                       let url = fg==="fg" ? `/api/auth/email/reset-password/verify/${vid}/${vcode}`: `/api/auth/verify/email/${vid}/${vcode}`
                       let response = await getFromBackend(url)
                        if(response.status !== 200) {
                            //dos stuff here
                            setError(response.data.reason)
                            setShowError(true)
                        } else {
                            if(fg==="fg")
                                setShowPwdNextPage(true)
                            else {
                            setShowCongrats(true)
                            }
                            handleClose()
                        }
                        setShowSpinner(false)
                    }}>
                        <FloatingLabel className=" w-100 my-2" label="Verification Code">
                            <Form.Control min={4} value={vcode} onChange={(val)=> setVcode(val.target.value)} style={{width:"100%"}} type="text"required placeholder="Verification Number" />
                            
                        </FloatingLabel>
                        
                        <Button  disabled={startSpinner} type="submit" style={{width:"100%"}}>Submit</Button>
                        {startSpinner && <Spinner className="m-1 child" /> }
                    </Form> 
                    <div className="my-1 w-100 p-4">          
                <Button disabled={disResend} variant="link" className="text-start" onClick= {async (e) => {
                    console.log(vid)
                    let response = await getFromBackend("/api/auth/resend/email/" + vid)
                    if (response.status !== 200) {
                        setError(response.data.reason)
                        setShowError(true)
                    }
                    else {
                        setError("Email Sent,please check you inbox or spam folder.Email should be received in 5 mins time")
                        setDis(true)
                        setShowError(true)
                        setTimeout(() => {setDis(false)}, 500000)
                    }
                }}  style={{fontWeight: "bold", fontSize: "1rem"}} > Didn't receive email?  click to resend</Button>
             </div>
             
            </Stack>
        </Modal>
        <NewPwd url={url} show={shoPwdNextPage} handleClose={() => setShowPwdNextPage(false)} />
        <CongratulationsAccount show={showCongrats} setShow={closeCongratsModel} url={url} /> 
        </>
        
    )
}
export { VerificationEntry }
