import React, { memo } from 'react';
import { PostSchema } from '../../types/PostType';
import TextComponent from '../utilis/TextComponent';
import PostHeader from './PostHeader';
import { View } from '../Themed';
import MediaComponent from '../utilis/MediaComponent';
import PostFooter from './PostFooter';

const PostMedia = ({ dataPost }: { dataPost: PostSchema }) => {
  console.log('leve ta main');
  return (
    <View style={{ flex: 1 }}>
      <PostHeader date={dataPost.createdAt} user={dataPost.user} />
      <TextComponent text={dataPost.content.text} />
      <MediaComponent media={dataPost.content.media} />
      <PostFooter stat={dataPost.statPost} />
    </View>
  );
};
export default memo(PostMedia);
