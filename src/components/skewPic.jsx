import assCre from "../assets/services/creation.jpg"
import assSub from "../assets/services/as.jpg"
import "./skew.css"
const Skewpic  = () => {
    return (
        <div class='pageOption'>
            <a href='#' class='option' data-inf='photo'>
                <img className="img" src={assCre} />
            </a>
            <a href='#' class='option' data-inf='cinema'>
                <img className="img" src={assSub} />
            </a>
            </div>

    )
}
export {Skewpic}