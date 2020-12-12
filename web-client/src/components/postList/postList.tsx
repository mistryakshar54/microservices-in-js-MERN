import { View } from '@adobe/react-spectrum';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import CommentList from '../commentList/commentList';
import CreateComment from '../createComment/createComment';
import {ProgressCircle} from '@adobe/react-spectrum'

export type comment = { id : number , comment : string, approval : 'approved' | 'pending' | 'unapproved' }
type postProps = { id : number; title : string; comments : comment[]}


const PostList = () => {
    const [posts , setPosts] = useState<postProps[]>([]);
    const [isLoading , setIsLoading] = useState(true);

    useEffect( () => {
        const fetchPosts = async() => {
            const { data } = await Axios.get('http://posts.com/api/posts');
            if( data?.message === 'success' ){
                setPosts(Object.values( data.data ));
                setIsLoading(false);
            }
            else{
                setIsLoading(true);
            }
        }
        fetchPosts();
    } , [] );
    return(
        <View UNSAFE_style={{display : 'flex', flexWrap: 'wrap'}}>
            { !isLoading ? posts.map( post => {
            return  <View key={post.id} UNSAFE_className="card" >
                        <h2 className="cardHeader">{post.title}</h2>
                        <div className="cardBody">
                            <h3>Comments:</h3>
                            <CommentList comments={post.comments} />
                            <CreateComment postId={post.id}/>
                        </div>
                    </View>
            }) : <ProgressCircle aria-label="Loading…" value={50} />}
        </View>
    );
}

export default PostList;