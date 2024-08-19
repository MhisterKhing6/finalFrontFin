import { useContext, useState } from "react";
import { Button, Container, FloatingLabel, Form, InputGroup, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import  {VerificationContext} from "../context/verificationContext.jsx";
import { postToBackend } from "../utils/backendCalls.js";
import { AlertToast } from "./alertTracker.jsx";
import { VerificationEntry } from "./verificationNumber.jsx";



const LecturerRegistrationForm = () => {
    const [validate, setValidate] = useState(false)
    const [registrationDetails, setDetails] = useState({"name":"", "email":"", "password":"", 
                "cpassword":"", "lecturerId": "", "username": ""})
    
    const[startSubmitSpinner, setSubmitSpinner] = useState(false) 
    //error messages
    const [errorMessage, setErroMessage] = useState("")
    const [showError, setShowError] = useState(false)
    
    
    //show password
    const [showPassword, setShowPassword] = useState(false)
    const [cshowPassword, csetShowPassword] = useState(false)
    //get vid
    const {setVid, setShow}  = useContext(VerificationContext)
    
    
    //seting registration detail
    const setReqDetail = (name, value) => {
            registrationDetails[name] = value.target.value
            setDetails({...registrationDetails})
    }
    //togling error 
    const togleError = () => setShowError(!showError)

    const handleSubmit = async (e) => {
    const form = e.currentTarget;
    setSubmitSpinner(true)
    e.preventDefault()
    if (form.checkValidity()) {
        if (registrationDetails.password !== registrationDetails.cpassword) {
            //allert with bad message
            setErroMessage("Passwords don't match")
            setShowError(true) 
        } 
        else {
            let response = await postToBackend("/api/auth/register/lecturer", registrationDetails)

            if (response.status !== 201) {
                setErroMessage(response.data.reason)
                setShowError(true)
              } else {
                setVid(response.data.verificationId)
                setShow(true)
            }
        }

    }
    else {
        e.preventDefault();
        setValidate(true)
    }
    setSubmitSpinner(false)
    }
    return (
        <>
        <VerificationEntry email={registrationDetails.email}/>

        <Container className="shadow-lg p-md-5 col-md-10 col-lg-5">
        <Form onSubmit={handleSubmit} noValidate validated={validate} className="p-3 my-0 parent shadow-lg">
        <h1 className="mb-4 text-center  my-0 py-2  banner">Lecturer SignUp</h1>
        <AlertToast toggleShow={togleError} show={showError} text={errorMessage} />
            <FloatingLabel  id="name" label="Name" className="mb-3">
                <Form.Control size="md" onChange={(val) => {setReqDetail("name", val)}} value={registrationDetails.name} type="text" required placeholder="Name"/>
            </FloatingLabel>
            <FloatingLabel id="email"  label="Email Address" className="mb-3">
                <Form.Control onChange={(val) => {setReqDetail("email", val)}} value={registrationDetails.email} required size="md" type="email" placeholder="someon@somewhere.com"/>
            </FloatingLabel>
            <FloatingLabel id="sid"  label="Lecturer Id" className="mb-3">
                <Form.Control onChange={(val) => {setReqDetail("lecturerId", val)}} value={registrationDetails.lecturerId} size="md" type="text" required placeholder="Student Id"/>
            </FloatingLabel>
        
            <Form.Label id="pssword" label="Confirm Password" className="mb-3">
                Password
            </Form.Label>
            <InputGroup size="md" className="mb-2">
                <Form.Control value={registrationDetails.password} onChange={val => setReqDetail("password", val)}  type={!showPassword ? "password" : "text"} placeholder="Enter Password"/>
                <InputGroup.Text onClick={(val) => setShowPassword(!showPassword)}>{!showPassword ? <FaEye /> : <FaEyeSlash />}</InputGroup.Text>
            </InputGroup>

            <Form.Label id="cpssword" label="Confirm Password" className="mb-3">
              Confirm  Password
            </Form.Label>
            <InputGroup size="md" className="mb-5">
                <Form.Control value={registrationDetails.cpassword} 
                onChange={val => { setReqDetail("cpassword", val)
                    if(registrationDetails.password !== val.target.value) {
                        val.target.style.color = "red"
                      } else {
                        val.target.style.color = "black"
                        setReqDetail("cpassword", val.target.value);
                      }
                }} id="cpassword" type={!cshowPassword ? "password" : "text"} placeholder="Confirm Password"/>
                <InputGroup.Text onClick={(val) => csetShowPassword(!cshowPassword)}>{!cshowPassword ? <FaEye /> : <FaEyeSlash />}</InputGroup.Text>
            </InputGroup>
            
            <Button disabled={startSubmitSpinner} className="parent p-3 mb-3 shadow-lg" style={{width:"100%"}}  type="submit">Submit</Button>
            {startSubmitSpinner && <Spinner className=" child" variant="primary" />}
            <Button href="/auth/login/lecturer" className="d-block" style={{width:200}} variant="outline-primary">Already have account?</Button>
        </Form>
        </Container>
        </>
    )
}

export { LecturerRegistrationForm };
