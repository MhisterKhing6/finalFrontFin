import Chart from "react-apexcharts"
import { Accordion, Button, Card } from "react-bootstrap"

const taskX = ["Bad < 40", "Good < 60", "Very Good < 80", "Excellent"]

const QuestionReport =  ({taskStats, totalStudents}) => {
    let testX = ["Passed", "Failed"]
    let testY = [30, 40]
    let options = {
        title: {
            text: "Task Performance Bands"
        },
        chart: {
            id:"basic chart"
        }, xaxis: {
            categories: taskX
          }
    }
    return (
        <>
        <Accordion>
                    {taskStats.map((val, key) => {
                        return <>
                        <Accordion.Item key={val.taskNumber} eventKey={key}>
                        <Accordion.Header>Question {val.taskNumber}</Accordion.Header>
                        <Accordion.Body>
                        <Card className="my-1">
                            <Card.Body>
                            <div  className='mb-0'>
                                <h6 className='mb-0'></h6>
                                <div className='fs-xs'>{val.attempted}/{totalStudents} students Attempted</div>
                             </div>
                             <div className="progress mt-1 mb-1">
                             <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{width:`${(val.attempted / totalStudents) * 100}%`}} aria-valuenow="45" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                            </Card.Body>
                            </Card>
                            <Chart 
                                options={{...options, title:{text:"Performance Bands"}}}
                                series={[{data:val.bands, name:"Task Performance Bands"}]}
                                width={"100%"}
                                type="line"
                                height={"350px"}
                                />
                            <div>
                                <h5>Reports On Question Test</h5>
                                <Accordion>
                                    {val.testResult.map((val, index) => {
                                        return (<>
                                        
                                        <Accordion.Item key={val.testNumber} eventKey={index}>
                                        <Accordion.Header>Test {val.testNumber}</Accordion.Header>
                                        <Accordion.Body>
                                        <Chart 
                                            options={{ 
                                                xaxis:{categories:testX}, chart: {id:"test2"}, title:{text:"Pass and Failed Stats"}}}
                                            series={[ {data:[val.passNumber, val.failedNumber], name:"test"}]}
                                            width={"100%"}
                                            type="bar"
                                            height={"350px"}
                                            />
                                        </Accordion.Body>
                                    </Accordion.Item>
                                                </>)
                                    })}
                                    
                                </Accordion>
                            </div>
                            <Card className="p-2 border-0">
                                <h6 >Download Question Results</h6>
                                <div className="my-2 d-flex ">
                                <Button style={{width:"150px"}}  variant="outline-primary">Excel</Button>
                                <Button style={{width:"150px"}} className="mx-3" variant="outline-dark">PDF</Button>
                                </div>

                            </Card>
                         </Accordion.Body>
                        
                    </Accordion.Item>
                              </>
                    })}
                    
                </Accordion>
        </>
    )
}

export { QuestionReport }
