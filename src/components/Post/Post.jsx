import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { __deletePost } from "../../redux/modules/posts";
import Button from "../Common/Button";


const Post = ({ id, username, title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickHandler = () => {
    navigate(`/detail/${id}`);
  }

  const onDeleteHandler = (e) => {
    let answer = window.confirm("Sure about delete this post?");
    e.stopPropagation();
    if(!answer) {
      return;
    }
    dispatch(__deletePost(id))
  }

  return (
    <>
      <div onClick={onClickHandler}>
        <div>{title}</div>
        <div>Creator: {username}</div>
      </div>
      <Button onClick={onDeleteHandler} icon={faTrashCan}/>
    </>
  );
};

export default Post;
