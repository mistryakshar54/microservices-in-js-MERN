import React from 'react';
import {Flex, Header, Heading} from '@adobe/react-spectrum'
import CreatePost from './createPost/createPost';
import PostList from './postList/postList';

const Layout = () => {
    return(
        <Flex alignItems="center" direction="column" width="100%" gap="size-100">
            <Header>
                <Heading level={1}>Posts App</Heading>
            </Header>
            <CreatePost />
            <PostList/>
        </Flex>
    )
}
export default Layout;