import React from 'react';
import { EditablePost } from '../../../services/types';
import { createPost } from '../../../services/postsRepository';
import Snackbar from '@mui/material/Snackbar';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import Save from '@mui/icons-material/Save';
import Refresh from '@mui/icons-material/Refresh';
import Container from '@mui/material/Container';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import ProgressBackdrop from '../../../components/ProgressBackdrop';
import PostEditForm from '../../../components/PostEditForm';
import BoxWithMargin from '../../../components/BoxWithMargin';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const createPostMutation = useMutation((post: EditablePost) => createPost(post), { onSuccess: () => navigate('/') });

  const formik = useFormik<EditablePost>({
    initialValues: { title: '', body: '' },
    validate: (values) => {
      const errors: Partial<EditablePost> = {};
      if (!values.title) errors.title = 'This field is required.';
      if (!values.body) errors.body = 'This field is required.';
      return errors;
    },
    onSubmit: (values, { setSubmitting }) =>
      createPostMutation.mutate(values, { onSettled: () => setSubmitting(false) }),
  });

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" onClick={() => navigate(-1)}>
            <ArrowBack />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>New post</Typography>
          <IconButton
            color="inherit"
            onClick={() => formik.submitForm()}
            disabled={!formik.dirty || formik.isSubmitting || !formik.isValid}
          >
            <Save />
          </IconButton>
        </Toolbar>
      </AppBar>

      <ProgressBackdrop show={createPostMutation.isLoading} />

      <BoxWithMargin>
        <Container>
          <PostEditForm formik={formik} />
        </Container>
      </BoxWithMargin>

      <Snackbar
        open={createPostMutation.isError}
        autoHideDuration={6000}
        onClose={() => createPostMutation.reset()}
        message={
          'Failed to create the post, details: ' + (createPostMutation.error as AxiosError)?.message?.toLowerCase()
        }
        action={
          <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => formik.submitForm()}>
              <Refresh fontSize="small" />
            </IconButton>
            <IconButton size="small" aria-label="close" color="inherit" onClick={() => createPostMutation.reset()}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

export default CreatePostPage;
