import React from 'react';
import { comment } from '../postList/postList';
import './commentsList.css';

type commentListProps = { comments : comment[]}

const CommentList = (props : commentListProps) => {

    return (<ul>
               { props?.comments?.map( comm => {
                   return <li key={comm.id}>{comm.comment}</li>
               } ) }
    </ul>  );
}
export default CommentList;