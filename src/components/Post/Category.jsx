import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";

const Category = (props) => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`${props.path}`)
  }


  return (
    <div>
      <div>{props.contents}</div>
      <Button onClick={onClickHandler}  icon={faArrowAltCircleRight}/>
    </div>
  );
};

export default Category;
