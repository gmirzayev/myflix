import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as contentActions from '../../store/contents';
import * as likeActions from '../../store/likes';
import * as saveActions from '../../store/saves';

import './ContentIndex.css';
import ContentRow from "./ContentRow";
import ContentFeatured from '../ContentIndex/ContentFeatured';

const ContentIndex = ({sessionProfile}) => {

    const dispatch = useDispatch();
    const allContent = useSelector(contentActions.getContents);
    const likes = useSelector(state => state.like);
    const saves = useSelector(state => state.save);
    
    useEffect(() => {
        dispatch(contentActions.fetchContents());
        dispatch(likeActions.fetchLikes(sessionProfile.id));
        dispatch(saveActions.fetchSaves(sessionProfile.id));
    }, [dispatch])

    let categoryList = [];
    if(allContent) {
        for(let i = 0; i < allContent.length; i++) {
            if(!(allContent[i].category in categoryList)) {
                categoryList.push(allContent[i].category)
            }
        }
    }
    const categoryRows = categoryList.map((category) => {
        return <ContentRow key={category} category={category}/>
    })

    return (
        <>
            {/* <ContentFeatured content={allContent[0]}/> */}
            <ContentFeatured />
            {allContent && likes && saves && categoryRows}
        </>
    )
}

export default ContentIndex;