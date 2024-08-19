import { useContext, useEffect, useState } from "react";
import { Button, Container, FloatingLabel, Form, InputGroup, Spinner } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import  {VerificationContext}  from "../context/verificationContext.jsx";
import { postToBackend } from "../utils/backendCalls.js";
import { backend } from "../utils/config.js";
import { AlertToast } from "./alertTracker.jsx";
import { VerificationEntry } from "./verificationNumber.jsx";


const getPrograms = async (api, setDe, setError,showError) => {
    try {
    let result = await fetch(api)
    if(result.status === 200){
        let pro = await result.json()
        await setDe(pro)
    }
    } catch(err) {
      setError("couldnt load programs")
      showError(true)
    }
  }
const RegisterStudentForm = () => {
    const [validate, setValidate] = useState(false)
    const [registrationDetails, setDetails] = useState({"name":"", "email":"", "password":"", 
                "cpassword":"", "studentId": "", "index": "", "ProgramId": "","username": "", "ClassId": ""})
    const [programs, setPrograms] = useState([])
    const [classes, setClasses] = useState([])
    
    const[startSubmitSpinner, setSubmitSpinner] = useState(false) 
    //error messages
    const [errorMessage, setErroMessage] = useState("")
    const [showError, setShowError] = useState(false)
    
    //show spinner
    const [showClassSpiner, setClassSpiner] = useState(true)
    
    //disable class button
    const [disableClassFrom, setDisableclassForm] = useState(true)
    
    //show password
    const [showPassword, setShowPassword] = useState(false)
    const [cshowPassword, csetShowPassword] = useState(false)
    //get vid
    const {setVid, setShow}  = useContext(VerificationContext)
    
    useEffect(() => {
        let url = `${backend.url}/api/programs`
        getPrograms(url, setPrograms, setErroMessage, setShowError)
    }, [])
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
            setErroMessage("Passwords dont match")
            setShowError(true) 
        } else if(!(registrationDetails.ProgramId || registrationDetails.ClassId)) {
            setErroMessage("Please ensure you have selected program and class")
            setShowError(true) 
        } 
        else {
            let response = await postToBackend("/api/auth/register/student", registrationDetails)

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

        <Container className="shadow-lg p-md-5 col-lg-5">
        <Form onSubmit={handleSubmit} noValidate validated={validate} className="p-3 my-0 parent shadow-lg">
        <h1 className="mb-4 text-center  my-0 py-2  banner">Student SignUp</h1>
        <AlertToast toggleShow={togleError} show={showError} text={errorMessage} />
            <FloatingLabel  id="name" label="Name" className="mb-3">
                <Form.Control size="md"onChange={(val) => {setReqDetail("name", val)}} value={registrationDetails.name} type="text" required placeholder="Name"/>
            </FloatingLabel>
            <FloatingLabel id="email" onChange={(val) => {setReqDetail("email", val)}} value={registrationDetails.email} label="Email Address" className="mb-3">
                <Form.Control required size="md" type="email" placeholder="someon@somewhere.com"/>
            </FloatingLabel>
            <FloatingLabel id="sid" onChange={(val) => {setReqDetail("studentId", val)}} value={registrationDetails.studentId} label="Student Id" className="mb-3">
                <Form.Control size="md" type="text" required placeholder="Student Id"/>
            </FloatingLabel>
            <FloatingLabel  id="index" onChange={(val) => {setReqDetail("index", val)}} value={registrationDetails.index} label="Index Number" className="mb-3">
                <Form.Control type="text" size="md" required placeholder="Index Number"/>
            </FloatingLabel>
            <InputGroup>
            <Form.Select isValid={registrationDetails.ProgramId} className="mb-3 me-2 " aria-label="select programe" required size="md"
             onChange={async(val) => {
                //start class spiner
                setClassSpiner(true)
                setReqDetail("ProgramId", val);
                let url ="/api/program/classes"
                let response = await postToBackend(url, {"programId": registrationDetails.ProgramId})
                if (response.status === 200) {
                  //stop spiner
                  setClassSpiner(false)
                  let data = await response.data
                  if(data.length === 0) {
                    setErroMessage("no class enabled for this course")
                    setShowError(true)
                  } else {
                    setClasses(data)
                    setDisableclassForm(false)
                  }
                } else {
                    setErroMessage("couldnt load clases, check you internet connection")
                    setShowError(true)
                }
                setClassSpiner(true)
             }
                 
            }>
                <option disabled selected hidden>Select Program</option>
                {programs.map((pro) => {
                    return (
                        <option key={pro.id} value={pro.id}>{pro.programName}</option>
                    )
                })}
            </Form.Select>
            <Form.Select isValid={registrationDetails.ClassId} onChange={(val) => setReqDetail("ClassId", val)} disabled={disableClassFrom} className="mb-3 parent" aria-label="select programe" required size="md">
                <option disabled selected hidden>Select Class</option>
                { classes.map((clas) => <option key={clas.id} value={clas.id}>{clas.className}</option>)}
            </Form.Select>
            {!showClassSpiner && <Spinner variant="primary" className="childInput"/>}
            </InputGroup>

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
            <Button href="/auth/login/student" className="d-block" style={{width:200}} variant="outline-primary">Already have account?</Button>
        </Form>
        </Container>
        </>
    )
}

export { RegisterStudentForm };
