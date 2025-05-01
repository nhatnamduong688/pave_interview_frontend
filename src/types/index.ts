// Common type definitions

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author: User;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  postId: string;
}

export type SortDirection = 'asc' | 'desc';

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
} 