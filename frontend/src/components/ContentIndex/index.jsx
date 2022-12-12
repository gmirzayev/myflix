import { useSelector, useDispatch } from "react-redux";
import './ContentIndex.css';
import * as contentActions from '../../store/contents';
import { useEffect } from "react";

const ContentIndex = () => {

    const dispatch = useDispatch();
    const allContent = useSelector(contentActions.getContents);

    useEffect(() => {
        dispatch(contentActions.fetchContents());
    }, [dispatch])

    const contentList = allContent.map((content) => {
        return <li>{content.id}{content.title}</li>
    })

    return (
        <ul>
            {contentList}
        </ul>
    )


}

export default ContentIndex;