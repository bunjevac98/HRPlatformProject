import "../HomePage/HrImage.css";


export default function HrImage(props: imgSrc) {

  return (
    <div className="hr">
      <img src={props.imgSrc} alt="Home" className="hr__image"></img>
      <h1 className="hr__title">Welcome To HR Platform</h1>
    </div>
  );
}

interface imgSrc {
  imgSrc: string;
}
