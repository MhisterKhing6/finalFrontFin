import { Button, Card, Col, OverlayTrigger, Popover } from "react-bootstrap"
import { BiCalendar } from "react-icons/bi"
import { CgOptions } from "react-icons/cg"
import { FaCalculator, FaChartBar, FaEdit, FaEye } from "react-icons/fa"
import { FiDelete } from "react-icons/fi"
import { LiaForumbee } from "react-icons/lia"
import { MdScore } from "react-icons/md"
import { Link, useNavigate } from "react-router-dom"


const PopAssignment = ({id, status, title}) => {
    const navigate = useNavigate()
    return (
        <div  className="container p-3 text-muted rounded-2 ">
            <div className="align-items-center justify-content-start">
            <div>
             <Button  href={`/assignment-detail/${id}/${status}`} style={{textDecoration:"none"}} variant="link" className="p-0 text-muted mb-2"><span ><FaEye  className="me-3" />Details</span></Button>
            </div>
            </div>

            <div className="align-items-center justify-content-start">
            <div>
            <Button href={`/lecturer/submission/${id}`} style={{textDecoration:"none"}} variant="link" className="p-0 mt-0 text-muted mb-2"><span ><FaCalculator className="me-3" />Submission </span></Button>
            </div>
            </div>

            <div className="align-items-center justify-content-start">
            <div>
            <Button href={`/lecturer/report-assignment/${id}`} style={{textDecoration:"none"}} variant="link" className="p-0 mt-0 text-muted mb-2"><span ><FaChartBar className="me-3" />Report </span></Button>
            </div>
            </div>

            <div className="align-items-center justify-content-start">
            <div>
            <Button onClick={() => navigate(`/forum/${id}/lecturer`, {state: {title}})}  style={{textDecoration:"none"}} variant="link" className="p-0 mt-0 text-muted mb-2"><span ><LiaForumbee className="me-3" />Assignment Forum </span></Button>
            </div>
            </div>

            <div className="align-items-center justify-content-start">
            <div>
            <Button href={`/lecturer/edit-assignment/${id}`} style={{textDecoration:"none"}} variant="link" className="mb-2 p-0 mt-0 text-muted"><span ><FaEdit className="me-3"  />Edit Assignment</span></Button>

            </div>
            </div>

            <div className="align-items-center justify-content-start">
            <div>
            <Button onClick={() => {
                
            }} style={{textDecoration:"none"}} variant="link" className="mb-2 p-0 mt-0 text-muted "><span ><FiDelete className="me-3" />Delete Assignment</span></Button>

            </div>
            </div>
           
        </div>
    )
}




const AssignmentCard = ({ass}) => {
    const trigger = <Popover>
                        <PopAssignment title={ass.title} id={ass.id} status={ass.status}/>
                    </Popover>
    
    let display = "rounded-5  p-2  shadow-lg"
    if(ass.status === "Future")
        display += " btn-translucent-primary"
    else if(ass.status === "Open")
        display += " btn-translucent-success"
    else 
        display += " btn-translucent-danger"
    return (<Col className="mb-3" xs={12} md={6} lg={6} xl={4}>
            <Card className="p-3 text-muted bg-body-tertiary">
                  <div className="d-flex justify-content-between p-2">
                  <div className={display}>
                    {ass.status}
                 </div>
                 <OverlayTrigger overlay={trigger} delay={"10"} trigger="click">
                 <div  className="p-2 rounded-circle bg-body shadow-lg">
                     <CgOptions  size={"20px"}/> 
                 </div>
                 </OverlayTrigger>
                  </div>   
                  <h5 style={{fontWeight:"bolder"}}>{ass.title}</h5>
                  <p className="my-0">{ass.class.name}</p> 
                  <p className="my-0">{ass.Course.courseName}</p>  
                  <p className="my-0">{"</>"}{ass.Compiler.name}</p> 
                  <p className="d-flex align-items-center">
                    <BiCalendar />
                    {ass.startDate} to {ass.endDate} 
                    </p>     
            </Card>
    </Col>)
}

export { AssignmentCard }

