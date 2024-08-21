import { useContext, useState } from "react"
import { Button, Col, Container, Form, Image, Row, Spinner, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import student from "../assets/student.jpg"
import { AlertToast } from "../components/alertTracker"
import { Footer } from "../components/footer"
import { FgPwdModal } from "../components/forgetPassworModal"
import { GeneralNavbar } from "../components/headerLanding"
import { VerificationContext } from "../context/verificationContext.jsx"
import { postToBackend } from "../utils/backendCalls"
import { token } from "../utils/config"
import { saveToken } from "../utils/localstorage"

const LoginStudent = () => {
    const redirect = useNavigate()
    const [loginDetails, setLoginDetails] = useState({"studentId":"","password":"" })

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
        let result = await postToBackend("/api/auth/login/student", loginDetails)
        if(result.status !== 200)
            {
                setErrorMessage(result.data.reason)
                setError(true)
            } else {
                saveToken(token.studentTokenKey, result.data.token)
                saveToken(token.studentRefresh, result.data.refresh_token)
                redirect("/student/dashboard")
            }
        setSpinner(false)
    }
    return (
        <>
        <FgPwdModal url="/auth/login/student" user="STUDENT" />
        <GeneralNavbar  />
        <section className="login py-5 px-2">
        <Container className="h-100 text-white">
            <Row className="h-100">
                <Col md={6} className="my-2 p-2">
                    <Stack className="h-100 justify-content-md-center">
                    <h2 className="banner display-1 text-white">Welcome<br />
                    Back.....
                    </h2>
                    </Stack>
                    
                </Col>
                <Col md={6} className="h-100 bg-blue">
                <Stack className="h-100 text-white justify-content-md-center align-items-md-center">
                <div className="w-100 text-start my-2">
                <h2 className="banner">Student Login</h2>
                </div>
                <div className="w-100">
                <Row>

                <Col md={8} lg={8}>
               {/** <Image  width={300} src={student} rounded />  */}

                <Form onSubmit={handleSubmit} className="text-start border-2 parent bg-transparent shadow-lg text-white">
                <AlertToast show={showError} text={errorMessage} toggleShow={() => setError(false)} />

                    <Form.Label id="em" className="heading" >Student Id</Form.Label>
                    <Form.Control required onChange={(val) => setLoginValue("studentId", val)} value={loginDetails.studentId} id="em" size="lg" className="w-100 text-white bg-transparent" type="text" />
                    <Form.Label id="em" className="heading" >Password </Form.Label>
                    <Form.Control required onChange={(val) => setLoginValue("password", val)} value={loginDetails.password} id="em" size="lg" className="w-100 text-white bg-transparent" type="text" />
                    <Button disabled={showSpinner} className="parent my-3 w-100" type="submit">Login</Button>
                    {showSpinner && <Spinner className="child mt-4"/> }
                </Form>
                </Col>
                </Row>
                <Button onClick={() => setShowFg(true)} variant="outline-secondary">Forget Password</Button> 
                <Button  className="my-3 d-block p-0 m-0 text-white" variant="link">Dont have Account</Button>
                </div>
                </Stack>
                
                </Col>
            </Row>
        </Container>
    </section>
    <Footer />
    </>
    )
}

export { LoginStudent }
