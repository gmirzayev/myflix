import './ContentModal.css';
import { useHistory } from "react-router-dom";

const ContentModal = ({content, onExit}) =>  {
  const history = useHistory();
  // :title, :description, :year, :parental_rating, :category, presence: true

  const handleClick = () => {
    history.push(`/browse/video/${content.id}`)
  }

  return (
    <div className="preview-modal-container" onMouseLeave={() => onExit()}>
      <div className="preview-modal">
        <img src={require('../../assets/ArcaneImage.jpeg')} onClick={handleClick} className="preview-modal-picture"/>
        <div className="preview-modal-info">
          <div className="modal-interaction-row">
            <button onClick={handleClick}>Play</button>
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