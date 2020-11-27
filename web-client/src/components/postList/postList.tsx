import { View } from '@adobe/react-spectrum';
import React from 'react';
import CommentList from '../commentList/commentList';
import CreateComment from '../createComment/createComment';

const PostList = () => {
    
    return(
        <View >
            <div>
                <View UNSAFE_className="card" >
                    <h2 id="form title">Sample Post</h2>
                    <CommentList postId={1} />
                </View>
                <CreateComment/>
            </div>

        </View>
    );
}

export default PostList;