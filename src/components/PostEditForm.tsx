import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import React from 'react';
import { useFormik } from 'formik';
import { EditablePost } from '../services/types';

const PostEditForm: React.FC<{ formik: ReturnType<typeof useFormik<EditablePost>> }> = ({ formik }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <TextField
          id="title"
          name="title"
          error={Boolean(formik.touched.title && formik.errors.title)}
          variant="outlined"
          label="Title"
          placeholder="Please enter title"
          helperText={formik.touched.title && formik.errors.title ? String(formik.errors.title) : undefined}
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />
        <TextField
          id="body"
          name="body"
          error={Boolean(formik.touched.body && formik.errors.body)}
          variant="outlined"
          multiline
          rows={5}
          label="Body"
          placeholder="Please enter body"
          helperText={formik.touched.body && formik.errors.body ? String(formik.errors.body) : undefined}
          value={formik.values.body}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={formik.isSubmitting}
        />
      </Stack>
    </form>
  );
};
export default PostEditForm;
