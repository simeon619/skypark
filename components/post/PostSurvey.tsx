import { View, Text } from 'react-native'
import React from 'react'
import { PostSchema } from '../../types/PostType'
import PostHeader from './PostHeader'
import TextComponent from '../utilis/TextComponent'
import PostFooter from './PostFooter'
import SurveyComponent from '../utilis/SurveyComponent'

const PostSurvey = ({ dataPost }: { dataPost: PostSchema }) => {
  return (
    <View style={{ flex: 1 }}>
    <PostHeader date={dataPost.createdAt} user={dataPost.user} />
    <TextComponent text={dataPost.content.text} />
    <SurveyComponent dataSurvey={dataPost.content.survey} />
    <PostFooter stat={dataPost.statPost} />
  </View>
  )
}

export default PostSurvey