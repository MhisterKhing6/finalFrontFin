import { Image } from "react-bootstrap"
import thumbnail from "../../assets/blured.webp"
import { FaDownload } from "react-icons/fa6"
import "./VideoPlayer.css"
import { useEffect, useState } from "react"
const PictureCard = ({file})=> {
    const [src, setSrc] = useState(thumbnail)

   return ( 

   <div className="my-1">
        <div className="video-placeholder"  >
                        <img style={{width:"300px", height:"200px"}} src={file.st ? file.fileUrl : src} alt="picture thumbnail" className="video-thumbnail" />
                        {!file.st && src===thumbnail && <div className="play-button-overlay">
                            <FaDownload size={40} color="#fff" onClick={() => {
                                setSrc(file.fileUrl)
                            }} />
                        </div> }
            </div>
   
   </div>
   )
}
export {PictureCard}