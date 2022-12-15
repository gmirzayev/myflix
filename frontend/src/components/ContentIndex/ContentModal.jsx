import './ContentModal.css';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as likeActions from '../../store/likes';
import * as saveActions from '../../store/saves';

const ContentModal = ({content, onExit}) =>  {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionProfile = JSON.parse(sessionStorage.getItem("currentProfile"));

  const like = useSelector((state) => Object.values(state.like).find(ele => ele.contentId === content.id))
  const save = useSelector((state) => Object.values(state.save).find(ele => ele.contentId === content.id))
  const [liked, setLiked] = useState(like ? true : false);
  const [saved, setSaved] = useState(save ? true : false);

  useEffect(() => {
    
  },[sessionProfile])

  const handleClick = () => {
    history.push(`/browse/video/${content.id}`)
  }

  const handleLike = () => {
    if(!liked) {
      dispatch(likeActions.createLike({contentId: content.id, profileId: sessionProfile.id}));
    } else if (like){
      dispatch(likeActions.deleteLike(like.id));
    } 
    setLiked(!liked);
  }

  const handleSave = () => {
    if(!saved) {
      dispatch(saveActions.createSave({contentId: content.id, profileId: sessionProfile.id}));
    } else if (save){
      dispatch(saveActions.deleteSave(save.id));
    } 
    setSaved(!saved);
  }
  
  return (
    <div className="preview-modal-container" onMouseLeave={() => onExit()}>
      <div className="preview-modal">
        <img src={require('../../assets/ArcaneImage.jpeg')} onClick={handleClick} className="preview-modal-picture"/>
        <div className="preview-modal-info">
          <div className="modal-interaction-row">
            <button onClick={handleClick}>Play</button>
            <button onClick={handleLike} className={like && like.contentId === content.id ? "red" : "blue"}>Like</button>
            <button onClick={handleSave} className={save && save.contentId === content.id ? "red" : "blue"}>Save</button>
          </div>
          <div className="rating-row">
            <span>{content.parentalRating}</span>
          </div>
          <div className="category-row">
            <span>{content.category}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentModal;