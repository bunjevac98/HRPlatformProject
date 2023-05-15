import HrImage from "./HrImage";
import Slider from "./Slider";

export default function HomePage() {
  return (
    <div>
      <HrImage imgSrc="https://images.unsplash.com/photo-1414919823178-e9d9d0afd0ac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1282&q=80"></HrImage>
      <Slider
        imageSrc="https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80"
        title="Show all candidates"
        subtitle="Shows all candidate in system"
      ></Slider>
      <Slider
        imageSrc="https://images.unsplash.com/photo-1554224154-22dec7ec8818?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        title="Show all skills"
        subtitle="Shows all skills in system"
        flipped
      ></Slider>
    </div>
  );
}
