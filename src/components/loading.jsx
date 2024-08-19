import { Image } from "react-bootstrap"
import bg from "../assets/nobg.png"
import "./loading.css"

const Loading = () => {
    return (
        <div className="p-3 ring">
            <Image src={bg} fluid roundedCircle />
            <span className="ringSpan"></span>
        </div>
        )
}

export { Loading }
