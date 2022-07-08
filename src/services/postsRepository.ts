import axios, { AxiosResponse } from 'axios';
import { Post } from './types';

export function getAllPosts(): Promise<AxiosResponse<Post[]>> {
  return axios.get<Post[]>(`/api/posts/`);
}

export function getPost(postId: number): Promise<AxiosResponse<Post>> {
  return axios.get<Post>(`/api/posts/${postId}`);
}

export function createPost(newContent: Partial<Omit<Post, 'id'>>): Promise<AxiosResponse<Post>> {
  return axios.post<Post>(`/api/posts/`, newContent);
}

export function updatePost(postId: number, newContent: Partial<Omit<Post, 'id'>>): Promise<AxiosResponse<Post>> {
  return axios.put<Post>(`/api/posts/${postId}`, newContent);
}

export function deletePost(postId: number): Promise<AxiosResponse> {
  return axios.delete(`/api/posts/${postId}`);
}
