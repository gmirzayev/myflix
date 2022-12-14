import { useSelector, useDispatch } from "react-redux";
import './ContentIndex.css';
import * as contentActions from '../../store/contents';
import { useEffect, useState } from "react";
import ContentRow from "./ContentRow";

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
            {allContent && categoryRows}
        </>
    )
}

export default ContentIndex;