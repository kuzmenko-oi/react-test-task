import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material';

const BoxWithMargin = styled(Box)`
  margin-top: ${({ theme }) => (theme as Theme).spacing(2)};
  margin-left: ${({ theme }) => (theme as Theme).spacing(1)};
  margin-right: ${({ theme }) => (theme as Theme).spacing(1)};
`;

export default BoxWithMargin;
