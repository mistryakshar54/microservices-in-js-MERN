import { Form, TextField, View, Button } from '@adobe/react-spectrum';
import React, { useState } from 'react';
import './createPost.css';

const CreatePost = () => {
    const [postTitle , setPostTitle] = useState('');
    const createNewPost = () => {};
    return(
        <View UNSAFE_className="card" >
            <h2 id="form title">Create New Post</h2>
            <Form maxWidth="size-3600">
                <TextField width="size-3600" value={postTitle} onChange={setPostTitle} label="Post Title" isRequired={true} placeholder="My Post" />
                <Button width="size-1700" alignSelf="center" marginBottom="size-300" marginTop="size-300" variant="cta" onPress={createNewPost} >Create Post</Button>
            </Form>
        </View>
    );
}
export default CreatePost;