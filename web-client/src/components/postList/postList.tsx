import { View } from '@adobe/react-spectrum';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import CommentList from '../commentList/commentList';
import CreateComment from '../createComment/createComment';

type postProps = { id : number; title : string;}


const PostList = () => {
    const [posts , setPosts] = useState<postProps[]>([]);
    useEffect( () => {
        const fetchPosts = async() => {
            const { data } = await Axios.get('http://localhost:8000/api/posts');
            if( data?.message === 'success' ){
                setPosts(data.data);
            }
        }
        fetchPosts();
    } , [] );
    return(
        <View UNSAFE_style={{display : 'flex', flexWrap: 'wrap'}}>
            { posts.map( post => {

            return  <View key={post.id} UNSAFE_className="card" >
                        <h2 className="cardHeader">{post.title}</h2>
                        <div className="cardBody">
                            <h3>Comments:</h3>
                            <CommentList postId={post.id} />
                            <CreateComment postId={post.id}/>
                        </div>
                    </View>
            }) }

        </View>
    );
}

export default PostList;