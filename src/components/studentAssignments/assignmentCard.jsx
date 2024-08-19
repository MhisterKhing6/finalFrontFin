import {Badge, Button,ProgressBar, Stack } from "react-bootstrap"
import { Countdown } from "../timerComponents/timer"

const StudentAssignmentCard = ({val}) =>{
    return (
        <Button key={val.id} href={`/assignment/${val.id}`} className="w-100 bg-transparent text-black border-0">
            <Stack  className="mb-3 shadow-lg p-2">
                <Stack className="justify-content-between" direction="horizontal">
                    <h5 style={{fontWeight:"bold"}} className="assTitle">{val.title}</h5>
                <div style={{borderRadius:"3px"}} className="p-1 btn-translucent-success">
                    Open
                </div>
                </Stack>
                <div className="text-start  text-primary" >
                {val.AssignmentResults.mark}/100
                <ProgressBar animated now={val.AssignmentResults.mark} className="w-100"/>
                </div>
                <div style={{fontWeight:"bold"}}   className="text-start my-1">
                    <Countdown targetDate={val.endDate} />
                </div>
                <Stack  direction="horizontal" className="my-2">
                
                <div className="">
                    <Badge bg="primary">{val.Course.courseCode}</Badge>
                    </div>
                    
                    <div className="m-1">
                    <Badge bg="primary">{"</> python"}</Badge>
                    </div>
                </Stack>
            </Stack>
        </Button>
    )
}

export { StudentAssignmentCard }
