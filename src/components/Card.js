import view from './asset/view.png'; 
import favourite from './asset/like.png'; 
import comment from './asset/comment.png';
import { Link } from "react-router-dom";
import { useAppState } from '../utils/state';
import LazyImage from '../utils/LazyImage'
import { useRef,useEffect } from 'react';
import moment from 'moment';

/*
    文章列表的单个元素，负责跳转到文章页并更新历史记录，以及显示搜索关键词
*/
const Card = ({article,keywords})=>{
    const [_ , dispatch] = useAppState()
    const {article_id, article_info, author_user_info} = article;
    const title = useRef(null);
    const brief = useRef(null);
    useEffect(() =>{
        // 高亮搜索关键字
        if(title){
            let title_phrased = title.current.innerHTML;
            let brief_phrased = brief.current.innerHTML;
            if(keywords.length === 0){
                title_phrased = article_info.title;
                brief_phrased = article_info.brief_content;
            }else{
                keywords.forEach(keyword => {
                    title_phrased = title_phrased.replace(keyword, '<span style="color: red">'+keyword+'</span>')
                    brief_phrased = brief_phrased.replace(keyword, '<span style="color: red">'+keyword+'</span>')
                })
            }
            title.current.innerHTML = title_phrased;
            brief.current.innerHTML = brief_phrased;
        }
    },[keywords])
    return (
        <Link to={`/article/${article_id}`}>
            <div 
                className="content-box bg-white hover:bg-gray-50 w-screen px-7 max-w-screen-tablet" 
                onClick={() =>
                    dispatch({
                    type: "ADD_HIS",
                    data: article_id
                    })
                }>
                <div className="meta-box inline-flex pt-4 align-middle justify-between">
                    <div className="user-message pr-2">{author_user_info.user_name}</div>
                    <div className="text-grey date px-2">{moment.unix(article_info.ctime).format("YYYY-MM-DD")}</div>
                    <div className="text-grey tag-list flex divide-x ">
                    </div>
                </div>
                <div className="content-wrapper flex flex-col my-3 pb-4 border-b items-start ">
                    <div className="title text-xl mb-2 font-bold" ref={title}>
                        {article_info.title}
                    </div>
                    <div className="content-main flex flex-auto justify-between pb-4">
                        <div className="text-base text-grey mb-2 flex-3" ref={brief}>
                            <p className="brief">{article_info.brief_content}</p>
                        </div>
                        <LazyImage className="z-0" src={article_info.cover_image}/>
                    </div>
                    <div className="action-list inline-flex ">
                        <div className=" mr-5 text-center align-middle">
                            <img 
                            className="w-5 inline-block align-middle"
                            alt="view"
                            src={view}/>
                            <span className="inline-block align-middle">{article_info.view_count}</span>
                        </div>
                        <div className="mr-5 text-center">
                            <img 
                            className="w-5 inline"
                            alt="fav"
                            src={favourite}/>
                            <span className="inline-block align-middle">{article_info.collect_count}</span>
                        </div>                    
                        <div className="mr-5 text-center">
                            <img 
                            className="w-5 inline"
                            alt="comment"
                            src={comment}/>
                            <span className="inline-block align-middle">{article_info.comment_count}</span>
                        </div>                
                        </div>
                </div>
            </div>
        </Link>
    )
}
export default Card;