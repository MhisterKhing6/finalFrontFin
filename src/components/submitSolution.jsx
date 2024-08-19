import { Button, Modal, Stack } from "react-bootstrap"

const SubmitSolution = ({show, handleClose, solunFiles, handleSubmit}) => {


    return (
        <Modal className="p-2" centered show={show}>
                <Stack className="p-1 w-100 justify-content-between" direction="horizontal">
                <Button onClick={
                    async () => {
                        handleSubmit()
                        handleClose()
                        
                    }
                } className="d-inline w-25 m-1">Submit</Button>
                <Button onClick={
                    () => {
                        handleClose()
                    }
                } variant="dark" className="d-inline w-25 m-1">Close</Button>
                </Stack>
                <div className="p-5">
                <h5 className="">Uploaded Files for submission</h5>
                {
                solunFiles.length === 0 ? "No solution files uploaded" :
                (<ul>
                    {solunFiles.map((file,index) => {
                       return (<li key={index}>{file.fileName}</li>)
                    })} 
                </ul>)
                }
                </div>
        </Modal>
    )
}
export { SubmitSolution }
