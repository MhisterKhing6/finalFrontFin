import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { Button, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { BiVideo } from 'react-icons/bi';
import { FaMicrophone } from 'react-icons/fa';
import { GrDocumentPdf } from 'react-icons/gr';
import { PiCatThin } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { getFromBackend } from '../../utils/backendCalls';
import { token } from '../../utils/config';
import { chatDate, chatTime } from '../../utils/datesManipulation';
import { getToken } from '../../utils/localstorage';
import { UploadFileChat } from './FileUPlaod';
import { ChatCard } from './chatCard';
import io from 'socket.io-client';
import { backend } from '../../utils/config';
import './window.css';

const ChatWindow = ({user}) => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const {assId} = useParams()
    const [message, setMessage] = useState("")
    const [uploadMessage, setUploadMessage] = useState({AssignmentId:assId ,type:"text"})
    const [base64, setBase64] = useState([])
    const [acceptedFiles, setAcceptedFiles] = useState("")
    const [showUpload, setShowUpload] = useState(false)
    const [files, setFiles] = useState([])
    const [page, setPage] = useState(0)
    const [parentMessage, setParentMessage] = useState()
    const [socket, setSocket] = useState()

    
    const chatContainerRef = useRef(null);
    const [rows, setRows] = useState(0)

    useEffect(() => {
        console.log("useEffect")
        // Stimulate
        const newSocket = io(backend.url)
        setSocket(newSocket)
        newSocket.on(assId, (msg) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        })
        
        loadMoreMessages();
        return () => {
            newSocket.disconnect()
        }
    }, []);

    const loadMoreMessages = async () => {

        if (loading) return;
        const scrollPosition = chatContainerRef.current.scrollTop;
        const scrollHeight = chatContainerRef.current.scrollHeight;
        setLoading(true)
        let newPage = page + 1
        let url = `/user/${user}/forum-message/${assId}?page=${newPage}`
        setPage(newPage)
        let authToken = ""
        if(user === "lecturer")
            authToken = getToken(token.lecturerTokenKey)
        else 
            authToken = getToken(token.studentTokenKey)
        

        let response = await getFromBackend(url, authToken)
        if(response.status === 200 && response.data.items.length !== 0) {
            setLoading(false)
            setPage(newPage)
            let chatMessages = []
            let items = response.data.items
            for(let i = items.length - 1; i>=0; i--) {
                let formattedMessage = {"message": items[i].message, time:chatTime(new Date(items[i].createdAt)), date:chatDate(new Date(items[i].createdAt))}
                formattedMessage.profileUrl = items[i].userProfile
                formattedMessage.name = items[i].userName
                formattedMessage.type = items[i].type
                formattedMessage.id = items[i].id
                formattedMessage.parentMessage = items[i].parentMessage

                if(response.data.userId === items[i].userId)
                    formattedMessage.me = true
                formattedMessage.files = items[i].files
                chatMessages.push(formattedMessage)
            }
            
            setMessages((prev) => [...chatMessages,...prev])
            const newScrollHeight = chatContainerRef.current.scrollHeight;
            chatContainerRef.current.scrollTop = newScrollHeight - scrollHeight + scrollPosition;
        }
        setLoading(false)

       
    };

    const handleScroll = () => {
        if (chatContainerRef.current.scrollTop === 0) {
            loadMoreMessages();
        }
    };

    useEffect(() => {
        const chatContainer = chatContainerRef.current;
        chatContainer.addEventListener('scroll', handleScroll);

        return () => chatContainer.removeEventListener('scroll', handleScroll);
    }, [messages]); 

    const PopElement = () => {
        return (
            <div  className="container p-3 text-muted rounded-2 bg-body-secondary">
                <div className="align-items-center justify-content-start">
                <div>
                 <Button 
                 onClick={() => {
                    setAcceptedFiles("image/*")
                    setShowUpload(true)
                    setUploadMessage({...uploadMessage, type:"pic"})} }
                 style={{textDecoration:"none"}} variant="link" className="p-0 text-muted mb-2"><span ><PiCatThin className="me-3" />Picture</span></Button>
                </div>
                </div>
    
                <div className="align-items-center justify-content-start">
                <div>
                <Button 
                onClick={() => {
                    setUploadMessage({...uploadMessage, type:"video"})
                    setAcceptedFiles("video/*")
                    setShowUpload(true)
                }
                }
                style={{textDecoration:"none"}} variant="link" className="p-0 mt-0 text-muted mb-2"><span ><BiVideo className="me-3" />Video </span></Button>
                </div>
                </div>

                <div className="align-items-center justify-content-start">
                <div>
                <Button 
                onClick={() => {
                    setUploadMessage({...uploadMessage, type:"audio"})
                    setAcceptedFiles("audio/*")
                    setShowUpload(true)
                } }
                style={{textDecoration:"none"}} variant="link" className="p-0 mt-0 text-muted mb-2"><span ><FaMicrophone className="me-3" />Audio </span></Button>
                </div>
                </div>

                <div className="align-items-center justify-content-start">
                <div>
                <Button
                onClick={() => {
                    setUploadMessage({...uploadMessage, type:"doc"})
                    setAcceptedFiles("")
                    setShowUpload(true)
                } }
                style={{textDecoration:"none"}} variant="link" className="p-0 mt-0 text-muted mb-2"><span ><GrDocumentPdf className="me-3" />Docs </span></Button>
                </div>
                </div>
               
            </div>
        )
    }

    const handleMessageSubmit = (e) => {
        e.preventDefault()
        if((message.trim() === "" && base64.length === 0))
            return
        if(base64.length === 0)
            setUploadMessage({...uploadMessage, type:"text"})
        setMessages((prevMessages) => [...prevMessages, {notLoaded:true,time:chatTime(new Date()), date:chatDate(new Date()) ,socketId: socket.id, id:uuidv4(), new:true, message:message, me:true, ...uploadMessage, files:base64, parentMessageId: parentMessage ? parentMessage.id : ""}]);
        setMessage("")
        setFiles([])
        setBase64([])
        setParentMessage("")
        setUploadMessage({AssignmentId:assId})
        setShowUpload(false)
        setRows(1)
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    
    return (
        <div className="chat-container d-flex flex-column">
            <div className="chat-messages flex-grow-1 p-3 overflow-auto" ref={chatContainerRef}>
                <div className='parent'>
                {loading && <div className="child text-center text-primary"><Spinner  /></div>}
                </div>
                {messages.map(message => {
                    return <ChatCard setParentMessage={setParentMessage} containerRef={chatContainerRef} id={message.id} chatMessages={messages} setChatMessages={setMessages} user={user} message={message} />
                } )}
                
            </div>

            {/* Input Area */}
            <div  className="input-area  p-3 border-top">
               {showUpload && <UploadFileChat  files={files} setFiles={setFiles} hideFile={() => setShowUpload(false)} base64={base64} setBase64={setBase64} type={acceptedFiles}  /> }
               {parentMessage && <div className='mb-0 p-0'>
                    <p className='mb-0 py-0'><span style={{fontWeight:"bold"}}>{parentMessage.me ? "You": parentMessage.name }</span><br />{parentMessage.message}</p>
                    
                </div>
                }
                <div className='d-flex  fle align-items-end py-4'>
                <textarea
                    onChange={(value) => {
                        //count new lins
                        let rows = (value.target.value.split("\n").length)
                        setRows(rows)
                        setMessage(value.target.value)
                        
                    }}
                    style={{height:'auto'}}
                    type="text-area"
                    value={message}
                    className="form-control me-2" 
                    placeholder="Type your message..."
                    rows={rows}
                />
                <Button onClick={handleMessageSubmit} disabled={message.trim === "" && base64.length === 0} className="btn btn-primary">Send</Button>

                {/* Plus Button */}
                <div className="position-relative ms-3">
               
                    <OverlayTrigger trigger={"click"} overlay={<Popover><PopElement /></Popover>}>
                    <Button style={{fontWeight:"bold"}} variant='outline-primary'
                        className="rounded-circle shadow-lg btn-translucent-primary" 
                    >
                        +
                    </Button>
                    </OverlayTrigger>
                </div>
                </div>
            </div>
        </div>
    );
};

export { ChatWindow };

