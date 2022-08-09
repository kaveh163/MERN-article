import { useEffect, useState } from "react";
import {useParams} from "react-router";

function ArticlesList() {
    
    const [data, setData] = useState(null);
    const {id} =useParams();
    console.log(id);
    useEffect(() => {
        const fetchArticle = async() => {
            try {
                const response = await fetch('/api/articles/article', {
                    method: 'POST',
                    body: JSON.stringify({
                        articleId: id
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8'
                    }
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchArticle();
    }, [])

    return(
        <div>
            Hello Articles
        </div>
    )
}
export default ArticlesList