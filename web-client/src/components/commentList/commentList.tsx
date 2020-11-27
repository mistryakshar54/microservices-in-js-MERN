import { Item, ListBox } from '@adobe/react-spectrum';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

type commentListProps = { postId : number; }
type commentProps = { id : number; comment : string;}

const CommentList = ({ postId  } : commentListProps) => {
    const [comments , setComments] = useState<commentProps[]>([]);
    useEffect( () => {
        const fetchComments = async() => {
            const { data } = await Axios.get(`/api/${postId}/comments`);
            if( data?.message === 'success' ){
                setComments(data.data);
            }
        }
        fetchComments();
    } , [postId] );

    return(
        <ListBox width="size-2400" aria-label="Alignment">
            { comments.map( item => <Item key={item.id}>{item.comment}</Item> ) }
        </ListBox>
    );
}
export default CommentList;