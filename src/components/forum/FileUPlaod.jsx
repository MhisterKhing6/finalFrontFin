import { Dropzone, FileMosaic } from "@files-ui/react";
import { useState } from "react";
import { convertBase64 } from "../../utils/config";

const UploadFileChat = ({hideFile,type,files,setFiles, base64, setBase64}) => {
    return (
    <Dropzone
    minHeight="100px"
    minLength={"100%"}
    value={files}
    accept={type}
    maxFiles={8}
    maxFileSize={50 * 1024*1024}
    
    onChange={async (val) => {
            //handle situation where all files are cleared
                if (val.length === 0) {
                    setFiles([])
                    setBase64([])
                    hideFile()
                    return
                }
                let found = false
                for(let i = 0; i < val.length; i++) {
                    for(let j = 0; (j < files.length && !found); j++ ){
                        if(val[i].name === files[j].name){
                            found = true
                        }
                    }
                    if(!found) {
                        if(val[i].size > 50 * 1024 * 1024)
                            continue
                        setFiles([...files, val[i]])
                       let encodedFile = await convertBase64(val[i].file)
                        setBase64([...base64, {size:Math.round(((val[i].size / (1024 * 1024))*100) ) / 100, type, st:true, fileName:val[i].name, fileUrl:encodedFile}])
                    }
                    found = false
                }
            }}
        >       {files.map(file => {
                   return (
                    <FileMosaic
                    {...file}
                    key={file.id}
                    resultOnTooltip
                    preview
                    info
                    onDelete={(deleteId)=> {
                        let deletedFileName = null
                        //delete ui version file
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
                       let filterCode = base64.filter(code => {
                            return deletedFileName != code.fileName
                        }) 
                        setBase64(filterCode) 
                    }}
                    />

                   )
                    })}
                
            
    </Dropzone>
)

}

export { UploadFileChat };
