import axios from '@/api';

const headers = { 'Content-Type': 'multipart/form-data' };

// PostList.vue 또는 별도의 types/post.ts 파일에 정의
export interface Post {
  postId: number;
  title: string;
  content: string;
  img: string | null; // 이미지 URL 또는 null
  regDate: number; // 타임스탬프 (밀리초)
  updateDate: number; // 타임스탬프 (밀리초)
  viewsCount: number;
  thumbnail: Thumbnail;
}

interface Thumbnail {
  postId: number;
  fileName: string;
  storedFileName: string; // 이미지의 실제 저장 경로 (백엔드 설정에 따라 웹 경로가 될 수도 있음)
  fileType: string;
  fileSize: number;
  regDate: number; // 타임스탬프 (밀리초)
}

const createPost = async (newPost: {
  title: string;
  img: File | null;
  content: string;
}) => {
  const formData = new FormData();
  formData.append('title', newPost.title);
  formData.append('content', newPost.content);
  if (newPost.img) formData.append('img', newPost.img);
  await axios.post('/api/post', formData, { headers: headers });
};

const updatePost = async (newPost: {
  postId: number;
  title: string;
  img: File | null;
  content: string;
}) => {
  const formData = new FormData();
  formData.append('postId', String(newPost.postId));
  formData.append('title', newPost.title);
  formData.append('content', newPost.content);
  if (newPost.img) formData.append('img', newPost.img);
  await axios.put('/api/post', formData, { headers: headers });
};

const getPosts = async () => {
  const { data } = await axios.get('/api/post');
  return data;
};

const getPost = async (postId: number): Promise<Post> => {
  const { data } = await axios.get(`/api/post/${postId}`);
  return data;
};

const deletePost = async (postId: number) => {
  const { data } = await axios.delete(`/api/post/${postId}`);
  console.log('  ⚠️  : ', data);
};

export { getPost, getPosts, createPost, updatePost, deletePost };
