import { Button, Form, Modal, Spinner } from "react-bootstrap";

import { useEffect, useState } from "react";
import { getFromBackend, postToBackend } from "../../utils/backendCalls";
import { token } from "../../utils/config";
import { getToken } from "../../utils/localstorage";
import { CongratsQuestion } from "../task/addTaskCongrats";
import "../verfyemail.css";



const AddClass = ({show, onHide, assId}) => {
    const [programs, setPrograms] = useState([])
    const [assClass, SetClass] = useState([])
    const [loadingClass, setLoadingClass] = useState(false)
    const [disButton, setDisButton] = useState(true)
    const [disable, setDisable] = useState(false)
    const [uploadassignmentClass, setupLoadAssClass] = useState({"AssignmentId": assId})
    const [loadingButton, setLoading] = useState(false)
    const [congrats, showCongrats] = useState(false)
    useEffect((val) => {
        const loadClass = async () => {
            let programs = await getFromBackend("/api/programs")
            setPrograms(programs.data)
        }
        loadClass()

    })
    return (
        <>
        <CongratsQuestion text={"Class Added"} show={congrats} onHide={() => showCongrats(false)} />
        <Modal centered   show={show} onHide={onHide} backdrop="static">
        <Modal.Header closeButton >
            <h6>Add Class</h6>
        </Modal.Header>
        <Modal.Body  className="d-flex flex-column align-items-center justify-content-center">
            <Form 
            
            onSubmit={async (val) => {
                val.preventDefault()
                let url = "/coder/lecturer/assignment/add/class"
                setLoading(true)
                let response = await postToBackend(url, uploadassignmentClass, getToken(token.lecturerTokenKey))
                if (response.status === 200) {
                    showCongrats(true)
                    onHide()
                } 
                setLoading(false)
            }}
            className="w-100">
                <Form.Label>Select Program</Form.Label>
                <Form.Select  onChange={async (val) => {
                val.preventDefault()
                //set program id
                //set loadingClass to false
                setLoadingClass(true)
                //set startSpiner to true
                //get classes for the program
                let url ="/api/program/classes"
                let response = await postToBackend(url, {programId: val.target.value})
                console.log(val.target.value)
                if(response.status === 200) {
                    setLoadingClass(false)
                    setDisable(false)
                    SetClass(response.data)
                } else {
                    setInfoMessage(response.data.reason)
                    showInfo(true)
                }
                setLoadingClass(false)

            }}  aria-label="Default select example">
                    <option hidden selected>Select Program</option>

                    {programs.map(val => {
                        return  <option value={val.id}>{val.programName}</option>
                    })}
                    </Form.Select>

                <Form.Label className="mt-2">Select Class</Form.Label >
                <Form.Select onChange={(val => {
                        if(val.target.value) {
                            setupLoadAssClass({...uploadassignmentClass, ClassId:val.target.value})
                            setDisButton(false)
                        }
                })} disabled={disable} aria-label="Default select example">
                    <option hidden selected>{!loadingClass ? "Select Class" : <Spinner />}</option>
                    {assClass.map(val => {
                        return  <option value={val.id}>{val.className}</option>
                    })}
                    </Form.Select>
                <Button disabled={disButton} className="my-3" type={"submit"}>{loadingButton ? <Spinner /> : "Submit"}</Button>
            </Form>
        </Modal.Body>
        </Modal>
        </>
    )
}

export { AddClass };

