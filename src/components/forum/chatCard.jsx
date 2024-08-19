import { useEffect, useState } from "react";
import { Button, Col, Container, Image, OverlayTrigger, Popover, Row } from "react-bootstrap";
import { CgOptions } from "react-icons/cg";
import { FaCheckCircle, FaReply } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { SlOptions } from "react-icons/sl";
import image from "../../assets/c.png";
import { delteFromBackend, postToBackend } from "../../utils/backendCalls";
import { token } from "../../utils/config";
import { getToken } from "../../utils/localstorage";
import { AudioPlay } from "./AudioPlayer";
import { DocumentCard } from "./DocumentCard";
import { PictureCard } from "./PictureCard";
import { VideoPlayer } from "./VideoPlayer";


const ChatCard = ({message, user, chatMessages, setChatMessages, setParentMessage, containerRef}) => {

    const [sent, setSent] = useState(false)
    useEffect((() => {
        if(!message.new)
            return
        message.new = false
        const postMessage = async () => {
        let authToken = ""
        //find user token
        if(user === "lecturer")
            authToken = getToken(token.lecturerTokenKey) 
        else {
            authToken = getToken(token.studentTokenKey)
        }
        let url = `/user/${user}/forum-message`
        let request = await postToBackend(url, message , authToken)
        if(request.status === 200)
            setSent(true)
        }
       postMessage()

    }),[message])

    const handleDelete = async (messageId) => {
        let authToken = ""
        //find user token
        if(user === "lecturer")
            authToken = getToken(token.lecturerTokenKey) 
        else 
            authToken = getToken(token.studentTokenKey)
        
        let url = `/user/${user}/forum-message/${messageId}`
        let response = await delteFromBackend(url, authToken)
        console.log(response)
        let filteredMessages  = chatMessages.filter(val => {
            return val.id != messageId
        })
        setChatMessages(filteredMessages)
    }

    const handleReply = (messageId) => {
        //findeMessage
        for (const message of chatMessages) {
            if(message.id === messageId)
              {
                setParentMessage(message)
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
                break
              }
        }
    }
    const PopDetails = ({id, me}) => {
        const overlay = (
            <Popover>
            <div  className="container p-3 text-muted rounded-2 ">
                <div className="align-items-center justify-content-start">
                <div>
                 <Button onClick={(e) => {
                    e.preventDefault()
                    handleReply(id)
                 }}  style={{textDecoration:"none"}} variant="link" className="p-0 text-muted mb-2"><span ><FaReply  className="me-3" />Reply</span></Button>
                </div>
                </div>

               {me && <div className="align-items-center justify-content-start">
                <div>
                 <Button onClick={async (e) => {
                    e.preventDefault()
                    await handleDelete(id)
                 }} style={{textDecoration:"none"}} variant="link" className="p-0 text-muted mb-2"><span ><FaDeleteLeft  className="me-3" />Delete</span></Button>
                </div>
                </div> }            
            </div>
            </Popover>
        )
    return (
        <OverlayTrigger trigger={"click"} delay={10} overlay={overlay}>
            <Button className="m-0 p-0 bg-transparent border-0 text-dark"><CgOptions className="mx-2" /></Button>
        </OverlayTrigger>
    )
    }


    return (
        <div className={`d-flex w-100`}>
        <Container>
        <Row className={`${message.me ? 'justify-content-end' : "justify-content-start" }`}>
        <Col sm={10} md={8} className="p-2" lg={5}>
            <div className={` d-flex ${message.me ? "justify-content-end" : "justify-content-start"} align-items-center`}>
            <div className={`d-flex  align-items-center justify-content-start`}>
            {!message.me && <Image roundedCircle src={message.profileUrl} width={80} height={80} />  }
            <div style={{fontWeight:"bold"}} className="d-flex align-items-center p-0 m-0 px-2">{message.me ? "You" : message.name}   
            <PopDetails id={message.id} me={message.me} />
            </div>
            </div>
            
            </div>
            <div className={`ms-5 border-3 d-flex ${message.me ? "justify-content-end" : "justify-content-start"}`}>
                <div  style={{width: "max-content", borderRadius: "5px"}} className="p-2 shadow-lg  sh border border-1">
                    {message.message}
               {message.type !== "text" 
               && 
               <div className="p-2">
               {message.type==="video" && message.files.map((val, index) => {return  <VideoPlayer key={val.fileName + index} file={val} /> })  }
                {message.type==="audio" && message.files.map((val, index) => {return <AudioPlay key={val.fileName + index} file={val} />})}
                {message.type==="pic" && message.files.map((val, index) => {return   <PictureCard key={val.fileName + index} file = {val}/>}) }
                {message.type ==="doc" && message.files.map((val, index) => { return <DocumentCard key={val.fileName + index} file={val} />})} 
                </div>}
                <small className="text-muted  d-flex align-items-center justify-content-end">
                 {message.date}   {message.time} {!sent && message.notLoaded ? <SlOptions  className="mx-1"/> : <FaCheckCircle className="text-primary mx-1" /> }
                </small>
                </div>
                </div>
            </Col>
        </Row>
        </Container>
        </div>
    )
}
export { ChatCard };

