import { Button, Form, TextField } from '@adobe/react-spectrum';
import React, { useState } from 'react';

const CreateComment = () => {
    const [comment , setComment] = useState('');
    const createNewComment = () => {}
    return(
        <Form maxWidth="size-3600">
            <TextField width="size-3600" value={comment} onChange={setComment} label="Post Title" isRequired={true} placeholder="Write a comment" />
            <Button width="size-1700" alignSelf="center" marginBottom="size-300" marginTop="size-300" variant="cta" onPress={createNewComment} >Create Post</Button>
        </Form>
    );
}

export default CreateComment;