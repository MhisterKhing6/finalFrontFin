import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { HiOutlineLogin } from "react-icons/hi";

const PopOverLogin = ({content}) => {
    return (
        <div className="container p-5">
            <table className="table">
                <tr>
                    <a href="/auth/login/student">
                    <div className="container">
                        <div className="row">
                            <div className="col-2 px-2">
                            <HiOutlineLogin className="my-2" size={"35"} />
                            </div>
                            <div className="col-10">
                            <p className="my-0"><span className="roboto-slab text-primary popHead" >Login Student </span><br/> Login as a Student</p>
                            </div>
                        </div>
                    </div>
                    </a>
                </tr>
                <tr>
                    <a href="/auth/login/lecturer">
                    <div className="container">
                        <div className="row">
                            <div className="col-2 px-2">
                            <HiOutlineLogin className="my-2" size={"35"} />
                            </div>
                            <div className="col-10">
                            <p className="my-0"><span className="roboto-slab text-primary popHead" >Login Lecturer </span><br/> Login as a Lecturer</p>

                            </div>
                        </div>
                    </div>
                    </a>
                </tr>
            </table>
        </div>
    )
}

const PopOverSignup = ({content}) => {
    return (
        <div className="container p-5">
            <table className="table">
                <tr>
                    <a href="/auth/register/lecturer">
                    <div className="container">
                        <div className="row">
                            <div className="col-2 px-2">
                            <HiOutlineLogin className="my-2" size={"35"} />
                            </div>
                            <div className="col-10">
                            <p className="my-0"><span className="roboto-slab text-primary popHead" >Sign Up Lecturer </span><br/> Register as Lecturer</p>

                            </div>
                        </div>
                    </div>
                    </a>
                </tr>
                <tr>
                    <a href="/auth/register/student">
                    <div className="container">
                        <div className="row">
                            <div className="col-2 px-2">
                            <HiOutlineLogin className="my-2" size={"35"} />
                            </div>
                            <div className="col-10">
                            <p className="my-0"><span className="roboto-slab text-primary popHead" >Sign Up Student </span><br/> Register as Student</p>

                            </div>
                        </div>
                    </div>
                    </a>
                </tr>
            </table>
        </div>
    )
}


const PopOverSave = ({handleClick, show, onHide}) => {
    const [fileName, setFileName] = useState("")
    return (
        <Modal size="sm" show={show} onHide={onHide}>
            
            <Form className="p-3">
                <Form.Label style={{fontSize:"16px"}}>File Name</Form.Label>
                <Form.Control
                value={fileName}
                onChange={(val) => {
                    setFileName(val.target.value)
                }}
                style={{width:"250px"}} 
                type="text" required />

                <Button style={{width:"100px"}} disabled={!fileName} className="my-2" 
                onClick={() => {
                    handleClick(fileName)
                    onHide()
                }}
            >save</Button>
            </Form>
            
        </Modal>
    )
}

const PopOverRename = ({handleClick, show, onHide}) => {
    const [fileName, setFileName] = useState("")
    return (
        <Modal size="sm" show={show} onHide={onHide}>
            
            <Form className="p-3">
                <Form.Label style={{fontSize:"16px"}}>New File Name</Form.Label>
                <Form.Control
                value={fileName}
                onChange={(val) => {
                    setFileName(val.target.value)
                }}
                style={{width:"250px"}} 
                type="text" required />

                <Button style={{width:"100px"}} disabled={!fileName} className="my-2" 
                onClick={() => {
                    handleClick(fileName)
                    onHide()
                }}
            >Rename</Button>
            </Form>
            
        </Modal>
    )
}
export { PopOverLogin, PopOverRename, PopOverSave, PopOverSignup };

