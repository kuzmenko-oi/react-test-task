import React from 'react';
import { getAllPosts } from '../../../services/postsRepository';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Refresh from '@mui/icons-material/Refresh';
import styled from '@emotion/styled';
import { Theme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import Collapse from '@mui/material/Collapse';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'react-query';
import { Post } from '../../../services/types';
import ProgressBackdrop from '../../../components/ProgressBackdrop';
import Container from '@mui/material/Container';

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: ${({ theme }) => (theme as Theme).spacing(2)};
  right: ${({ theme }) => (theme as Theme).spacing(2)};
`;

const PostListPage: React.FC = () => {
  const navigate = useNavigate();
  const allPosts = useQuery(['posts'], () => getAllPosts());

  const onPostClick = (id: Post['id']) => () => navigate(`/${id}`);
  const onCreateClick = () => navigate('/create');

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }}>Posts</Typography>
          <IconButton color="inherit" onClick={() => allPosts.refetch()}>
            <Refresh />
          </IconButton>
        </Toolbar>
      </AppBar>

      <ProgressBackdrop show={allPosts.isLoading || allPosts.isFetching} />

      <Container>
        <List sx={{ width: '100%' }}>
          <TransitionGroup>
            {allPosts.isSuccess &&
              allPosts.data.data.map((post) => (
                <Collapse key={post.id}>
                  <ListItem disablePadding>
                    <ListItemButton onClick={onPostClick(post.id)}>
                      <ListItemText primary={post.title} secondary={post.body} />
                    </ListItemButton>
                  </ListItem>
                </Collapse>
              ))}
          </TransitionGroup>
        </List>
      </Container>

      <StyledFab color="primary" aria-label="add" onClick={onCreateClick}>
        <AddIcon />
      </StyledFab>
      <Snackbar
        open={allPosts.isError}
        autoHideDuration={6000}
        sx={{ bottom: { xs: 90, sm: 0 } }}
        onClose={() => allPosts.remove()}
        message="Failed to load the posts."
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => allPosts.refetch()}>
              <Refresh fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => allPosts.remove()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default PostListPage;
