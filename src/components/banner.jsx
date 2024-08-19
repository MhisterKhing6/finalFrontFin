import { Button, Row, Col,Stack, Badge } from "react-bootstrap"
import cPlus from "../assets/c++.png"
import c from "../assets/c.png"
import js from "../assets/js.png"
import ruby from "../assets/ruby.png"
import sql from "../assets/sql.png"
import php from "../assets/php.png"
import python from "../assets/python.jpg"
import { Scroll } from "./srolll"
import { TestCheck } from "./testBadge"
import banner from "../assets/services/banner2.jpg"
import { BannerCarlo } from "./bannerCaro"


const Banner = () => {
    const programingLanguage = [
         {name:"C++", src:cPlus},
         {name:"C",src:c}, 
         {name:"JavaScript", src:js}, 
         {name:"Python", src:python}, 
         {name:"PHP", src:php}, 
         {name:"Sql", src:sql},
         {name:"Ruby", src:ruby}
        ]
    return(
        <>
        <section className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1 className="banner py-1">
                    Create, Grade, and Provide Detailed Feedback on Coding Assignments Using Auto Code Grader
                    </h1>
                    <h5 className="py-1">
                    Empower Lecturers: Effortlessly Create, Grade, and Provide Detailed Feedback on Assignments, Facilitate Seamless and Convenient Student Submissions
                    </h5>
                    <h5 className="py-1">
                    Empower Students: Easily submit assignments and receive prompt feedback. Streamlined for students, ensuring quick response times and seamless submission experiences
                    </h5>
                    <div className="d-flex my-3">
                        <Button className="btn1" size="lg" variant="primary">LECTURER</Button>
                        <Button className="mx-3 btn2" style={{minWidth:"150px"}} size="lg" variant="outline-primary">STUDENT</Button>
                    </div>
                </div>
                <div className="animateMe bannerImage col-md-6 p-0 m-0" style={{minHeight:"400px"}}>
                    <BannerCarlo />
                </div>
            </div>
        </section>
        <section className="mt-5 px-3 d-flex flex-column justify-content-center align-items-center">
        <Scroll images={programingLanguage} speed={20000} />
        </section>
        </>
    )
}
export {Banner}