import { useNavigate } from "react-router-dom";
import "../HomePage/Slider.css";
import { useInView } from "react-intersection-observer";
import { Button } from "reactstrap";

export default function Slider(props: sliderProp) {
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0.4,
  });
  const navigate = useNavigate();

  const navigateToShowCandidate = () => {
    navigate("/candidate/show");
  };

  const navigateToShowSkills = () => {
    navigate("/skills");
  };
  const renderContent = () => {
    if (!props.flipped) {
      return (
        <>
          <img className="slider__image" src={props.imageSrc} alt="Home"></img>
          <div className="slider__content">
            <h1 className="slider__title">{props.title}</h1>
            <p className="slider__subtitle">{props.subtitle}</p>
            <Button outline size="lg" onClick={navigateToShowCandidate}>
              Show candidates
            </Button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="slider__content">
            <h1 className="slider__title">{props.title}</h1>
            <p className="slider__subtitle">{props.subtitle}</p>
            <Button outline size="lg" onClick={navigateToShowSkills}>
              Show skills
            </Button>
          </div>
          <img src={props.imageSrc} alt="Home" className="slider__image"></img>
        </>
      );
    }
  };

  //Redovan return
  return (
    <div ref={ref} className={inView ? "slider slider--zoom" : "slider"}>
      {renderContent()}
    </div>
  );
}
interface sliderProp {
  imageSrc: string;
  title: string;
  subtitle: string;
  flipped?: boolean;
}
