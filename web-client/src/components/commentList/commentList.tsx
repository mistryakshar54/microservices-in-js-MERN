import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import './commentsList.css';

type commentListProps = { postId : number; }
type commentProps = { id : number; comment : string;}

const CommentList = ({ postId  } : commentListProps) => {
    const [comments , setComments] = useState<commentProps[]>([]);
    useEffect( () => {
        const fetchComments = async() => {
            const { data } = await Axios.get(`http://localhost:8001/api/posts/${postId}/comments`);
            if( data?.message === 'success' ){
                setComments(data.data);
                console.log("Set Data for comments")
            }
        }
        fetchComments();
    } , [postId] );

    return (<ul>
               { comments.map( comm => {
                   console.log(comm);
                   return <li key={comm.id}>{comm.comment}</li>
               } ) }
    </ul>  );
}
export default CommentList;