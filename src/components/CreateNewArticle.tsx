import React, { ComponentType, useState } from 'react'
import { connect, Matching } from 'react-redux';
import { createNewArticle } from '../store/actions/articlesActions';
import { ArticleType } from '../store/reducer/articlesReducer';

type CreateNewArticleType = (article: ArticleType) => void
type PropTypes = {
    createNewArticle: CreateNewArticleType
}


const CreateNewArticle: ComponentType<Matching<{ createNewArticle: CreateNewArticleType; }, PropTypes>> = ({ createNewArticle }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [link, setLink] = useState("");

    const handleNewArticle = () => {
        createNewArticle({title, description, content, link});
    }

    const onHandleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value.trim());
    }
    const onHandleDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value.trim());
    }
    const onHandleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setContent(e.target.value.trim());
    }
    const onHandleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLink(e.target.value.trim());
    }

    return (
        <div>
            <input type="text" onChange={onHandleTitle} value={title} placeholder='title' />
            <input type="text" onChange={onHandleDescription} value={description} placeholder='description' />
            <input type="text" onChange={onHandleContent} value={content} placeholder='content' />
            <input type="text" onChange={onHandleLink} value={link} placeholder='link' />
            <button onClick={handleNewArticle}> + </button>
        </div>
    )
}



const mapDispatchToProps =  {
    createNewArticle: (article: ArticleType) => createNewArticle(article),
}

export default connect(null, mapDispatchToProps)(CreateNewArticle)
