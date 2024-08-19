import { useState } from "react";
import { Button, Col, Form, Modal, Stack } from "react-bootstrap";
import { BiRename } from "react-icons/bi";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdNewLabel, MdSave } from "react-icons/md";
import Ide from 'react-monaco-editor';
import { AlertToast } from "./alertTracker";
import { PopOverRename, PopOverSave } from "./popOver";


   
    
    const Editor = ({onHide, show, solunFiles, setSolunFiles}) => {
        const [code, setCoding] = useState("")
        const [showSave, setShowSave] = useState(false)
        const [fileName, setFileName] = useState("")
        const [rename, showRename] = useState("")
        const [theme, setTheme] = useState(false)
        const [infoMessage, setInfoMessage] = useState("")
        const [showInfo, setShowInfo] = useState(false)

        const saveNewFile = (fileName) => {
            //set file name
            setFileName(fileName)
            //check if a file with the same file name just replace code
            let found = false
            let newSolun = solunFiles.map(file => {
                if(file.fileName === fileName)
                    file.code = code
                return file
            })
            //check file does not exist make entry
            if(!found)
                newSolun.push({fileName, code })


            setSolunFiles(newSolun)

        }
        const renameFile = (NewfileName) => {
            let updatedSolun = solunFiles.map(file => {
                if(file.fileName === fileName)
                    {
                        file.fileName = NewfileName
                        setFileName(NewfileName)
                    }
                    return file
            })
            setSolunFiles(updatedSolun)
        }

        const deleteFile = () => {
            let updatedSolun = solunFiles.filter(file => {
                return file.fileName != fileName
            })
            //clear code
            setSolunFiles(updatedSolun)
            setFileName("")
            setCoding("")
        
        }
        const options = {
          autoIndent: 'full',
          contextmenu: true,
          fontFamily: 'monospace',
          fontSize: 20,
          lineHeight: 24,
          hideCursorInOverviewRuler: true,
          matchBrackets: 'always',
          minimap: {
            enabled: true,
          },
          scrollbar: {
            horizontalSliderSize: 4,
            verticalSliderSize: 18,
          },
          selectOnLineNumbers: true,
          roundedSelection: false,
          cursorStyle: 'line',
          automaticLayout: true,
        }; 
         return ( 
            <>
            <Modal backdrop="static"  onHide={onHide} size="lg" show={show}>
            <AlertToast show={showInfo} text={infoMessage} toggleShow={(val) => {setShowInfo(false)}} />
            <Modal.Header  closeButton className="bg-body-secondary text-white" style={{minHeight:"10vh"}}>
            <Stack  direction="horizontal" className="w-100 justify-content-around">
            
             <Button disabled={!code}  onClick ={
                () => { 
                    //if no file name show file save modal
                    if(!fileName)
                        setShowSave(true) 
                    //else update code
                    else {
                    let solunT = solunFiles.map((fileObject => {
                        if(fileObject.fileName === fileName) {
                            fileObject.code = code
                        }
                        return fileObject
                    }))
                    setSolunFiles(solunT)
                    setInfoMessage("Saved")
                    setShowInfo(true)
                }
                }
                    } variant="outline-dark" style={{width:"20%"}}>
                <MdSave /> <span className="mx-2 navDes">Save</span>
             </Button>
             <PopOverSave handleClick={saveNewFile} show={showSave} onHide={()=> setShowSave(false)} />
            <Button onClick ={(val) => {
                setShowSave(true)
            }} variant="outline-dark" style={{width:"20%"}}><MdNewLabel /><span className="mx-2 navDes">New</span></Button>
            <Button onClick={() => setTheme(!theme)} variant="outline-dark" className="p-1" style={{width:"20%"}}><IoMdEye /><span className="mx-2 navDes">Theme</span></Button>
            
            <Button onClick={()=> setCoding("")} primary="outline-dark" style={{width:"20%"}} className="bg-dark">Clear</Button>
            </Stack>
            </Modal.Header>
            <Modal.Body className="p-0 m-0 ">
                
                <Stack className="p-2 flex-wrap bg-body-secondary" direction="horizontal" style={{minHeight:"5vh"}}>
                      <Stack direction="horizontal" className="w-100">
                        <Form.Select style={{width:"50%"}} onChange={(file) => {
                            if(file.target.value ){
                                //set File name
                                setFileName(file.target.value)
                                //update code
                                for(const entry of solunFiles){
                                        if(entry.fileName === file.target.value)
                                            {
                                                setCoding(entry.code)
                                                break;
                                     }
                                }
                            } 
                        } }>
                            <option>{fileName || "Select File To Edit"}</option>
                            {
                                solunFiles.map((file) => {
                                    return <option key={file.fileName} value={file.fileName}>{file.fileName}</option>
                                } )
                            }
                            </Form.Select>
                            {fileName && <>
                            <Button  onClick= {() => showRename(true)} variant="outline-dark" style={{width:"20%"}} className="mx-2 p-2"><span className="navDes mx-2">Rename</span><BiRename /></Button>
                            <PopOverRename show={rename} handleClick={renameFile} onHide={() => showRename(false)} />
                            <Button onClick={deleteFile} variant="outline-danger" style={{width:"20%"}} className="mx-2 p-2"><MdDelete /></Button>
                            </>
                            }
                        </Stack>
                    
                </Stack>
                <Col className="mb-3" xs={12}>
                        <Ide
                    height={"70vh"}
                    value={code}
                    onChange={(val) => {setCoding(val)}}
                    language={"python"}
                    options={options}
                    theme={theme ? "vs-dark" : 'hc-light'}
                    
                    />
                </Col>
            </Modal.Body>
            <Modal.Footer className="bg-body-secondary" style={{minHeight:"20vh"}}>
            
            </Modal.Footer>
          </Modal>
          </>
          )
      }
      
      export { Editor };
      
