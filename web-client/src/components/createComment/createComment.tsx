import { Button, Form, TextField } from '@adobe/react-spectrum';
import Axios from 'axios';
import React, { useState } from 'react';

type CreateCommentProps = { postId : number };
const CreateComment = ({ postId } : CreateCommentProps) => {
    const [comment , setComment] = useState('');
    const createNewComment = async() => {
        const { data } = await Axios.post(`http://posts.com/api/posts/${postId}/comments` , { comment });
        if( data?.message === 'success' ){
            setComment('');
        }
    }
    return(
        <Form maxWidth="size-3600">
            <TextField width="size-3600" value={comment} onChange={setComment} label="Comment" isRequired={true} placeholder="Write a comment" />
            <Button width="size-1700" alignSelf="flex-start" marginBottom="size-300" marginTop="size-300" variant="cta" onPress={createNewComment} >Add Comment</Button>
        </Form>
    );
}

export default CreateComment;