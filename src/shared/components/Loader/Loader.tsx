import { CircularProgress } from '@material-ui/core';
import { FC } from 'react';
import styled from 'styled-components';

const StyledLoaderContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Loader: FC<{}> = () => (
  <StyledLoaderContainer role="alert" aria-busy="true" aria-label="loader">
    <CircularProgress />
  </StyledLoaderContainer>
);

export default Loader;
