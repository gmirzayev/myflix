import './ModalContentItem.css';

const ModalContentItem = ({content}) => {
    return (
        <div>
            <div className="modal-top-container">
                <div className="model-top-picture-wrapper">
                    <img className="model-top-picture" src={require('../../assets/ArcaneImage.jpeg')}/>
                </div>
            </div>
            <div className="modal-info">
                <div className="info-description">
                    {content.description}
                </div>
            </div>
        </div>
    )
}

export default ModalContentItem;