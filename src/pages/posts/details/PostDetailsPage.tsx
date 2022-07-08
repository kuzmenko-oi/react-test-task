import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Refresh from '@mui/icons-material/Refresh';
import AppBar from '@mui/material/AppBar';
import ArrowBack from '@mui/icons-material/ArrowBack';
import { deletePost, getPost, updatePost } from '../../../services/postsRepository';
import { useFormik } from 'formik';
import { Container, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { AxiosError } from 'axios';
import Alert from '@mui/material/Alert';
import Save from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';
import { useMutation, useQuery } from 'react-query';
import BoxWithMargin from '../../../components/BoxWithMargin';
import { EditablePost } from '../../../services/types';
import ProgressBackdrop from '../../../components/ProgressBackdrop';
import PostEditForm from '../../../components/PostEditForm';

const PostDetailsPage: React.FC = () => {
  const searchParams = useParams();
  const navigate = useNavigate();
  const postId = Number(searchParams['postId']);

  const formik = useFormik<EditablePost>({
    initialValues: { title: '', body: '' },
    validate: (values: EditablePost) => {
      const errors: Partial<EditablePost> = {};
      if (!values.title) errors.title = 'This field is required.';
      if (!values.body) errors.body = 'This field is required.';
      return errors;
    },
    onSubmit: (values, { setSubmitting }) =>
      updatePostMutation.mutate(values, { onSettled: () => setSubmitting(false) }),
  });

  const post = useQuery(['post', postId], () => getPost(postId), {
    onSettled: (data, error) => console.log({ postData: data, postError: error }),
    onSuccess: (data) => formik.resetForm({ values: data.data }),
  });
  const updatePostMutation = useMutation((post: EditablePost) => updatePost(postId, post));
  const deletePostMutation = useMutation(() => deletePost(postId), { onSuccess: () => navigate(-1) });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="small" color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>Post #{postId}</Typography>
          <IconButton size="small" color="inherit" onClick={() => post.refetch()}>
            <Refresh />
          </IconButton>
          <IconButton
            size="small"
            color="inherit"
            onClick={() => formik.submitForm()}
            disabled={!formik.dirty || formik.isSubmitting || !formik.isValid || post.isError}
          >
            <Save />
          </IconButton>
          <IconButton color="inherit" onClick={() => deletePostMutation.mutate()}>
            <Delete />
          </IconButton>
        </Toolbar>
      </AppBar>

      <ProgressBackdrop
        show={post.isLoading || post.isFetching || updatePostMutation.isLoading || deletePostMutation.isLoading}
      />

      <BoxWithMargin>
        <Container>
          <PostEditForm formik={formik} />
        </Container>
      </BoxWithMargin>

      <Snackbar
        open={post.isError}
        autoHideDuration={6000}
        onClose={() => post.remove()}
        message="Failed to load the post."
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => post.refetch()}>
              <Refresh fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => post.remove()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />

      <Snackbar
        open={deletePostMutation.isError}
        autoHideDuration={6000}
        onClose={() => deletePostMutation.reset()}
        message="Failed to delete the post."
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => deletePostMutation.mutate()}>
              <Refresh fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => deletePostMutation.reset()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />

      <Snackbar
        open={updatePostMutation.isSuccess || updatePostMutation.isError}
        autoHideDuration={6000}
        onClose={() => updatePostMutation.reset()}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => updatePostMutation.reset()}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        {(updatePostMutation.isSuccess && (
          <Alert sx={{ width: '100%' }} severity="success">
            Successfully updated the post
          </Alert>
        )) ||
          (updatePostMutation.isError && (
            <Alert sx={{ width: '100%' }} severity="error">
              Failed to update the post, details: {(updatePostMutation.error as AxiosError).message.toLowerCase()}
            </Alert>
          )) || <span></span>}
      </Snackbar>
    </>
  );
};

export default PostDetailsPage;
