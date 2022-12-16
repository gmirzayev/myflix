import {useSelector, useDispatch} from 'react-redux';
import './SavedListPage.css';
import Footer from '../Footer';
import Navigation from '../BrowsePage/Navigation';
import * as saveActions from '../../store/saves';
import * as contentActions from '../../store/contents';
import { useEffect } from 'react';
import ContentItem from '../ContentIndex/ContentItem';

const SavedListPage = () => {
    const dispatch = useDispatch();
    const currentProfile = JSON.parse(sessionStorage.getItem("currentProfile"));
    const saves = useSelector((state) => state.save);
    const allContent = useSelector(contentActions.getContents);

    useEffect(() => {
        dispatch(saveActions.fetchSaves(currentProfile.id));
        dispatch(contentActions.fetchContents());
    }, [dispatch]);
    let finalArr = [];
    Object.values(allContent).forEach((content) => {
        Object.values(saves).forEach((save) => {
            if(save.contentId === content.id) finalArr.push(content);
        })
    })

    const renderItems = finalArr.map((content) => {
        return <ContentItem key={content.id} content={content}/>;
    })
    // debugger
    return (
        <div className="mylist-container">
            <Navigation />
            <div className="mylist-content">
                {allContent && renderItems}
            </div>
            <Footer />
        </div>
    )
}

export default SavedListPage;