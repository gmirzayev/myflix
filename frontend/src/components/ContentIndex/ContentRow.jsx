import { useSelector} from "react-redux";
import './ContentRow.css';
import * as contentActions from '../../store/contents';
import ContentItem from "./ContentItem";

const ContentRow = ({category}) => {
    // const dispatch = useDispatch();
    const allContent = useSelector(contentActions.getContentsByCategory(category));
    const testContent = Array(10).fill(...allContent);
    

    // useEffect(() => {
    //     dispatch(contentActions.fetchContents());
    // }, [dispatch])
    const row = testContent.map((content, idx) => {
        // debugger
        // const like = likes.filter(like => {
        //     return like.contentId === content.id;
        // })
        return <ContentItem key={idx} content={content} test={idx}/>
    })

    const handleSlideClick = (e) => {
        console.log("slide");
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
        const progressCount = parseInt(getComputedStyle(slider).getPropertyValue("--items-shown"))
        const timesToShift = Math.floor(row.length/progressCount);
        if(direction === "left") {
            if (sliderIndex - 1 < 0) {
                slider.style.setProperty("--slider-index", timesToShift - 1)
            } else {
                slider.style.setProperty("--slider-index", sliderIndex - 1)
            }
        } else {
            if (sliderIndex + 1 > timesToShift) {
            slider.style.setProperty("--slider-index", 0)
            } else {
            slider.style.setProperty("--slider-index", sliderIndex + 1)
            }
        }
    }

    return (
        <div className="content-row-container">
            <h1>{category}</h1>
            <div className="content-row">
                <button className="slider-button slide-left" onClick={handleSlideClick}>Left</button>
                <div className="content-slider">
                    {row}
                </div>
                <button className="slider-button slide-right" onClick={handleSlideClick}>Right</button>
            </div>
        </div>
    )
}

export default ContentRow;