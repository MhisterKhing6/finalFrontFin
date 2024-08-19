import { Card } from 'react-bootstrap'
import assCre from "../assets/services/creation.jpg"
import assSub from "../assets/services/as.jpg"
import cd from "../assets/services/cd.jpg"

 
const Services = () => {
    const service = [
        {
            src:assCre,
            description:"Streamline Assignment Management with Auto Code Grader: Easily Submit Assignments, Provide Detailed Feedback, Upload Assignment Tests, Manage Dynamic Marking Rubrics, and Set Requirements such as Coding Standards, Plagiarism Checks, and Documentation, All with our User-Friendly Interface and Integrated GitHub Support",
            "title":"Assignment Management"
        },
        {
            src:assSub,
            description:"Simplify Assignment Submission with Auto Code Grader: Choose from 3 Modes – File Upload, GitHub Integration, or Live Coding with IDE. Automatically Run Tests, Generate Results, and Provide Error Feedback to Students. Easily Manage Marking Rubrics, Coding Standards, Plagiarism Checks, and Documentation Requirements for Seamless Grading",
            "title":"Assignment Submission"
        },
        {
            src:cd,
            description:"Comprehensive Submission Checks with Auto Code Grader: Verify Student Submissions Against Requirements, Including Maximum Line Limits and Attendance to Assignment, Detect Plagiarism, Evaluate Documentation Quality, Check Coding Style, Identify Compilation Errors, and Perform Security Assessments for Thorough Evaluation",
            "title":"Quality Assurance"
        },

    ]
    return (
        <section className="service" style={{minHeight:"500px"}}>
            <h1  className="display-3 my-2 heading text-center lead w-100">Services</h1>
            <hr />
            <section className="container my-4">
                <section className="row">
                    {
                        service.map(val => {
                            return (
                                <section ke={val.title} className="col-md-6 col-lg-4">
                                    <Card style={{width:'100%'}} className='shadow-lg'>
                                        <Card.Img  src={val.src} className='img img-fluid'/>
                                        <Card.Body>
                                            <Card.Title><h3 className='subHeading'>{val.title} </h3></Card.Title>
                                            <hr />
                                            <Card.Text style={{fontSize:"20px"}}>
                                                {val.description}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </section>
                            )
                        })
                    }
                </section>
            </section>
        </section>
    )
}

export {Services}