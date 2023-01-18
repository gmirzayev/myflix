import { useSelector} from "react-redux";
import './ContentRow.css';
import * as contentActions from '../../store/contents';
import ContentItem from "./ContentItem";

const ContentRow = ({category}) => {
    // const dispatch = useDispatch();
    // const [previewModal, setPreviewModal] = useState(false);
    const allContent = useSelector(contentActions.getContentsByCategory(category));
    

    // useEffect(() => {
    //     dispatch(contentActions.fetchContents());
    // }, [dispatch])
    const row = allContent.filter((content) => {
        // if(filter === "movies") {
        //     return content.
        // } else if(filter === "tv") {

        // } else {
            return content;
        // }
    }).map((content, idx) => {
        // debugger
        // const like = likes.filter(like => {
        //     return like.contentId === content.id;
        // })
        return <ContentItem key={idx} content={content} test={idx}/>
    })

    const handleSlideClick = (e) => {
        let slider;
        let direction;

        if(e.target.classList.contains("slide-left")) {
            slider = e.target.nextElementSibling;
            direction = "left";
        } else {
            slider = e.target.previousElementSibling;
            direction = "right";
        }
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))
        const itemsShown = parseInt(getComputedStyle(slider).getPropertyValue("--items-shown"))
        const timesToShift = Math.floor(row.length/itemsShown);
        if(direction === "left") {
            if (sliderIndex - 1 < 0) {
                slider.style.setProperty("--slider-index", timesToShift - 1)
            } else {
                slider.style.setProperty("--slider-index", sliderIndex - 1)
            }
        } else {
            if (sliderIndex + 1 >= timesToShift) {
            slider.style.setProperty("--slider-index", 0)
            } else {
            slider.style.setProperty("--slider-index", sliderIndex + 1)
            }
        }
    }

    return (
    <>
    {/* onExit={() => setPreviewModal(false)} */}
        
        <div className="content-row-container">
            <h1>{category}</h1>
            <div className="content-row">
                {/* <button className="slider-button slide-left" onClick={handleSlideClick}></button> */}
                <div className="slider-button slide-left" onClick={handleSlideClick}>
                    <svg className="arrow-left" width="519" height="40" viewBox="0 0 519 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs id="genericDefs" />
                        <g>
                            <g>
                            <path d="M130.2188 386.1562 L9.2812 315 L9.2812 290.8125 L130.2188 219.6562 L130.2188 245.3906 L33.4688 302.9062 L130.2188 360.5625 L130.2188 386.1562 Z" stroke="none" />
                            </g>
                        </g>
                    </svg>
                </div>
                <div className="content-slider">
                    {row}
                </div>
                <div className="slider-button slide-right" onClick={handleSlideClick}>
                    <svg className="arrow-right" width="519" height="40" viewBox="0 0 519 146" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs id="genericDefs" />
                        <g>
                            <g>
                            <path d="M130.2188 386.1562 L9.2812 315 L9.2812 290.8125 L130.2188 219.6562 L130.2188 245.3906 L33.4688 302.9062 L130.2188 360.5625 L130.2188 386.1562 Z" stroke="none" />
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    </>
    )
}

export default ContentRow;