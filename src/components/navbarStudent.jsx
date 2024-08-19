import { Container, Image, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import nobg from "../assets/nobg.png";

function StudentNavbar() {
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="navStudent w-100 p-2">
          <Container fluid>
            <Navbar.Brand style={{fontSize: "0.9rem"}} className='p-2' href="#">
              <Image src={nobg} width={50} height={50} roundedCircle /> 
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Auto Code Grader
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className='p-2'>
                <Nav className="justify-content-end flex-grow-1 pe-3 navList">
                  <Nav.Link href="#action1">Home</Nav.Link>
                  <Nav.Link href="/lecturer/create/assignment">Create</Nav.Link>
                  <Nav.Link href="#action2">Edit</Nav.Link>
                  <Nav.Link href="#action2">Reports</Nav.Link>
                  <Nav.Link href="#action2">Profile</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export { StudentNavbar };
