import React from 'react';
import { PostSchema } from '../../types/PostType';
import TextComponent from '../utilis/TextComponent';
import PostHeader from './PostHeader';
import PostFooter from './PostFooter';

const PostText = ({ dataPost }: { dataPost: PostSchema }) => {
  return (
    <>
      <PostHeader date={dataPost.createdAt} user={dataPost.user} />
      <TextComponent text={dataPost.content.text} />
      <PostFooter stat={dataPost.statPost} />
    </>
  );
};
export default PostText;
