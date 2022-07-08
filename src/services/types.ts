export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export type EditablePost = Pick<Post, 'title' | 'body'>;
