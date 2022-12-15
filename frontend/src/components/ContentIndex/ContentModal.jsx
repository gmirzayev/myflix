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
            <div onClick={handleClick} className="play-container">
              <svg viewBox="0 0 60 60">
                <g>
                  <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
                    c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
                    C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
                  <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
                    S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
                </g>
              </svg>
            </div>
            <div onClick={handleLike} className={like && like.contentId === content.id ? "like-container liked" : "like-container not-liked"}>
              <svg className="thumbs-icon" version="1.0" xmlns="http://www.w3.org/2000/svg"
              width="1222.000000pt" height="1280.000000pt" viewBox="0 0 1222.000000 1280.000000"
              preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                  <path d="M7271 12780 c-79 -21 -133 -55 -155 -98 -8 -16 -18 -93 -25 -187 -80
                  -1109 -253 -1873 -531 -2343 -141 -238 -279 -387 -585 -630 -340 -271 -528
                  -471 -629 -670 -15 -30 -72 -165 -128 -300 -300 -738 -565 -1282 -836 -1719
                  -265 -425 -548 -739 -783 -867 -116 -63 -180 -76 -365 -76 l-164 0 0 -2625 c0
                  -1444 2 -2625 5 -2625 3 0 62 -11 132 -24 71 -14 251 -48 400 -75 150 -28 393
                  -73 540 -101 1744 -324 1588 -298 1917 -325 485 -39 1028 -73 1566 -97 369
                  -16 1398 -16 1650 0 515 34 826 90 1010 182 324 163 742 555 873 818 l42 85 6
                  336 c4 246 9 345 19 371 29 76 94 154 305 366 236 236 306 319 360 429 80 163
                  68 256 -85 635 -101 252 -140 380 -140 464 0 103 64 208 270 441 229 260 292
                  369 276 481 -10 75 -62 184 -179 376 -202 333 -256 458 -243 557 10 73 56 154
                  182 321 223 295 252 353 240 486 -19 213 -189 556 -409 829 -83 103 -245 260
                  -322 311 -169 114 -421 159 -1110 195 -242 13 -1334 18 -2050 9 l-410 -5 -24
                  70 c-48 138 -29 362 53 622 81 256 179 480 450 1021 107 215 214 434 236 488
                  85 205 148 438 187 698 22 140 25 637 5 761 -73 454 -193 740 -413 978 -296
                  321 -816 521 -1138 437z"/>
                  <path d="M386 6129 c-123 -29 -263 -139 -324 -255 -66 -127 -62 65 -62 -2674
                0 -2181 2 -2493 15 -2549 43 -182 187 -329 370 -377 64 -17 1712 -20 1785 -3
                181 42 346 215 380 398 14 74 14 4988 0 5062 -34 183 -199 356 -380 398 -57
                13 -1728 13 -1784 0z"/>
                </g>
              </svg>
            </div>
            {save && save.contentId === content.id ? 
            <div className="saved" onClick={handleSave}>
              <svg width="28px" height="28px" viewBox="0 0 28 28">
                <g stroke="none" stroke-width="1" fill="none">
                    <g id="ic_fluent_checkmark_28_filled" fill="#212121" fill-rule="nonzero">
                        <path d="M10.5,19.5857864 L4.20710678,13.2928932 C3.81658249,12.9023689 3.18341751,12.9023689 2.79289322,13.2928932 C2.40236893,13.6834175 2.40236893,14.3165825 2.79289322,14.7071068 L9.79289322,21.7071068 C10.1834175,22.0976311 10.8165825,22.0976311 11.2071068,21.7071068 L25.2071068,7.70710678 C25.5976311,7.31658249 25.5976311,6.68341751 25.2071068,6.29289322 C24.8165825,5.90236893 24.1834175,5.90236893 23.7928932,6.29289322 L10.5,19.5857864 Z" id="🎨-Color"></path>
                    </g>
                </g>
              </svg>
            </div>
           : 
            <div className="not-saved" onClick={handleSave}>
              <svg width="459.325px" height="459.325px" viewBox="0 0 459.325 459.325">
                <g>
                  <path d="M459.319,229.668c0,22.201-17.992,40.193-40.205,40.193H269.85v149.271c0,22.207-17.998,40.199-40.196,40.193
                    c-11.101,0-21.149-4.492-28.416-11.763c-7.276-7.281-11.774-17.324-11.769-28.419l-0.006-149.288H40.181
                    c-11.094,0-21.134-4.492-28.416-11.774c-7.264-7.264-11.759-17.312-11.759-28.413C0,207.471,17.992,189.475,40.202,189.475h149.267
                    V40.202C189.469,17.998,207.471,0,229.671,0c22.192,0.006,40.178,17.986,40.19,40.187v149.288h149.282
                    C441.339,189.487,459.308,207.471,459.319,229.668z"/>
                </g>
              </svg>
            </div>}
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