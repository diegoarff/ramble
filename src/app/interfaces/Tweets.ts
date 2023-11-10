import { IResponse } from './Utils';

export interface ITweetResponse extends IResponse {
  data: ITweet;
}

export interface ITweetArrayResponse extends IResponse {
  data: ITweet[];
}

export interface ITweetBasicResponse extends IResponse {
  data: {
    _id: string;
    content: string;
    image: string | null;
    isReplyTo: string | null;
    isEdited: boolean;
    createdAt: string;
    updatedAt: string;
    userId: string;
  };
}

export interface ITweet {
  _id: string;
  content: string;
  image: string | null;
  isReplyTo: string | null;
  isEdited: boolean;
  createdAt: string;
  user: 
    {
      _id: string;
      username: string;
      name: string;
      avatar: string;
    }
  ;
  liked: boolean;
  likeCount: number;
  replyCount: number;
}
