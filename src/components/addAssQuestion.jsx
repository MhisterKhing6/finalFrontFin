import { Dropzone, FileCard } from '@files-ui/react'
import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { postToBackend } from '../utils/backendCalls'
import { token } from '../utils/config'
import { convertText } from '../utils/encodingFunctions'
import { getToken } from '../utils/localstorage'
import { AlertToast } from './alertTracker'
import { LecturerEditor } from './lecturerEditor/LecturerEditor'
const AddAssQuestion = ({compiler , assId, show, onHide, addQuestion, newQuestion}) => {
    const [uploadQuestion, setUploadQuestion] = useState({})
    const [fileD, setFileD] = useState(false)
    const [editorD, setEditorD] = useState(true)
    const [testScript, setTestScript] = useState()
    const [explanationExamples, setExplanationExamples] = useState()
    const [solutionScript, setSolutionScript] = useState([])
    const [solun, setSolun] = useState([])
    const [examples, setExamples] = useState([])
    
    const [fileS, setFileS] = useState(false)
    const [editorS, setEditorS] = useState(true)
    //
    const [showInfo, setShowInfo] = useState(false)
    const [infoMessage, setInfoMessage] = useState("")


    const handleSubmit = async (val)=> {
        val.preventDefault()
        uploadQuestion.solutionScript =  testScript === compiler.testExamples ? "" : testScript
        uploadQuestion.examples = explanationExamples === compiler.explanationExamples ? "" : explanationExamples
        console.log(uploadQuestion)
                    if(!uploadQuestion.requirement) {
                        setInfoMessage("please provide details to requirement")
                        setShowInfo(true)
                    }
                    //check for solution text script
                    if(!uploadQuestion.solutionScript) {
                        setInfoMessage("please provide solution test script by loading a file")
                        setShowInfo(true)
                    }else {
                        let assObject = {ext:compiler.extension.replaceAll(".","").split(",")[0] ,...uploadQuestion, AssignmentId:assId }
                        //submit to backend
                        let url = "/coder/lecturer/assignment/task"
                        let dataB = await postToBackend(url, assObject, getToken(token.lecturerTokenKey))
                        console.log(dataB)
                        if(dataB.status !== 201) {
                        setInfoMessage(dataB.data.reason)
                        setShowInfo(true)
                        }
                        else {
                            setUploadQuestion({})
                            setShowInfo(false)
                            setExplanationExamples("")
                            setTestScript("")
                            onHide()
                            newQuestion(true)
                            addQuestion()
                        }
                    }
    }
    return (
        
        <Modal size='lg' show={show} backdrop='static' onHide={onHide} className=' p-2'>
            <Modal.Header closeButton >
                <h4>Add Question</h4>
           </Modal.Header>
            <Form onSubmit={handleSubmit} className='p-4'>
                <AlertToast show={showInfo} text={infoMessage} toggleShow={()=> setShowInfo(false)} />
                <Form.Label>
                    Question Number*
                </Form.Label>
                <Form.Control
                value={uploadQuestion.number}
                onChange={(val) => {setUploadQuestion({...uploadQuestion, number:val.target.value})}}
                className='mb-2' required type="number" />
                <Form.Label>
                    General Requirement*
                </Form.Label>
                <Form.Control
                onChange={(val)=> setUploadQuestion({...uploadQuestion, requirement:val.target.value})}
                value={uploadQuestion.requirement}
                required className='mb-2' as="textarea" rows={6} />
                
                    <Form.Label className='mt-2'>Test Script*</Form.Label>
                    <div className='mx-2 mb-2'>
                    
                    <Form.Check
                    label="File Upload"
                    style={{fontSize: "1.2rem"}}
                    type='switch'
                    inline
                    className='mx-4'
                    onClick={(val) => { 
                        setFileS(!fileS)
                        setEditorS(false)
                        newQuestion(true)
                    }}
                    checked={fileS}
                    name="subMode"/>

                    <Form.Check
                    label="Editor"
                    style={{fontSize: "1.2rem"}}
                    type='switch'
                    inline
                    className='mx-4'
                    onClick={(val) => { 
                        setEditorS(!editorS)
                        setFileS(false)
                    }
                    }
                    checked={editorS}
                    name="subMode"/>
                </div>
                {fileS && <Dropzone max={1} label='Upload Solution File'
                    accept={compiler.extension}
                    onChange={async (val) => {
                        if(val.length === 0) {
                            setSolutionScript([])
                            setTestScript("")
                        }else{
                        setSolutionScript(val)
                        let test = await convertText(val[0].file)
                        setTestScript(test)
                        
                        }

                    }}
                    value={solutionScript}
                    >
                      { solutionScript.map(val => <FileCard key={val.id} {...val}  />) }
                       
                         
                    </Dropzone> }
                  {editorS &&  <LecturerEditor name={compiler.name} exampleCode={compiler.testExamples} code={testScript} setCode={setTestScript} /> }
                  <Form.Label>Explanation Examples*</Form.Label>
                <div className='mx-2 mb-2'>
                    
                        <Form.Check
                        label="File Upload"
                        style={{fontSize: "1.2rem"}}
                        inline
                        type="switch"
                        className='mx-4'
                        onClick={(val) => { 
                            setFileD(!fileD)
                            setEditorD(false)
                        }}
                        checked={fileD}
                        name="subMode"/>

                        <Form.Check
                        label="Editor"
                        type="switch"
                        style={{fontSize: "1.2rem"}}
                        inline
                        className='mx-4'
                        onClick={(val) => { 
                            setEditorD(!editorD)
                            setFileD(false)
                        }
                        }
                        checked={editorD}
                        name="subMode"/>
                    </div>
                   {editorD && <LecturerEditor name={compiler.name} exampleCode={compiler.explanationExamples} code={explanationExamples} setCode={setExplanationExamples} /> }
                    {fileD && <Dropzone max={1} 
                    label='Upload Explanation Examples'
                    accept={compiler.extension}
                    onChange={async (val) => {
                        if(val.length === 0) {
                            setExamples([])
                            setExplanationExamples("")
                        }else{
                        setExamples(val)
                        let test = await convertText(val[0].file)
                        setExplanationExamples(test)
                        }

                    }}
                    value={examples}
                    >
                      { examples.map(val => <FileCard key={val.id} {...val}  />) }
                       
                         
                    </Dropzone> }
                  <Form.Label className='mt-2'>Total Marks*</Form.Label>
                <Form.Control
                type='number'
                value={uploadQuestion.totalMarks}
                required
                placeholder='total marks for assignment'
                onChange={val => {
                    setUploadQuestion({...uploadQuestion, totalMarks:val.target.value})
                }}
                />

                <Form.Label className='mt-2'>Solution Files Name*</Form.Label>
                <Form.Control
                value={uploadQuestion.solutionPath}
                placeholder='the name of student solution file eg, question1.java'
                required
                onChange={val => {
                    setUploadQuestion({...uploadQuestion, solutionPath:val.target.value})
                }}
                as='textarea' />
                <Form.Control.Feedback>Use new line for multiple files</Form.Control.Feedback>
            <Button className='w-100 my-2' type="submit">Submit</Button>
            </Form>
            
        </Modal>
    )
}

export { AddAssQuestion }
