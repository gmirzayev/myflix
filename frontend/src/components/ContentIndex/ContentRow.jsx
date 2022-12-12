import { useSelector} from "react-redux";
import './ContentRow.css';
import * as contentActions from '../../store/contents';
import ContentItem from "./ContentItem";

const ContentRow = ({category}) => {

    // const dispatch = useDispatch();
    const allContent = useSelector(contentActions.getContentsByCategory(category));

    // useEffect(() => {
    //     dispatch(contentActions.fetchContents());
    // }, [dispatch])
    const generateRow = allContent.map((content) => {
        return <ContentItem key={content.id} content={content}/>
    })


    return (
        <>
            <h1>{category}</h1>
            {generateRow}
        </>
    )
}

export default ContentRow;