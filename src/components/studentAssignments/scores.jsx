
import {Button, Dropdown, Stack, Badge, ProgressBar, Table} from "react-bootstrap"
import { CgCalendarDates } from "react-icons/cg"
import { Link } from "react-router-dom"
import { MdNumbers } from "react-icons/md"
const ScoreAssignment = ({val}) => {
    return (
        <div key={val.id} href="" className="w-100 bg-transparent text-black border-0">
                    <Stack  className="mb-3 shadow-lg p-2">
                        <Stack className="justify-content-between" direction="horizontal">
                            <h5 className="assTitle">{val.title}</h5> 
                            <div  className={`p-1 ${val.status === "close" ? "btn-translucent-danger" : "btn-translucent-success"} rounded`}>
                                {val.status}
                            </div>
                        </Stack>
                        <div className="text-start">
                        {val.mark}/100
                        <ProgressBar now={val.mark} animated />
                        </div>
                        
                        <Dropdown className="text-start my-2">
                        <Dropdown.Toggle  className="bg-dark p-1">            
                            Details
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{fontSize:"18px"}} className="w-100 p-0 m-0">
                            
                        <div className="p-2 text-start">
                            <h6  style={{fontWeight:"bold"}} className="p-1 text-dark my-0">Assignment Info</h6>                           
                            <Table striped bordered hover size="sm">
                                <tbody>
                                    <tr>
                                        <td><CgCalendarDates className="me-2"/> Start Date</td>
                                        <td>{new Date(val.startDate).toDateString()}</td> 
                                    </tr>

                                    <tr>
                                        <td><CgCalendarDates className="me-2"/> End Date</td>
                                        <td>{new Date(val.endDate).toDateString()}</td>
                                    </tr>

                                    <tr>
                                        <td><CgCalendarDates className="me-2"/> Course</td>
                                        <td>{val.courseCode}</td>
                                    </tr>
                                    <tr>
                                        <td><CgCalendarDates className="me-2"/> Language</td>
                                        <td>{val.compiler}</td>
                                    </tr>                         
                                    <tr>
                                        <td><MdNumbers className="me-2"/> Number of Ques</td>
                                        <td>{val.totalTask}</td> 
                                    </tr>
                                </tbody>
                            </Table>
                            
                            

                            <h5  style={{fontWeight:"bold"}} className="p-1 mt-2 text-dark my-0">Question Results</h5>                           
                            <Table striped bordered hover size="sm">
                                <thead style={{fontSize:"16px"}}>
                                    <tr>
                                    <th>Number</th>
                                    <th>Score (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {val.tasks.map(task => {
                                        return (
                                            <tr key={task.id}>
                                                <td>
                                                    {task.number}
                                                </td>
                                                <td>
                                                    {task.mark}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                            
                            <div className="mt-2">
                                <Link to={`/assignment/${val.id}`} className=""><Badge> View Assignment  </Badge></Link>
                            </div>
                            
                        </div>
                        </Dropdown.Menu>
                        </Dropdown>
                    </Stack>
                </div>
    )
}

export {ScoreAssignment}