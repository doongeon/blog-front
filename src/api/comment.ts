import axios from '@/api';
import { Comment } from 'vue';

const headers = { 'Content-Type': 'Application/json' };

export interface Comment {
  commentId?: number;
  postId: number;
  writer: string;
  content: string;
  password: string;
  regDate?: number;
  updateDate?: number;
}

const createComment = async (comment: Comment) => {
  await axios.post(`/api/post/${comment.postId}/comment`, comment, {
    headers: headers,
  });
};

const getComments = async (postId: number) => {
  const { data } = await axios.get(`/api/post/${postId}/comment`);
  return data;
};

const deleteComment = async (comment: Comment) => {
  await axios.delete(`/api/post/${comment.postId}/comment`, {
    data: {
      ...comment,
    },
  });
};

export { createComment, getComments, deleteComment };
