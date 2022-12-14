import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as contentActions from '../../store/contents';

import './ContentIndex.css';
import ContentRow from "./ContentRow";
import ContentFeatured from '../ContentIndex/ContentFeatured';

const ContentIndex = () => {

    const dispatch = useDispatch();
    const allContent = useSelector(contentActions.getContents);
    
    useEffect(() => {
        dispatch(contentActions.fetchContents());
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
            {allContent && categoryRows}
        </>
    )
}

export default ContentIndex;