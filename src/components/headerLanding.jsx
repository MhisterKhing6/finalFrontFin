import { Nav, Navbar, Offcanvas, OverlayTrigger, Popover } from 'react-bootstrap';
import nobg from "../assets/nobg.png";
import { PopOverLogin, PopOverSignup } from './popOver.jsx';


function GeneralNavbar() {
  const loginPopOver = (
    <Popover >
        <PopOverLogin />
    </Popover>

  )
  const signup = (
    <Popover >
        <PopOverSignup />
    </Popover>

  )
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={expand} expand={expand} className="p-2 w-100 navHead mb-3">
            <Navbar.Brand style={{fontSize: "0.9rem"}} className='p-2' href="/">
                <section className='d-flex justify-content-center align-items-center'>
                <img style={{height:"50px", width:"50px"}} className='img-fluid' src={nobg} / >
                <h3 className=' text-primary logo'>Auto Code Grader</h3>
                </section>
                
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
                  <Nav.Link className='text-center ' href="/">Home</Nav.Link>
                  <Nav.Link className='text-center '>Serives</Nav.Link>
                  <Nav.Link className='text-center' href="#action2">About</Nav.Link>
                  <OverlayTrigger className="popOver" placement="bottom" trigger="focus" overlay={signup}>
                  <Nav.Link className='text-center' >Register</Nav.Link>
                  </OverlayTrigger>
                  <OverlayTrigger className="popOver" placement="bottom" trigger="focus" overlay={loginPopOver}>
                  <Nav.Link className='text-center' >Sign In</Nav.Link>
                  </OverlayTrigger>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>
      ))}
    </>
  );
}

export { GeneralNavbar };
