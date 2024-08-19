import {Carousel} from 'react-bootstrap';
import assCre from "../assets/services/creation.jpg"
import assSub from "../assets/services/as.jpg"
import cd from "../assets/services/cd.jpg"

function BannerCarlo() {
  return (
    <Carousel fade className='w-100 h-100'>
      <Carousel.Item interval={1500}>
        <img className="w-100 h-100" src={assCre} />
        <Carousel.Caption>
          <h1 className='heading'>Create</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={2200}>
        <img src={assSub} />
        <Carousel.Caption>
          <h1 className='heading'>Grade</h1>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1500}>
        <img src={cd} />
        <Carousel.Caption>
          <h1 className='heading'>Check</h1>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export {BannerCarlo};