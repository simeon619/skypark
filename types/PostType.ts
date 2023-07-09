export const PostType = {
  TEXT: '0',
  T_MEDIA: '1',
  SURVEY: '2',
};

export interface User {
  id: number;
  username: string;
  avatar: string;
}

export interface StatPostSchema {
  likes: number;
  comments: number;
  shares: number;
}
export interface SurveySchema {
  options: {id : number; label: string , votes : number}[];
  totalVotes: number;}
export interface ContentSchema {
  
  text?: string;
  media?: string[];
  survey?: SurveySchema
}

export interface PostSchema {
  id: number;
  type: string;
  user: User;
  content: ContentSchema;
  createdAt: any;
  statPost: StatPostSchema;
}
