import { Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';


const DashBoardElement = ({title,children, desc, url}) => {
    return (
    
        <Col  xs={12} sm={6}  md={6} lg={4} xl={3} className="p-2">
            <Link to={url} className='text-dark'>
            <Row className="overflow-hidden dashboardElem shadow-lg py-2  mx-2 bg-white">
                {children}
                <p style={{fontSize: "2rem"}} className='my-1 lead'>{title}</p>
                <p className='my-1'>{desc}</p>
            </Row>
            </Link>
        </Col>
   

    )
}

export { DashBoardElement };
