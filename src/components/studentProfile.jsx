import { Avatar } from "@files-ui/react";
import { useContext, useState } from "react";
import { Button, FloatingLabel, Form, Modal, Spinner, Stack } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import { StudentContext } from "../context/studentContext";
import { postToBackend } from "../utils/backendCalls";
import { convertBase64, token } from "../utils/config";
import { getToken } from "../utils/localstorage";
import { AlertToast } from "./alertTracker";
import { Loading } from "./loading";



const StudentProfile = ({show, close}) => {
    let {student, setStudent} = useContext(StudentContext)
    let [disableButton, setdisButton] = useState(true)
    let [spinner, setSpinner] = useState(false)
    let [info, setInfo]  = useState("")
    let [loadSet, setLoading] = useState(false)
    let [showToast, setShowToast] = useState(false)

    const [uploadData, setUploadData] = useState({"name":"", "profilePic":"", "githubUserName":"", "fileName":""})
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setSpinner(true)
        let updateUrl = "/user/student/update"
        let response = await postToBackend(updateUrl, uploadData, getToken(token.studentTokenKey))
        if(response.status !== 200) {
            setInfo(response.data.reason)
            setShowToast(true)
        } else {
            setInfo("information updated")
            setShowToast(true)
            setdisButton(true)
        }
        setSpinner(false)
        setLoading(false)
        
    }
    const hideToast = () => {setShowToast(false)}
    return(
        <>
        
        <Modal show={show} className="h-100 w-100" onHide={close}>
        <AlertToast className="my-2" show={showToast} text={info} toggleShow={hideToast} />
            {loadSet ? <div className="vh-100"><Loading /> </div>: <>
                <Stack direction="horizontal" className="p-2 w-100 justify-content-end">
                        <Button onClick={close} variant="secondary"><CgClose /></Button>
            </Stack>
        <Form onSubmit={handleSubmit} className="my-2 w-100">
            <Stack className = "justify-content-center align-items-center">
                <div style={{borderRadius:"50%" ,width:"150px", height:"150px"}} className="shadow-lg">
                    <Avatar onChange={ async (val) => {
                        if(val.size <= 1024 * 1024 * 3) {
                        let result = await convertBase64(val)
                        setStudent({...student,'profilePic':result})
                        setUploadData({...uploadData, profilePic:result, fileName:val.name})
                        setdisButton(false)
                        }else
                            alert('size too big, max size should be less than 3mb')
                    }}
                    emptyLabel="upload pic   max size 3mb"
                    src={student.profilePic} 
                    variant="circle" 
                    style={{width:"150px", height:"150px"}}
                    accept="image/*"
                    changeLabel="Change Pic"
                    />
                </div>
                <Modal.Body className="w-100">
                    <FloatingLabel label="Name*" size={"sm"} className="w-100 mb-2">
                        <Form.Control value={student.name} size="sm"
                        onChange={(val) => {
                            setStudent({...student, name:val.target.value});
                            setUploadData({...uploadData, name:val.target.value})
                            setdisButton(false)
                        }
                            
                        }
                         type="text" placeholder=" " />
                    </FloatingLabel>
                    <FloatingLabel label="Email" size={"sm"} className="mb-2 w-100">
                        <Form.Control
                        value={student.email}
                        size="sm" readOnly type="text" placeholder=" " />
                    </FloatingLabel>
                    <FloatingLabel className="w-100 mb-2" label="Program" size={"sm"}>
                        <Form.Control value={student.program} size="sm" readOnly type="text" placeholder=" " />
                    </FloatingLabel>
                    <FloatingLabel className="w-100 mb-2" label="Year" size={"sm"}>
                        <Form.Control value={student.class} readOnly size="sm" type="text" placeholder=" " />
                    </FloatingLabel>
                    <FloatingLabel className="w-100 mb-2" label="Student Id" size={"sm"}>
                        <Form.Control  value={student.studentId} readOnly size="sm" type="text" placeholder=" " />
                    </FloatingLabel>
                    <FloatingLabel className="w-100 mb-2" label="Index Number" size={"sm"}>
                        <Form.Control value={student.index} readOnly size="sm" type="text" placeholder=" " />
                    </FloatingLabel>

                    <FloatingLabel className="mb-2 w-100" label="Github UserName*" size={"sm"}>
                        <Form.Control 
                        onChange={(val) => {
                            setStudent({...student, githubUserName:val.target.value})
                            setUploadData({...uploadData, githubUserName:val.target.value})
                            setdisButton(false)

                         }
                        }
                        value={student.githubUserName} size="sm" type="text" placeholder=" " />
                    </FloatingLabel>
                    <div className="mx-auto">
                    <Button type="submit" disabled={!spinner && disableButton} className="w-50 parent" size="lg" variant="dark">Update</Button>
                    {spinner && <Spinner style={{left:"23%"}} variant="light" className="p-1 child" /> }
                    </div>
                    </Modal.Body>
            </Stack>
        </Form>
                </>}
        </Modal>
        </>
    )
}

export { StudentProfile };
