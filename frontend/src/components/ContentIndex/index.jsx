import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as contentActions from '../../store/contents';
import * as likeActions from '../../store/likes';
import * as saveActions from '../../store/saves';

import './ContentIndex.css';
import ContentRow from "./ContentRow";
import ContentFeatured from '../ContentIndex/ContentFeatured';
import ContentModal from "./ContentModal";

const ContentIndex = ({filter, sessionProfile}) => {

    const dispatch = useDispatch();
    const allContent = useSelector(contentActions.getContents);
    const likes = useSelector(state => state.like);
    const saves = useSelector(state => state.save);

    useEffect(() => {
        dispatch(contentActions.fetchContents());
        dispatch(likeActions.fetchLikes(sessionProfile.id));
        dispatch(saveActions.fetchSaves(sessionProfile.id));
    }, [dispatch])

    let categoryList = ["Animated", "Drama", "Action"];

    const categoryRows = categoryList.map((category) => {
        return <ContentRow key={category} category={category} filter={filter}/>
    })

    const featuredContent = allContent.find((content) => {
        return content.title === "Gudetama: An Eggcellent Adventure";
    })

    return (
        <div className="content-index">
            {/* <ContentFeatured content={allContent[0]}/> */}
            {filter && filter === "all" && <ContentFeatured content={featuredContent}/>}
            {allContent && likes && saves && categoryRows}
            {/* {previewModal && <ContentModal content={content} />} */}
            <ContentModal />
        </div>
    )
}

export default ContentIndex;