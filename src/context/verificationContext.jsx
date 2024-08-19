import { createContext, useState } from "react";

const VerificationContext = createContext()

const VerificationContextProvider = ({children}) => {
    const [vid, setVid] = useState("")
    const [show, setShow] = useState(false)

    const [showFg, setShowFg] = useState(false) 

    
    const handleClose = (fg=null) =>{ 
        
            setShow(false)
    };
    const handleShow = ()  => {
        
         setShow(true);
        
    }
    
    return (
        <VerificationContext.Provider value={{showFg, setShowFg,vid, setVid, show, setShow, handleClose, handleShow}}>
            {children}
        </VerificationContext.Provider>
    )
    
}

export { VerificationContextProvider, VerificationContext };
