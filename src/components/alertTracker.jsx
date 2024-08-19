import React from 'react';
import { Toast, ToastContainer } from "react-bootstrap";

function AlertToast({show, toggleShow, text}) {
  return (
    
      <ToastContainer position="top-end" className="position-absolute p-3" style={{ zIndex: 1 }}>
        <Toast bg='info'  show={show} onClose={() => {toggleShow()}}>
          <Toast.Header>
            <strong className="me-auto">Alert</strong>
            <small>just now</small>
          </Toast.Header>
          <Toast.Body  style={{fontSize:"20px"}} className='overflow-hidden'>{text}</Toast.Body>
        </Toast>
      </ToastContainer>
  );
}

export { AlertToast };
