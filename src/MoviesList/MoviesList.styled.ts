import { createMuiTheme, TextField } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import { device } from 'shared/utilities/devise.constants';

import styled from 'styled-components';

export const StyleMoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.2em;
  @media ${device.tablet} {
    max-width: 950px;
    margin: auto;
  }
`;

export const StyledLink = styled(Link)`
  display: contents;
`;

export const StyleImg = styled.img`
  width: 48%;
  margin: 0.2em;
  @media ${device.tablet} {
    width: 24%;
  }

  @media ${device.laptop} {
    width: 18%;
  }
`;

export const StyledTextfield = styled(TextField)`
  background-color: #ffffff;
  margin-top: 0.5em;
`;

export const theme = createMuiTheme({
  palette: {
    primary: grey,
  },
});
