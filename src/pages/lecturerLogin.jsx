import { useContext, useState } from "react"
import { Button, Container, Form, Image, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import logo from "../assets/logo-color.png"
import { AlertToast } from "../components/alertTracker"
import { FgPwdModal } from "../components/forgetPassworModal"
import { GeneralNavbar } from "../components/headerLanding"
import { VerificationContext } from "../context/verificationContext"
import { postToBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { saveToken } from "../utils/localstorage"

const LoginLecturer = () => {
    const redirect = useNavigate()
    const [loginDetails, setLoginDetails] = useState({"lecturerId":"","password":"" })

    const [showError, setError] = useState(false)

    const [errorMessage, setErrorMessage] = useState("")

    const [showSpinner, setSpinner] = useState(false)
    const {setShowFg} = useContext(VerificationContext)
    
    const setLoginValue = (property, val) => {
        loginDetails[property] = val.target.value 
        setLoginDetails({...loginDetails})
    }
    

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setSpinner(true)
        //handle request
        let result = await postToBackend("/api/auth/login/lecturer", loginDetails)
        if(result.status !== 200)
            {
                setErrorMessage(result.data.reason)
                setError(true)
            } else {
                saveToken(token.lecturerTokenKey, result.data.token)
                redirect("/lecturer/dashboard")
            }
        setSpinner(false)
    }
    return (
        <>
        <FgPwdModal url="/auth/login/student" user="LECTURER" />
        <GeneralNavbar  />
        <section className="py-5 px-2 hv-100">
        <Container  className="p-4 shadow-lg rounded-3" style={{width:"400px"}}>
                <div className="mb-2 d-flex justify-content-center">
                <Image className="mx-auto" src={logo} width={80} height={50} />
                </div>
                <p className="text-center">Lecture Login</p>
                <hr />
                <Form onSubmit={handleSubmit}  className=" text-start border-2 parent  ">
                <AlertToast show={showError} text={errorMessage} toggleShow={() => setError(false)} />

                    <Form.Label id="em"  className="subHeading my-1" >Lecturer Id</Form.Label>
                    <Form.Control required onChange={(val) => setLoginValue("lecturerId", val)} value={loginDetails.studentId} id="em" size="md"  type="text" />
                    <Form.Label id="em" className="subHeading my-1" >Password </Form.Label>
                    <Form.Control required onChange={(val) => setLoginValue("password", val)} value={loginDetails.password} id="em" size="md"  type="password" />
                    <Button disabled={showSpinner} className="parent my-3 w-100" type="submit"><h4> Login </h4></Button>
                    {showSpinner && <Spinner className="child mt-4"/> }
                </Form>
                
                <Button onClick={() => setShowFg(true)} variant="outline-secondary">Forget Password</Button> 
                <Button href="/auth/register/lecturer" className="my-3 d-block p-0 m-0   " variant="link">Dont have Account</Button>
        </Container>
    </section>
    </>
    )
}

export { LoginLecturer }
