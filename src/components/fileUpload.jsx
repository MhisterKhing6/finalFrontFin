import { Dropzone, FileCard } from "@files-ui/react"
import { Button, Modal } from "react-bootstrap"
import { convertText } from "../utils/encodingFunctions"
const SolutionUpload = ({extension,files, setFiles, show,handleClose, solunFiles, setSolunFiles}) => {

    return (
        <Modal centered show={show} className="p-2">
                <Button onClick={handleClose} className="d-inline w-25 m-1">Done</Button>
                
            
            <Dropzone
            label="Click to upload solution files"
            accept={`${extension},.h`}
            onChange={async (val) => {
                //handle situation where all files are cleared
                if(val.length === 0) {
                    setFiles([])
                    setSolunFiles([])
                }
                let found = false
                for(let i = 0; i < val.length; i++) {
                    for(let j = 0; (j < files.length && !found); j++ ){
                        if(val[i].name === files[j].name){
                            found = true
                        }
                    }
                    if(!found) {
                        setFiles([...files, val[i]])
                        let encodedFile = await convertText(val[i].file)
                        setSolunFiles([...solunFiles, {fileName:val[i].name, code:encodedFile}])
                    }
                    found = false
                }
            }}
            value={files}
            >
                {
                    files.map(val => {
                        return (<FileCard key={val.id} {...val} 
                        onDelete={(deleteId)=> {
                            let deletedFileName = null
                            //delet ui version file
                            let filterFiles = files.filter(file => {
                                 if(file.id != deleteId )
                                    {
                                        return true
                                    } else {
                                        deletedFileName = file.name
                                        return false
                                    }
                                } )
                            setFiles(filterFiles)
                            //delete encoded version
                            let filterCode = solunFiles.filter(code => {
                                return deletedFileName != code.fileName
                            })
                            setSolunFiles(filterCode)
                        }}
                        /> )
                    })
                }
            </Dropzone>
        </Modal>
    )
}
export { SolutionUpload }
