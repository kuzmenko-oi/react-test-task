import React from 'react';
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import PostListPage from './pages/posts/list/PostListPage';
import PostDetailsPage from './pages/posts/details/PostDetailsPage';
import CreatePostPage from './pages/posts/create/CreatePostPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PostListPage />} />
      <Route path="create" element={<CreatePostPage />} />
      <Route path=":postId" element={<PostDetailsPage />} />
      <Route path="" element={<Navigate to="/" replace={true} />} />
    </Routes>
  );
};

export default App;
